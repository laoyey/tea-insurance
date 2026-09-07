export interface IInsuranceProtection {
  id: string
  label: string
  value: number
  unit: string
  description: string
  iconType: 'coverage' | 'premium' | 'subsidy'
}

export const MOCK_INSURANCE_PROTECTION: IInsuranceProtection[] = [
  {
    id: '1',
    label: '每亩保险金额',
    value: 5000,
    unit: '元/亩',
    description: '气象灾害损失最高赔付',
    iconType: 'coverage',
  },
  {
    id: '2',
    label: '每亩保费',
    value: 150,
    unit: '元/亩',
    description: '全额保费标准',
    iconType: 'premium',
  },
  {
    id: '3',
    label: '农户自缴保费',
    value: 60,
    unit: '元/亩',
    description: '政府财政补贴60%，农户自缴比例40%',
    iconType: 'subsidy',
  },
]
