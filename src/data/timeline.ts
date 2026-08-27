export interface ITimelineNode {
  id: string
  year: string
  month?: string
  title: string
  description: string
}

export const MOCK_TIMELINE_NODES: ITimelineNode[] = [
  {
    id: '1',
    year: '2022',
    month: '12月',
    title: '率先推行',
    description:
      '清远市气象局联合人保财险清远分公司，在英德率先推行红茶气象指数保险，选取"低温冷害、热害、干旱"三大因子作为理赔触发条件。',
  },
  {
    id: '2',
    year: '2023',
    title: '体系搭建',
    description:
      '承保面积近6000亩，搭建"保险+气象+农技"智慧防灾减损体系，为茶农提供全方位风险保障。',
  },
  {
    id: '3',
    year: '2024',
    title: '规模倍增',
    description:
      '承保面积达11917亩，累计提供风险保障5958.5万元，各级财政补贴190.672万元；累计触发7次低温冷害和3次干旱保险责任；在核心产区建成4个茶园气象灾害监测站。',
  },
  {
    id: '4',
    year: '2025',
    title: '数据赋能',
    description:
      '"英德红茶气象指数保险数据产品"上架广州数据交易所，实现"看数避险"；累计提供风险保障5000多万元。',
  },
  {
    id: '5',
    year: '2026',
    title: '品质升级',
    description:
      '纳入政策性保险补助范畴，实现从"保成本"向"保品质、保收益"升级；第八届英德红茶头采季盛大开幕。',
  },
]
