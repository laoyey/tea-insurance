export type ArticleCategory = 'official' | 'media' | 'case'

export interface IArticle {
  id: string
  title: string
  source: string
  date: string
  url: string
  category: ArticleCategory
}

export interface IArticleCategory {
  key: ArticleCategory
  label: string
  description: string
}

export const ARTICLE_CATEGORIES: IArticleCategory[] = [
  {
    key: 'official',
    label: '官方 / 权威媒体',
    description: '权威背书，优先选用',
  },
  {
    key: 'media',
    label: '主流媒体报道',
    description: '权威报道，见证一片叶子的保障力量',
  },
  {
    key: 'case',
    label: '赔付案例',
    description: '真实理赔，让每一分保障都有据可查',
  },
]

export const MOCK_ARTICLES: IArticle[] = [
  // 官方 / 权威媒体
  {
    id: '1',
    title: '清远率先开展红茶气象指数保险，无须现场查勘即可理赔',
    source: '中国气象局官网',
    date: '2024.05',
    url: 'https://www.cma.gov.cn/2011xwzx/2011xmtjj/202405/t20240528_6296198.html',
    category: 'official',
  },
  {
    id: '2',
    title: '强化气象科技支撑，赋能英德红茶产业',
    source: '广东省气象局',
    date: '2025.05',
    url: 'http://gd.cma.gov.cn/qysqxj/zwgk_3166/zwyw_3196/gzdt_3197/202505/t20250527_7095518.html',
    category: 'official',
  },
  {
    id: '3',
    title: '以气象数据之“智”赋南粤发展之“能”',
    source: '中国气象局',
    date: '2023.08',
    url: 'https://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xqxyw/202308/t20230828_5739263.html',
    category: 'official',
  },
  {
    id: '4',
    title: '10 多种气象指数保险帮农户化解极端天气担忧',
    source: '中国人民保险集团官网',
    date: '2024.01',
    url: 'https://www.picc.com/xwzx/mtjj/202403/t20240301_85753.html',
    category: 'official',
  },
  {
    id: '5',
    title: '科技赋能，打造智慧中枢（人保财险“稳农”系统）',
    source: 'PICC 人保财险官网',
    date: '2025.12',
    url: 'https://property.picc.com.cn/cx_gywm/zxzx/xwsd/202601/t20260104_663174010602803200.html',
    category: 'official',
  },

  // 主流媒体报道
  {
    id: '6',
    title: '广东“龙舟水”来袭，英德红茶上了保险！设气象农业观测站网',
    source: '南方都市报',
    date: '2024.05',
    url: 'http://m.toutiao.com/group/7373568486092456511/',
    category: 'media',
  },
  {
    id: '7',
    title: '清远率先开展红茶气象指数保险，无须现场查勘即可理赔',
    source: '广州日报',
    date: '2024.05',
    url: 'http://m.toutiao.com/group/7373647226285589028/',
    category: 'media',
  },
  {
    id: '8',
    title: '提供风险保障 5000 多万元，气象科技赋能英德红茶“生财有道”',
    source: '广州日报新花城',
    date: '2025.05',
    url: 'https://huacheng.gz-cmc.com/pages/2025/05/17/SF1383933233f96e39d79c42cab12d5b.html',
    category: 'media',
  },
  {
    id: '9',
    title: '英德金融监管支局引导金融机构助力英德红茶产业发展',
    source: '金融监管部门',
    date: '2024.07',
    url: 'https://jrj.wuhan.gov.cn/ztzl_57/xyrd/dfljr/202407/t20240711_2427422.shtml',
    category: 'media',
  },
  {
    id: '10',
    title: '“五大百亿”农业产业高质量发展（英德红茶专版）',
    source: '南方农村报',
    date: '2026.04',
    url: 'http://epaper.nfncb.cn/nfnc/content/20260409/Articel06001JQ.htm',
    category: 'media',
  },

  // 赔付案例
  {
    id: '11',
    title: '赔付 37.2 万！茶叶受冻，保险“买单”！',
    source: '清远市保险行业协会',
    date: '2023.02',
    url: 'http://qyia.org/plus/view.php?aid=3035',
    category: 'case',
  },
  {
    id: '12',
    title: '从香飘中法元首松园茶叙的“金毛毫”看气象人如何趋利避害',
    source: '中国气象报',
    date: '2023.04',
    url: 'http://www.zgqxb.com.cn/zx/zh/202304/t20230421_5456048.html',
    category: 'case',
  },
  {
    id: '13',
    title: '广东首个农业保险精准投保理赔示范市（县）落地清远英德',
    source: '南方+',
    date: '2025.04',
    url: 'https://www.nfnews.com/content/W3YNnkWk6A.html',
    category: 'case',
  },
]
