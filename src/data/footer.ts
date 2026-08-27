export interface IFooterInfo {
  brand: {
    name: string
    tagline: string
    serviceHours: string
  }
  coverage: {
    title: string
    areas: string[]
  }
  contact: {
    title: string
    phone: string
    wechat: string
    email: string
  }
  copyright: string
}

export const MOCK_FOOTER_INFO: IFooterInfo = {
  brand: {
    name: '红茶气象指数保险',
    tagline: '一片叶子的天气保障',
    serviceHours: '服务时间：周一至周五 09:00 - 18:00',
  },
  coverage: {
    title: '承保区域',
    areas: [
      '广东省英德市',
      '英德市红茶产区',
    ],
  },
  contact: {
    title: '联系方式',
    phone: '95518',
    wechat: 'PICC 广东人保财险',
    email: 'service@picc.com.cn',
  },
  copyright: '© 2026 中国人民财产保险股份有限公司广东省分公司',
}
