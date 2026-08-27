export interface IColdPayoutRow {
  level: number
  tmin: string
  ratio: string
}

export interface IDroughtPayoutRow {
  level: number
  paSpring: string
  paWinter: string
  ratio: string
}

export interface IHeatPayoutRow {
  level: number
  condition: string
  ratio: string
}

/** 低温冷害赔偿标准（权重系数 0.6） */
export const COLD_PAYOUT: IColdPayoutRow[] = [
  { level: 1, tmin: '3℃＜Tmin≤4℃', ratio: '0.5%' },
  { level: 2, tmin: '2℃＜Tmin≤3℃', ratio: '0.8%' },
  { level: 3, tmin: '1℃＜Tmin≤2℃', ratio: '1.2%' },
  { level: 4, tmin: '0℃＜Tmin≤1℃', ratio: '1.8%' },
  { level: 5, tmin: '-1℃＜Tmin≤0℃', ratio: '2.5%' },
  { level: 6, tmin: '-2℃＜Tmin≤-1℃', ratio: '3.0%' },
  { level: 7, tmin: '-4℃＜Tmin≤-2℃', ratio: '4.0%' },
  { level: 8, tmin: '-8℃＜Tmin≤-4℃', ratio: '6.5%' },
  { level: 9, tmin: '-10℃＜Tmin≤-8℃', ratio: '12.0%' },
  { level: 10, tmin: 'Tmin≤-10℃', ratio: '25.0%' },
]

export const COLD_PAYOUT_NOTE =
  '当前低温过程中同一级别的灾害持续≥3天，灾害等级升高一级赔偿；15天视为一个灾害周期，一个周期内多次达到起赔点的，只赔偿一次且以最高赔偿等级进行赔偿。'

/** 干旱赔偿标准（权重系数 0.3） */
export const DROUGHT_PAYOUT: IDroughtPayoutRow[] = [
  { level: 1, paSpring: '-60＜PA≤-40', paWinter: '-50＜PA≤-25', ratio: '0.2%' },
  { level: 2, paSpring: '-80＜PA≤-60', paWinter: '-70＜PA≤-50', ratio: '0.5%' },
  { level: 3, paSpring: '-95＜PA≤-80', paWinter: '-80＜PA≤-70', ratio: '1.0%' },
  { level: 4, paSpring: '-100＜PA≤-95', paWinter: '-100＜PA≤-80', ratio: '2.0%' },
  { level: 5, paSpring: 'PA=-100', paWinter: 'PA=-100', ratio: '7.0%' },
  {
    level: 6,
    paSpring: 'PA=-100，同一周期连续3个月出现',
    paWinter: 'PA=-100，同一周期连续3个月出现',
    ratio: '25.0%',
  },
]

export const DROUGHT_PAYOUT_NOTE =
  '月降水距平百分率 PA = (R − R̄) ÷ R̄ × 100%，R 为各镇街保险监测站月降水量，R̄ 为英德国家站（59088）1991-2020 年月降水量均值；3个月视为一个灾害周期。'

/** 热害赔偿标准（权重系数 0.1） */
export const HEAT_PAYOUT: IHeatPayoutRow[] = [
  {
    level: 1,
    condition: '日最高气温≥32℃且相对湿度≥85%，累计日数≥10天',
    ratio: '4%',
  },
  {
    level: 2,
    condition:
      '日最高气温≥32℃且相对湿度≥85%，累计日数≥20天；或日最高气温≥34℃且相对湿度≥85%，累计日数≥2天',
    ratio: '5%',
  },
  {
    level: 3,
    condition: '日最高气温≥34℃且相对湿度≥85%，累计日数≥5天',
    ratio: '7%',
  },
]

export const HEAT_PAYOUT_NOTE =
  '热害指数以英德国家基本气象观测站监测数据为准，保险期间为每年 7-9 月。'

export interface IPayoutResult {
  level: number
  ratio: number
}

/** 低温冷害：根据单日最低气温（℃）查赔偿等级与比例 */
export function coldRatio(tmin: number): IPayoutResult {
  if (tmin <= -10) return { level: 10, ratio: 25 }
  if (tmin <= -8) return { level: 9, ratio: 12 }
  if (tmin <= -4) return { level: 8, ratio: 6.5 }
  if (tmin <= -2) return { level: 7, ratio: 4 }
  if (tmin <= -1) return { level: 6, ratio: 3 }
  if (tmin <= 0) return { level: 5, ratio: 2.5 }
  if (tmin <= 1) return { level: 4, ratio: 1.8 }
  if (tmin <= 2) return { level: 3, ratio: 1.2 }
  if (tmin <= 3) return { level: 2, ratio: 0.8 }
  return { level: 1, ratio: 0.5 }
}

/** 干旱：根据月降水距平百分率 PA（%）查赔偿等级与比例（3-11月标准） */
export function droughtRatio(pa: number): IPayoutResult {
  if (pa <= -100) return { level: 5, ratio: 7 }
  if (pa <= -95) return { level: 4, ratio: 2 }
  if (pa <= -80) return { level: 3, ratio: 1 }
  if (pa <= -60) return { level: 2, ratio: 0.5 }
  if (pa <= -40) return { level: 1, ratio: 0.2 }
  return { level: 0, ratio: 0 }
}

/** 热害：根据累计高温日数（天）与温度档查赔偿等级与比例（日平均相对湿度≥85%） */
export function heatRatio(days: number, highTemp: boolean): IPayoutResult {
  if (highTemp) {
    // 日最高气温≥34℃
    if (days >= 5) return { level: 3, ratio: 7 }
    if (days >= 2) return { level: 2, ratio: 5 }
    return { level: 0, ratio: 0 }
  }
  // 日最高气温≥32℃
  if (days >= 20) return { level: 2, ratio: 5 }
  if (days >= 10) return { level: 1, ratio: 4 }
  return { level: 0, ratio: 0 }
}
