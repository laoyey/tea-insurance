export interface IStation {
  id: string
  town: string
  main: string
  backup: string | null
}

/** 英德市有效观测站点列表（主站 / 备用站） */
export const MOCK_STATIONS: IStation[] = [
  { id: '1', town: '英城街', main: '59088', backup: 'G8546' },
  { id: '2', town: '大站镇', main: 'G8536', backup: null },
  { id: '3', town: '望埠镇', main: 'G8553', backup: 'G8531' },
  { id: '4', town: '沙口镇', main: 'G2775', backup: 'G8340' },
  { id: '5', town: '横石塘镇', main: 'G2777', backup: 'G8561' },
  { id: '6', town: '英红镇', main: 'G8532', backup: 'G8548' },
  { id: '7', town: '连江口镇', main: 'G8530', backup: null },
  { id: '8', town: '黎溪镇', main: 'G8535', backup: null },
  { id: '9', town: '东华镇', main: 'G8558', backup: null },
  { id: '10', town: '横石水镇', main: 'G8539', backup: null },
  { id: '11', town: '白沙镇', main: 'G8534', backup: null },
  { id: '12', town: '石灰铺镇', main: 'G8538', backup: 'G8567' },
  { id: '13', town: '石牯塘镇', main: 'G8537', backup: 'G8545' },
  { id: '14', town: '浛洸镇', main: 'G2771', backup: 'G8565' },
  { id: '15', town: '波罗镇', main: 'G8542', backup: 'G8563' },
  { id: '16', town: '大湾镇', main: 'G2770', backup: 'G8564' },
  { id: '17', town: '西牛镇', main: 'G2772', backup: 'G8566' },
  { id: '18', town: '大洞镇', main: 'G8541', backup: 'G8556' },
  { id: '19', town: '九龙镇', main: 'G8555', backup: null },
  { id: '20', town: '黄花镇', main: 'G8554', backup: null },
]
