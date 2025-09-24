interface GeolocationResult {
  country: string | null;
  city: string | null;
  region: string | null;
  timezone: string | null;
}

export async function getLocationFromIP(
  ip: string
): Promise<GeolocationResult> {
  // Skip localhost and private IPs
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.")
  ) {
    return {
      country: "Local",
      city: null,
      region: null,
      timezone: null,
    };
  }

  try {
    // Using ip-api.com (free tier: 1000 requests/month, no API key needed)
    const response = await fetch(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&ip_address=${ip}`,
      {
        headers: {
          "User-Agent": "Common-Ad-Network/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      return {
        country: data.country || null,
        city: data.city || null,
        region: data.region || null,
        timezone: data.timezone?.abbreviation || null,
      };
    } else {
      console.warn("IP geolocation failed:", data.message || "Unknown error");
      return {
        country: null,
        city: null,
        region: null,
        timezone: null,
      };
    }
  } catch (error) {
    console.error("IP geolocation error:", error);
    return {
      country: null,
      city: null,
      region: null,
      timezone: null,
    };
  }
}

export function isValidIP(ip: string): boolean {
  // Basic IP validation
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ip === "::1";
}

export function getClientIP(request: Request): string {
  // Try multiple headers to get the real client IP
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    const ip = forwarded.split(",")[0].trim();
    if (isValidIP(ip)) return ip;
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP && isValidIP(realIP)) return realIP;

  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare
  if (cfConnectingIP && isValidIP(cfConnectingIP)) return cfConnectingIP;

  const xClientIP = request.headers.get("x-client-ip");
  if (xClientIP && isValidIP(xClientIP)) return xClientIP;

  // Fallback
  return "127.0.0.1";
}
