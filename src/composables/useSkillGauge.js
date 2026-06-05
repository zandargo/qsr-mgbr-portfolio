export function normalizePercent(value) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) {
    return 0
  }

  return Math.max(0, Math.min(100, numeric))
}

export function buildGaugeMetrics(percent, radius) {
  const safeRadius = Math.max(1, Number(radius) || 1)
  const normalized = normalizePercent(percent)
  const circumference = 2 * Math.PI * safeRadius
  const strokeDashoffset = circumference - (normalized / 100) * circumference

  return {
    circumference,
    strokeDasharray: circumference,
    strokeDashoffset
  }
}

export function useSkillGauge() {
  return {
    normalizePercent,
    buildGaugeMetrics
  }
}

