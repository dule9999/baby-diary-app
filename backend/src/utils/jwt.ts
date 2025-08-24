import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

// Use 'expiresIn' as a string here, but TypeScript needs it typed correctly
export function signJwt(payload: object, expiresIn: string = "1h") {
  return jwt.sign(payload, SECRET, { expiresIn: expiresIn as unknown as number | undefined });
}

export function verifyJwt<T extends object>(token: string): T {
  const decoded = jwt.verify(token, SECRET);
  if (typeof decoded === "string" || decoded === null) {
    throw new Error("Invalid token payload");
  }
  return decoded as T;
}
