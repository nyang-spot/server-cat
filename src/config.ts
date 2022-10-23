export const HOST = process.env.HOST || "http://localhost";
export const PORT = process.env.PORT || 3000;

export const CLIENT_DOMAIN = "http://localhost:3000";

export const CORS_CONFIG = {
  origin: "*"
};

export const KAKAO_CONFIG = {
  clientID: process.env.KAKAO_CLIENT_ID || "",
  clientSecret: "",
  callbackURL: process.env.KAKAO_CALLBACK_URL || "http://localhost:3000/kakao/callback"
};

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 14; // 30일
export const SESSION_OPTION = {
  secret: process.env.SESSION_SECRET || "sesecret",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: COOKIE_MAX_AGE,
    secure: false,
    httpOnly: true
  }
};

export const JWT_SECRET = process.env.JWT_SECRET || "wjwjs";
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
