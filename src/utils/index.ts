export { default as CustomResponse } from "./wrapper";
export { HttpStatusCode } from "./globalTypes";
import { CorsOptions } from "cors";
const whiteList = [
  "http://localhost:3000",
  "https://flow-your-mind-test.vercel.app",
  "https://flow-your-mind.vercel.app",
  "https://anon.frimps.xyz"
];
export const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (whiteList.includes(requestOrigin as string) || !requestOrigin) {
      callback(null, requestOrigin);
    } else {
      callback(new Error("Cors error"));
    }
  },
  allowedHeaders: ["X-Requested-With", "content-type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
};

/**
 *
 *
 * @returns a unique random username for unit tests
 */
export function generateUsername(): string {
  const adjectives = ["happy", "lucky", "clever", "smart", "friendly"];
  const nouns = ["cat", "dog", "bird", "fish", "rabbit"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}_${randomNoun}_${Math.floor(Math.random() * 1000)}`;
}
