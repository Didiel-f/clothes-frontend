// Forzamos runtime Node (cookies.set y fetch con body funcionan sin sorpresas)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type TokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
  user_id?: number;
  refresh_token?: string;
  error?: string;
  error_description?: string;
};

export async function POST() {
  try {
    const clientId = process.env.MELI_APP_ID;
    const clientSecret = process.env.MELI_APP_SECRET;
    if (!clientId || !clientSecret) {
      // Evita errores de TS/ESLint por ! y te da un mensaje claro en runtime
      return NextResponse.json(
        { error: "missing_env", detail: "MELI_APP_ID/MELI_APP_SECRET no definidos" },
        { status: 500 }
      );
    }

    const refresh = (await cookies()).get("meli_refresh_token")?.value;
    if (!refresh) {
      return NextResponse.json({ error: "no_refresh_token" }, { status: 400 });
    }

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refresh,
    });

    const resp = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      // En algunos hosts evita cache raras
      cache: "no-store",
    });

    const data = (await resp.json()) as TokenResponse;

    if (!resp.ok || !data.access_token) {
      return NextResponse.json(
        { error: "refresh_failed", detail: data },
        { status: 400 }
      );
    }

    // Guarda el nuevo access_token
    (await cookies()).set("meli_access_token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in ?? 5 * 60 * 60, // 5h por defecto
    });

    // Algunos refresh returns traen refresh_token nuevo: persístelo si viene
    if (data.refresh_token) {
      (await cookies()).set("meli_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 60, // ~60 días típico
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "exception", detail: String(err) },
      { status: 500 }
    );
  }
}
