export interface IGalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: 'teaGarden' | 'picking' | 'leaf' | 'processing' | 'teaSoup' | 'survey'
}

export const MOCK_GALLERY_ITEMS: IGalleryItem[] = [
  {
    id: '1',
    title: '英德茶园',
    description: '英德红茶谷，峰林环绕间的万亩茶园',
    imageUrl: `${import.meta.env.BASE_URL}images/gallery-morning.jpg`,
    category: 'teaGarden',
  },
  {
    id: '2',
    title: '采茶人',
    description: '辛勤的茶农采摘春茶嫩芽',
    imageUrl: `${import.meta.env.BASE_URL}images/gallery-picking.jpg`,
    category: 'picking',
  },
  {
    id: '3',
    title: '茶叶特写',
    description: '阳光透射下的大叶种鲜叶',
    imageUrl: `${import.meta.env.BASE_URL}images/gallery-leaf.jpg`,
    category: 'leaf',
  },
  {
    id: '4',
    title: '制茶工艺',
    description: '传统发酵工序，激发红茶独特香气',
    imageUrl: `${import.meta.env.BASE_URL}images/gallery-processing.jpg`,
    category: 'processing',
  },
  {
    id: '5',
    title: '茶汤',
    description: '琥珀色茶汤，英红九号标志性汤色',
    imageUrl: `${import.meta.env.BASE_URL}images/gallery-soup.jpg`,
    category: 'teaSoup',
  },
  {
    id: '6',
    title: '理赔查勘',
    description: '农技服务团队深入茶园开展技术指导',
    imageUrl: `${import.meta.env.BASE_URL}images/gallery-inspection.jpg`,
    category: 'survey',
  },
]
