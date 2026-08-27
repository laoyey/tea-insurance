export interface ILiabilityItem {
  id: string
  order: number
  title: string
  content: string
}

/** 责任免除（核心三条，重新编号） */
export const MOCK_LIABILITIES: ILiabilityItem[] = [
  {
    id: '1',
    order: 1,
    title: '故意行为与管理不善',
    content:
      '投保人及其家庭成员、被保险人及其家庭成员、投保人或被保险人雇用人员的故意行为、管理不善造成的损失、费用，保险人不负责赔偿。',
  },
  {
    id: '2',
    order: 2,
    title: '行政行为或司法行为',
    content:
      '因行政行为或司法行为造成的损失、费用，保险人不负责赔偿。',
  },
  {
    id: '3',
    order: 3,
    title: '警报期内投保',
    content:
      '灾害警报期内投保而遭受的当次灾害造成的损失、费用，保险人不负责赔偿。',
  },
]

/** 责任免除补充说明（不属于核心三条） */
export const MOCK_LIABILITY_EXTRAS: string[] = [
  '发生保险责任范围内的保险事故后，被保险人未经保险人同意自行毁损或放弃保险茶叶导致的损失、产生的费用，保险人也不负责赔偿。',
  '其他不属于本保险合同责任范围内的损失、费用，保险人也不负责赔偿。',
]
