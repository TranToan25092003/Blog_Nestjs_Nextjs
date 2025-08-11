const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SessionUser = {
  id?: string;
  name?: string;
  avatar?: string;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
};

/**
 * ====================================
 * create session
 * ====================================
 */
export async function createSession(payload: Session) {
  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * ====================================
 * get session
 * ====================================
 */
export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.log("Failed to verify session", error);
    redirect("/auth/signin");
  }
}

/**
 * ====================================
 * remove session
 * ====================================
 */
export async function deleteSession() {
  await (await cookies()).delete("session");
}
