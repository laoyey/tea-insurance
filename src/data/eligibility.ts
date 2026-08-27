export interface IEligibilityCondition {
  id: string
  title: string
  description: string
}

export const MOCK_ELIGIBILITY_CONDITIONS: IEligibilityCondition[] = [
  {
    id: '1',
    title: '连片集中管理',
    description: '茶园连片集中，生产管理正常',
  },
  {
    id: '2',
    title: '树龄达标',
    description: '树龄 3 年（含）以上，进入稳定采摘期',
  },
  {
    id: '3',
    title: '种植面积达标',
    description:
      '连片种植面积 30 亩（含）以上可单独投保，不足 30 亩可由农民合作社或村委会组织投保',
  },
  {
    id: '4',
    title: '种植场所合规',
    description: '种植场所不在禁种、行蓄洪区范围内',
  },
  {
    id: '5',
    title: '权属清晰',
    description: '投保人对投保茶园具有合法的承包经营权或所有权',
  },
]

export type EntityType = 'enterprise' | 'cooperative' | 'familyFarm' | 'farmer'

export interface IEligibilityEntity {
  id: string
  type: EntityType
  name: string
  description: string
}

export const MOCK_ELIGIBILITY_ENTITIES: IEligibilityEntity[] = [
  {
    id: '1',
    type: 'enterprise',
    name: '农业企业',
    description: '从事红茶种植生产的农业龙头企业',
  },
  {
    id: '2',
    type: 'cooperative',
    name: '农民合作社',
    description: '依法登记的茶叶专业合作社',
  },
  {
    id: '3',
    type: 'familyFarm',
    name: '家庭农场',
    description: '经认定的家庭农场及种植大户',
  },
  {
    id: '4',
    type: 'farmer',
    name: '农户',
    description: '拥有茶园承包经营权的茶农',
  },
]

export const ELIGIBILITY_HERO_IMAGE = `${import.meta.env.BASE_URL}images/eligibility-bg.jpg`
