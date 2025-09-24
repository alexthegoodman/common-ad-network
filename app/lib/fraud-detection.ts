import { prisma } from './prisma'

export async function detectSuspiciousActivity(ip: string, userAgent?: string): Promise<{
  isSuspicious: boolean
  reasons: string[]
}> {
  const reasons: string[] = []
  let isSuspicious = false

  // Check click frequency from this IP in the last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const recentClicks = await prisma.click.count({
    where: {
      ipAddress: ip,
      createdAt: {
        gte: oneHourAgo
      }
    }
  })

  // Flag if more than 10 clicks per hour from same IP
  if (recentClicks > 10) {
    isSuspicious = true
    reasons.push('High click frequency from IP')
  }

  // Check for bot-like user agents
  if (userAgent) {
    const botPatterns = [
      /bot/i,
      /crawl/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i
    ]

    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      isSuspicious = true
      reasons.push('Bot-like user agent detected')
    }

    // Suspicious if user agent is too short or missing common browser info
    if (userAgent.length < 20 || !userAgent.includes('Mozilla')) {
      isSuspicious = true
      reasons.push('Suspicious user agent format')
    }
  }

  // Check for rapid-fire clicks across different ads from same IP
  const last5Minutes = new Date(Date.now() - 5 * 60 * 1000)
  const rapidClicks = await prisma.click.count({
    where: {
      ipAddress: ip,
      createdAt: {
        gte: last5Minutes
      }
    }
  })

  if (rapidClicks > 3) {
    isSuspicious = true
    reasons.push('Rapid clicks detected')
  }

  return { isSuspicious, reasons }
}

export async function isIPBlacklisted(ip: string): Promise<boolean> {
  // You could maintain a blacklist table in your database
  // For now, we'll just check some obvious bad patterns
  
  // Skip validation for localhost/private IPs during development
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return false
  }

  // Check against known bad IP patterns
  const suspiciousPatterns = [
    /^0\./,     // Invalid IP range
    /^255\./,   // Broadcast range
    /^127\./,   // Loopback (shouldn't reach here but just in case)
  ]

  return suspiciousPatterns.some(pattern => pattern.test(ip))
}

export function calculateTrustScore(ip: string, userAgent?: string, country?: string): number {
  let score = 100 // Start with full trust

  // Reduce score for missing user agent
  if (!userAgent) {
    score -= 20
  } else {
    // Reduce score for suspicious user agents
    if (userAgent.length < 50) score -= 10
    if (!userAgent.includes('Chrome') && !userAgent.includes('Firefox') && !userAgent.includes('Safari') && !userAgent.includes('Edge')) {
      score -= 15
    }
  }

  // Reduce score for high-risk countries (you'd customize this list)
  const higherRiskCountries = ['Unknown', 'China', 'Russia'] // Example
  if (country && higherRiskCountries.includes(country)) {
    score -= 10
  }

  // Private/local IPs get reduced score
  if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    score -= 30
  }

  return Math.max(0, Math.min(100, score))
}