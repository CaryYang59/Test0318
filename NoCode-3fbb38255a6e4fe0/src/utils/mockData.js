
// 模拟数据和历史记录管理

// 示例评论数据
export const SAMPLE_COMMENTS = [
  "麻婆豆腐绝了，服务员态度很好，就是停车不太方便",
  "菜量有点少，价格偏贵，环境还不错",
  "等了40分钟，上菜慢，但味道没得说",
  "环境优雅，适合约会，菜品精致但分量一般",
  "服务员很热情，推荐的水煮鱼很好吃，性价比高",
  "停车方便，上菜快，就是环境有点吵",
  "人均80左右，味道正宗，就是排队太久",
  "招牌红烧肉必点！环境干净整洁，服务周到",
  "价格实惠，菜量大，就是位置有点偏",
  "菜品口味一般，服务态度冷淡，不推荐"
];

// 商家模拟数据 - 趋势分析
export const MOCK_TREND_DATA = [
  { month: '1月', positive: 65, negative: 20, neutral: 15 },
  { month: '2月', positive: 70, negative: 18, neutral: 12 },
  { month: '3月', positive: 68, negative: 22, neutral: 10 },
  { month: '4月', positive: 75, negative: 15, neutral: 10 },
  { month: '5月', positive: 72, negative: 18, neutral: 10 },
  { month: '6月', positive: 78, negative: 12, neutral: 10 }
];

// 商家模拟数据 - 维度评分趋势
export const MOCK_DIMENSION_TREND = [
  { month: '1月', 菜品: 4.2, 服务: 3.8, 环境: 4.0, 价格: 3.5 },
  { month: '2月', 菜品: 4.3, 服务: 3.9, 环境: 4.1, 价格: 3.6 },
  { month: '3月', 菜品: 4.1, 服务: 3.7, 环境: 4.0, 价格: 3.5 },
  { month: '4月', 菜品: 4.4, 服务: 4.0, 环境: 4.2, 价格: 3.7 },
  { month: '5月', 菜品: 4.3, 服务: 4.1, 环境: 4.1, 价格: 3.8 },
  { month: '6月', 菜品: 4.5, 服务: 4.2, 环境: 4.3, 价格: 3.9 }
];

// 商家改进建议
export const MOCK_IMPROVEMENT_SUGGESTIONS = [
  {
    dimension: '服务',
    priority: 'high',
    issue: '上菜速度偏慢',
    suggestion: '建议优化后厨出菜流程，或增加预点餐服务，减少顾客等待时间',
    impact: '预计可提升服务满意度15%'
  },
  {
    dimension: '环境',
    priority: 'medium',
    issue: '停车不便',
    suggestion: '可提供代客泊车服务，或与附近停车场合作提供优惠停车',
    impact: '预计可提升便利性评价10%'
  },
  {
    dimension: '价格',
    priority: 'medium',
    issue: '性价比感知偏低',
    suggestion: '建议推出套餐优惠或会员折扣活动，提升性价比感知',
    impact: '预计可提升复购率8%'
  }
];

// Mock 商家登录信息
export const MOCK_MERCHANT_ACCOUNT = {
  username: 'demo',
  password: '123456',
  restaurantName: '示例餐厅'
};

// 预设餐厅数据 - 用于用户视角查询
export const PRESET_RESTAURANTS = {
  '海底捞火锅': {
    comments: [
      "服务太好了，等位时有美甲和小吃，服务员特别热情",
      "番茄锅底绝了，牛肉粒很嫩，价格稍贵但值得",
      "等了2小时才进去，不过体验确实不错",
      "环境干净整洁，服务员会帮忙捞浮沫",
      "人均150左右，性价比一般，服务满分",
      "菜品新鲜，推荐虾滑和毛肚，味道正宗"
    ]
  },
  '外婆家': {
    comments: [
      "茶香鸡必点！外酥里嫩，价格实惠",
      "排队太久，等了1个半小时，差点放弃",
      "人均60左右，性价比超高，适合聚餐",
      "环境有点吵，人太多了，但味道不错",
      "服务员忙不过来，上菜有点慢",
      "西湖醋鱼很正宗，推荐推荐！"
    ]
  },
  '西贝莜面村': {
    comments: [
      "莜面窝窝很好吃，黄馍馍也不错",
      "价格偏贵，人均100+，量有点少",
      "环境干净，服务态度好，上菜快",
      "羊肉串很嫩，酸奶好喝，适合带老人孩子",
      "分量小，两个人点了5个菜才吃饱",
      "开放式厨房看着干净，食品安全放心"
    ]
  },
  '绿茶餐厅': {
    comments: [
      "面包诱惑必点！冰火两重天的感觉",
      "性价比高，人均60-70，环境有情调",
      "等位太久，建议提前预约",
      "菜品精致，分量刚好，适合拍照",
      "服务一般，服务员有点冷淡",
      "绿茶饼很好吃，推荐！"
    ]
  },
  '呷哺呷哺': {
    comments: [
      "一人一锅，干净卫生，适合独食",
      "调料台种类多，自己调很有趣",
      "价格便宜，人均50左右，性价比高",
      "肉质一般，不算特别新鲜",
      "上菜快，翻台率高，不用等太久",
      "环境有点挤，桌子小，东西放不下"
    ]
  }
};

// 获取预设餐厅数据
export const getPresetRestaurant = (name) => {
  // 精确匹配
  if (PRESET_RESTAURANTS[name]) {
    return PRESET_RESTAURANTS[name];
  }
  // 模糊匹配
  const found = Object.keys(PRESET_RESTAURANTS).find(key => 
    name.includes(key) || key.includes(name)
  );
  return found ? PRESET_RESTAURANTS[found] : null;
};

// 生成随机评论数据（用于未预设的餐厅）
export const generateRandomComments = (restaurantName) => {
  const templates = [
    `${restaurantName}的味道还不错，下次还会再来`,
    `环境干净整洁，服务态度一般`,
    `价格适中，性价比还可以`,
    `等位时间有点长，但值得等待`,
    `菜品口味中等，没有特别惊艳`,
    `朋友推荐的，总体感觉还行`,
    `位置有点偏，不好停车`,
    `分量足，两个人吃得很饱`
  ];
  // 随机取5-8条
  const count = Math.floor(Math.random() * 4) + 5;
  const shuffled = [...templates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// 历史记录管理
const HISTORY_KEY = 'restaurant_analysis_history';
const MAX_HISTORY = 10;

export const saveToHistory = (record) => {
  try {
    const history = getHistory();
    const newRecord = {
      ...record,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    history.unshift(newRecord);
    // 保留最近10条
    const trimmedHistory = history.slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
    return newRecord;
  } catch (e) {
    console.error('保存历史记录失败:', e);
    return null;
  }
};

export const getHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

// 生成分享文本
export const generateShareText = (analysisResult) => {
  const { restaurantName, summary, pros, cons } = analysisResult;
  
  let text = `【${restaurantName} 评论分析报告】\n\n`;
  text += `📊 摘要：${summary}\n\n`;
  text += `✅ 优点：\n${pros.map((p, i) => `  ${i + 1}. ${p.text}`).join('\n')}\n\n`;
  text += `❌ 缺点：\n${cons.map((c, i) => `  ${i + 1}. ${c.text}`).join('\n')}\n\n`;
  text += `由「餐厅评论洞察」生成`;
  
  return text;
};

