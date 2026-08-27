export interface IProcessStep {
  id: string
  stepNumber: number
  title: string
  description: string
  iconKey: 'collect' | 'fill' | 'enter' | 'pay' | 'public' | 'verify'
}

export const MOCK_PROCESS_STEPS: IProcessStep[] = [
  {
    id: '1',
    stepNumber: 1,
    title: '采集投保信息',
    description: '工作人员上门采集茶园基础信息与种植面积',
    iconKey: 'collect',
  },
  {
    id: '2',
    stepNumber: 2,
    title: '填写投保单',
    description: '农户确认并签署投保单与告知声明',
    iconKey: 'fill',
  },
  {
    id: '3',
    stepNumber: 3,
    title: '录入投保信息',
    description: '保险公司将投保信息录入业务系统审核',
    iconKey: 'enter',
  },
  {
    id: '4',
    stepNumber: 4,
    title: '缴费出单',
    description: '农户缴纳自缴保费，保险公司出具保险单',
    iconKey: 'pay',
  },
  {
    id: '5',
    stepNumber: 5,
    title: '承保公示',
    description: '在镇村公示承保清单不少于3天，接受社会监督',
    iconKey: 'public',
  },
  {
    id: '6',
    stepNumber: 6,
    title: '现场验标',
    description: '核查保险标的位置、数量、权属和风险等情况',
    iconKey: 'verify',
  },
]
