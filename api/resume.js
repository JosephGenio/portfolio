import { readFileSync } from "fs";
import { join } from "path";

const BOT_PATTERNS = [
  /bot/i,
  /crawl/i,
  /spider/i,
  /scrape/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /go-http-client/i,
  /java\//i,
  /httpclient/i,
  /fetcher/i,
  /slurp/i,
  /mediapartners/i,
];

const TOKEN_MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

function isBot(userAgent) {
  if (!userAgent) return true;
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

function isValidToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const timestamp = parseInt(decoded, 10);
    if (isNaN(timestamp)) return false;
    const age = Date.now() - timestamp;
    return age >= 0 && age <= TOKEN_MAX_AGE_MS;
  } catch {
    return false;
  }
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userAgent = req.headers["user-agent"] || "";
  if (isBot(userAgent)) {
    return res.status(403).json({ error: "Access denied" });
  }

  const { token } = req.query;
  if (!isValidToken(token)) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  try {
    const filePath = join(process.cwd(), "api", "resume.pdf");
    const fileBuffer = readFileSync(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

    return res.status(200).send(fileBuffer);
  } catch {
    return res.status(404).json({ error: "Resume not found" });
  }
}
