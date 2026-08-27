export interface ITrigger {
  id: string
  name: string
  type: 'cold' | 'heat' | 'drought'
  condition: string
  description: string
  teaImpact: string
  weight: number
  iconName: string
  imageUrl: string
}

export const MOCK_TRIGGERS: ITrigger[] = [
  {
    id: '1',
    name: '低温冷害',
    type: 'cold',
    condition: '单日最低气温',
    description: '单日最低气温达到起赔标准即触发赔付',
    teaImpact: '芽叶冻伤、生长停滞、春茶品质下降',
    weight: 0.6,
    iconName: 'snowflake',
    imageUrl: `${import.meta.env.BASE_URL}images/trigger-cold.jpg`,
  },
  {
    id: '2',
    name: '热害',
    type: 'heat',
    condition: '日最高气温、日平均相对湿度',
    description: '高温高湿达到起赔标准即触发赔付',
    teaImpact: '叶片灼伤、蒸腾加速、枯梢落叶',
    weight: 0.1,
    iconName: 'sun',
    imageUrl: `${import.meta.env.BASE_URL}images/trigger-heat.jpg`,
  },
  {
    id: '3',
    name: '干旱',
    type: 'drought',
    condition: '月降水距平百分率',
    description: '月降水距平百分率达到起赔标准即触发赔付',
    teaImpact: '土壤缺水、生长停滞、鲜叶减产',
    weight: 0.3,
    iconName: 'drought',
    imageUrl: `${import.meta.env.BASE_URL}images/trigger-drought.jpg`,
  },
]
