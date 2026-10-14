// Company facts shown on the site. Anything in [brackets] is a placeholder
// waiting for the company to confirm; never replace it with a guess.

export type Lang = 'zh' | 'en';

export const company = {
  nameZh: '无锡巴特夫化工科技有限公司',
  nameEn: '[Official English company name]',
  brand: 'BATOV',
  brandZh: '巴特夫',
  phone400: '400-1588-777',
  phoneLocal: '0510-83795971',
  email: 'batov@foxmail.com',
  salesEmailEn: '[sales email]',
  wechat: '[微信号]',
  whatsapp: '', // e.g. '8613800000000' — empty until the company provides it
  addressZh: '江苏省无锡市新吴区纺城大道288号',
  addressEn: 'No. 288 Fangcheng Avenue, Xinwu District, Wuxi, Jiangsu, China',
  years: '20+',
  icp: '', // 备案号: decided once hosting is final
};

// Form submissions go to this endpoint (e.g. a form service that forwards to
// WeCom / email). Empty means the preview shows a "not connected yet" notice.
export const formEndpoint = '';

export const t = {
  zh: {
    nav: { home: '首页', systems: '产品中心', cases: '工程案例', docs: '技术参数', faq: '常见问题', about: '关于我们', contact: '联系我们' },
    inquiry: '询价单',
    quote: '获取报价',
    switchLabel: 'EN',
    switchAria: 'EN · Switch to English',
    tagline: '地坪材料源头工厂 · 江苏无锡',
    footerLine: '环氧地坪 · 聚氨酯地坪 · 防腐地坪材料',
    rights: '版权所有',
    hotline: '全国热线',
  },
  en: {
    nav: { home: 'Home', systems: 'Products', cases: 'Projects', docs: 'Technical data', faq: 'FAQ', about: 'Distributors & OEM', contact: 'Contact' },
    inquiry: 'Inquiry list',
    quote: 'Get a Quote',
    switchLabel: '中文',
    switchAria: '中文 · 切换到中文',
    tagline: 'Floor coatings manufacturer · Wuxi, China',
    footerLine: 'Epoxy · Polyurethane · Chemical-resistant floor coatings',
    rights: 'All rights reserved.',
    hotline: 'Phone',
  },
} as const;
