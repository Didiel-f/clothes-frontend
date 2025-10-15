import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const clientId = process.env.MELI_APP_ID!;
  const redirectUri = process.env.MELI_REDIRECT_URI!;
  const scope = ["read", "write", "offline_access"].join(" ");
  const state = crypto.randomUUID(); // para CSRF

  // Guarda el state en cookie (5 mins)
  (await cookies()).set("meli_oauth_state", state, {
    httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 5, path: "/",
  });

  const url = new URL("https://auth.mercadolibre.cl/authorization");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("scope", scope);

  return NextResponse.redirect(url.toString(), { status: 302 });
}
