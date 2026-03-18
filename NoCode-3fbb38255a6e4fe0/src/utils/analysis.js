// 评论分析工具函数

// 维度关键词词典
const DIMENSION_KEYWORDS = {
  菜品: {
    positive: ['好吃', '美味', '新鲜', '地道', '正宗', '香', '嫩', '入味', '精致', '绝了', '棒', '赞', '推荐'],
    negative: ['难吃', '咸', '淡', '腥', '老', '柴', '腻', '不新鲜', '变质', '踩雷', '失望'],
    keywords: ['麻婆豆腐', '回锅肉', '水煮鱼', '宫保鸡丁', '红烧肉', '火锅', '烧烤', '小龙虾', '招牌菜', '特色菜', '口味', '味道', '菜量', '分量']
  },
  服务: {
    positive: ['热情', '周到', '贴心', '迅速', '及时', '友好', '耐心', '细致', '专业'],
    negative: ['慢', '冷淡', '不耐烦', '态度差', '忽视', '等太久', '催不动', '服务差'],
    keywords: ['服务员', '上菜', '点餐', '等位', '排队', '预订', '外卖', '打包', '叫号', '迎宾']
  },
  环境: {
    positive: ['干净', '整洁', '舒适', '优雅', '温馨', '宽敞', '明亮', '有情调', '安静', '惬意'],
    negative: ['脏', '乱', '吵', '拥挤', '狭窄', '暗', '油烟味', '嘈杂', '卫生差'],
    keywords: ['装修', '氛围', '座位', '包间', '停车', '空调', '音乐', '灯光', '卫生间', '布局']
  },
  价格: {
    positive: ['实惠', '划算', '便宜', '性价比高', '物超所值', '公道', '良心'],
    negative: ['贵', '不划算', '性价比低', '不值', '宰客', '价格高', '偏贵'],
    keywords: ['人均', '消费', '买单', '折扣', '优惠', '团购', '套餐', 'AA', '会员']
  }
};

// 情感分析
export const analyzeSentiment = (text) => {
  const result = {
    菜品: { positive: 0, negative: 0, neutral: 0 },
    服务: { positive: 0, negative: 0, neutral: 0 },
    环境: { positive: 0, negative: 0, neutral: 0 },
    价格: { positive: 0, negative: 0, neutral: 0 }
  };
  
  let totalPositive = 0;
  let totalNegative = 0;
  
  Object.keys(DIMENSION_KEYWORDS).forEach(dimension => {
    const { positive, negative, keywords } = DIMENSION_KEYWORDS[dimension];
    
    // 检查是否提到该维度的关键词
    const hasDimensionKeyword = keywords.some(kw => text.includes(kw));
    
    // 计算正负面情感
    const positiveCount = positive.filter(word => text.includes(word)).length;
    const negativeCount = negative.filter(word => text.includes(word)).length;
    
    if (hasDimensionKeyword || positiveCount > 0 || negativeCount > 0) {
      if (positiveCount > negativeCount) {
        result[dimension].positive = 1;
        totalPositive++;
      } else if (negativeCount > positiveCount) {
        result[dimension].negative = 1;
        totalNegative++;
      } else {
        result[dimension].neutral = 1;
      }
    }
  });
  
  // 整体情感
  let overallSentiment = 'neutral';
  if (totalPositive > totalNegative) {
    overallSentiment = 'positive';
  } else if (totalNegative > totalPositive) {
    overallSentiment = 'negative';
  }
  
  return { ...result, overallSentiment };
};

// 关键词提取
export const extractKeywords = (comments) => {
  const allText = comments.join(' ');
  const result = {
    菜品: [],
    服务: [],
    环境: [],
    价格: []
  };
  
  Object.keys(DIMENSION_KEYWORDS).forEach(dimension => {
    const { keywords } = DIMENSION_KEYWORDS[dimension];
    const wordCount = {};
    
    keywords.forEach(word => {
      const regex = new RegExp(word, 'g');
      const matches = allText.match(regex);
      if (matches) {
        wordCount[word] = matches.length;
      }
    });
    
    // 按词频排序，取前5
    result[dimension] = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));
  });
  
  return result;
};

// 提取优缺点
export const extractProsAndCons = (comments) => {
  const pros = [];
  const cons = [];
  
  comments.forEach(comment => {
    Object.keys(DIMENSION_KEYWORDS).forEach(dimension => {
      const { positive, negative, keywords } = DIMENSION_KEYWORDS[dimension];
      
      const hasKeyword = keywords.some(kw => comment.includes(kw));
      const positiveWords = positive.filter(word => comment.includes(word));
      const negativeWords = negative.filter(word => comment.includes(word));
      
      if (positiveWords.length > 0 && hasKeyword) {
        positiveWords.forEach(word => {
          const existing = pros.find(p => p.text.includes(word));
          if (existing) {
            existing.count++;
          } else {
            pros.push({ text: `${dimension}${word}`, dimension, count: 1 });
          }
        });
      }
      
      if (negativeWords.length > 0 && hasKeyword) {
        negativeWords.forEach(word => {
          const existing = cons.find(c => c.text.includes(word));
          if (existing) {
            existing.count++;
          } else {
            cons.push({ text: `${dimension}${word}`, dimension, count: 1 });
          }
        });
      }
    });
  });
  
  // 排序取前3
  const topPros = pros.sort((a, b) => b.count - a.count).slice(0, 3);
  const topCons = cons.sort((a, b) => b.count - a.count).slice(0, 3);
  
  return { pros: topPros, cons: topCons };
};

// 生成摘要
export const generateSummary = (restaurantName, comments) => {
  const sentimentResult = analyzeSentiment(comments.join(' '));
  const { pros, cons } = extractProsAndCons(comments);
  const keywords = extractKeywords(comments);
  
  // 计算各维度正面比例
  const dimensionSentiments = {};
  Object.keys(sentimentResult).forEach(key => {
    if (key !== 'overallSentiment') {
      const { positive, negative, neutral } = sentimentResult[key];
      const total = positive + negative + neutral;
      if (total > 0) {
        dimensionSentiments[key] = Math.round((positive / total) * 100);
      }
    }
  });
  
  // 确定整体口碑
  let overall = '中性';
  if (sentimentResult.overallSentiment === 'positive') {
    overall = '正面';
  } else if (sentimentResult.overallSentiment === 'negative') {
    overall = '负面';
  }
  
  // 生成摘要文本
  const bestDimension = Object.entries(dimensionSentiments)
    .sort((a, b) => b[1] - a[1])[0];
  const worstDimension = Object.entries(dimensionSentiments)
    .sort((a, b) => a[1] - b[1])[0];
  
  const prosText = pros.length > 0 ? pros.map(p => p.text).join('、') : '暂无明显优点';
  const consText = cons.length > 0 ? cons.map(c => c.text).join('、') : '暂无明显缺点';
  
  const summary = `【${restaurantName}】整体口碑${overall}。最受好评的是${bestDimension ? bestDimension[0] : '综合体验'}，主要槽点在于${worstDimension ? worstDimension[0] : '暂无'}。优点：${prosText}；缺点：${consText}。适合对${bestDimension ? bestDimension[0] : '用餐体验'}有要求的食客。`;
  
  return {
    summary,
    dimensionSentiments,
    pros,
    cons,
    keywords
  };
};

// 分析单条评论
export const analyzeComment = (comment) => {
  const sentiment = analyzeSentiment(comment);
  return {
    text: comment,
    sentiment: sentiment.overallSentiment,
    details: sentiment
  };
};
