import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const savedState = (await cookies()).get("meli_oauth_state")?.value;

  if (!code) return NextResponse.json({ error: "missing_code" }, { status: 400 });
  if (!state || !savedState || state !== savedState) {
    return NextResponse.json({ error: "invalid_state" }, { status: 400 });
  }

  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.MELI_APP_ID!,
      client_secret: process.env.MELI_APP_SECRET!,
      code,
      redirect_uri: process.env.MELI_REDIRECT_URI!,
    });

    const resp = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const tokens = await resp.json() as {
      access_token?: string;
      token_type?: string;
      expires_in?: number;
      scope?: string;
      user_id?: number;
      refresh_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!resp.ok || !tokens.access_token) {
      return NextResponse.json({ error: "token_exchange_failed", detail: tokens }, { status: 400 });
    }

    // Guarda tokens en cookies (demo). En producción usa DB/kv/tu backend.
    const cookieStore = await cookies();
    cookieStore.set("meli_access_token", tokens.access_token, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: tokens.expires_in ?? 5 * 60 * 60,
    });
    if (tokens.refresh_token) {
      cookieStore.set("meli_refresh_token", tokens.refresh_token, {
        httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 60, // ~60 días típico
      });
    }
    // Limpia el state
    cookieStore.set("meli_oauth_state", "", { path: "/", maxAge: 0 });

    // Redirige a una página tuya (o responde JSON)
    return NextResponse.redirect(new URL("/meli/ok", req.url), { status: 302 });
  } catch (err) {
    return NextResponse.json({ error: "exception", detail: String(err) }, { status: 500 });
  }
}
