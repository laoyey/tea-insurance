export interface IFormulaVariable {
  id: string
  symbol: string
  name: string
  description: string
  unit?: string
  defaultValue?: number
}

export interface IFormulaSection {
  id: string
  title: string
  formulaText: string
  variables: string[]
}

export const MOCK_FORMULA_VARIABLES: IFormulaVariable[] = [
  {
    id: '1',
    symbol: '每亩保险金额',
    name: '每亩保险金额',
    description: '每亩茶园最高赔付限额，固定为5000元',
    unit: '元/亩',
    defaultValue: 5000,
  },
  {
    id: '2',
    symbol: '赔付比例',
    name: '保险指数赔付比例',
    description: '根据气象灾害等级确定，低温冷害0.5%-25%、干旱0.2%-25%、热害4%-7%',
    unit: '%',
  },
  {
    id: '3',
    symbol: '保险面积',
    name: '保险面积',
    description: '参保茶园的实际种植面积',
    unit: '亩',
    defaultValue: 10,
  },
  {
    id: '4',
    symbol: '权重系数',
    name: '权重系数',
    description: '低温冷害0.6、干旱0.3、热害0.1，随受灾情况确定',
  },
]

export const MOCK_FORMULA_SECTIONS: IFormulaSection[] = [
  {
    id: '1',
    title: '总赔偿金额',
    formulaText: '总赔偿金额 = Σ 每种因子赔偿金额',
    variables: [],
  },
  {
    id: '2',
    title: '每种因子赔偿金额',
    formulaText: '每种因子赔偿金额 = 每亩保险金额 × 赔偿比例 × 保险面积 × 权重系数',
    variables: ['1', '2', '3', '4'],
  },
]
