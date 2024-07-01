import * as jose from "jose";

if (!process.env.JOSE_TOKEN) {
  throw new Error("Secret token must be provided");
}

const secret = new TextEncoder().encode(process.env.JOSE_TOKEN);

export const createToken = async (payload: jose.JWTPayload) => {
  const token = new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secret);

  return token;
};

export const verifyToken = async (token: string) => {
  const payloadToken = await jose.jwtVerify(token, secret);

  return payloadToken.payload;
};
