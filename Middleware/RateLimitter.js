import rateLimit from "express-rate-limit";

export const voyageLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 10,                       
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "You have exceeded the daily limit of 10 requests for voyage API."
  }
});