export interface IGlossaryItem {
  id: string
  term: string
  definition: string
}

/** 保险条款术语释义 */
export const MOCK_GLOSSARY: IGlossaryItem[] = [
  {
    id: '1',
    term: '日最低气温',
    definition:
      '在保险期间内，保险合同约定的对应气象站测得的上一日20时至当日20时期间的气温最小值，单位为摄氏度（℃）。',
  },
  {
    id: '2',
    term: '月降水距平百分率（PA）',
    definition: '一个月内降水与同期平均状态的偏离程度。',
  },
  {
    id: '3',
    term: '日最高气温',
    definition:
      '在保险期间内，保险合同约定的对应气象站测得的上一日20时至当日20时期间的气温最大值，单位为摄氏度（℃）。',
  },
  {
    id: '4',
    term: '日平均相对湿度',
    definition:
      '在保险期间内，保险合同约定的对应气象站测得的上一日20时至当日20时期间的湿度平均值。',
  },
  {
    id: '5',
    term: '月降水量',
    definition: '一个自然月内的总降水量。',
  },
]
