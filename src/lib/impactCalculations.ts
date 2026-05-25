// Conversion factors:
// CO2 avoided:   1 tonne scrap = 1,850 kg CO2  (World Steel Association)
// Landfill:      1 tonne       = 0.57 m³         (EPA)
// Energy saved:  1 tonne       = 642 kWh          (World Steel Association)
// Jobs:          15 per 1,000 tonnes              (ILO East Africa)

export interface ImpactOverrides {
  co2Avoided?: number
  landfillDiverted?: number
  jobsCreated?: number
  womenParticipation?: number
  youthParticipation?: number
}

export interface ImpactResult {
  tonnesRecycled: number
  co2AvoidedKg: number
  co2AvoidedTonnes: number
  landfillDivertedM3: number
  energySavedKwh: number
  jobsCreated: number
  womenParticipationPct: number
  youthParticipationPct: number
  reportingYear: number
}

const CO2_KG_PER_TONNE = 1850
const LANDFILL_M3_PER_TONNE = 0.57
const ENERGY_KWH_PER_TONNE = 642
const JOBS_PER_1000_TONNES = 15

export function calculateImpact(
  tonnesRecycled: number,
  reportingYear: number,
  overrides?: ImpactOverrides,
): ImpactResult {
  const co2AvoidedKg = overrides?.co2Avoided ?? tonnesRecycled * CO2_KG_PER_TONNE
  const landfillDivertedM3 = overrides?.landfillDiverted ?? tonnesRecycled * LANDFILL_M3_PER_TONNE
  const jobsCreated = overrides?.jobsCreated ?? Math.round((tonnesRecycled / 1000) * JOBS_PER_1000_TONNES)
  const energySavedKwh = tonnesRecycled * ENERGY_KWH_PER_TONNE

  return {
    tonnesRecycled,
    co2AvoidedKg,
    co2AvoidedTonnes: co2AvoidedKg / 1000,
    landfillDivertedM3,
    energySavedKwh,
    jobsCreated,
    womenParticipationPct: overrides?.womenParticipation ?? 0,
    youthParticipationPct: overrides?.youthParticipation ?? 0,
    reportingYear,
  }
}

export function formatImpactNumber(value: number, unit: string): string {
  const formatted = value.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return unit ? `${formatted} ${unit}` : formatted
}
