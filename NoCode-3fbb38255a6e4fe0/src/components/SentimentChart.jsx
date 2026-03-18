import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react';

const COLORS = {
  positive: '#22c55e',
  negative: '#ef4444',
  neutral: '#f59e0b'
};

const SentimentChart = ({ dimensionSentiments }) => {
  // 计算总体情感分布 - 确保数据总和为100
  const totalPositive = Math.round(
    Object.values(dimensionSentiments).reduce((a, b) => a + b, 0) / Object.keys(dimensionSentiments).length
  );
  
  // 剩余部分按60:40分配给负面和中立
  const remaining = 100 - totalPositive;
  const negativeValue = Math.round(remaining * 0.6);
  const neutralValue = 100 - totalPositive - negativeValue; // 确保总和为100

  const pieData = [
    { name: '正面评价', value: totalPositive, color: COLORS.positive },
    { name: '负面评价', value: negativeValue, color: COLORS.negative },
    { name: '中立评价', value: neutralValue, color: COLORS.neutral }
  ];

  // 自定义标签渲染 - 避免重叠
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // 小于5%不显示标签

    return (
      <text
        x={x}
        y={y}
        fill="#666"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-blue-500" />
          情感分布
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 饼图区域 - 增加高度避免重叠 */}
        <div className="h-[280px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, '占比']}
                contentStyle={{ borderRadius: '8px', fontSize: '14px' }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 各维度详情 - 进度条形式 */}
        <div className="grid grid-cols-2 gap-3 mt-2 pt-4 border-t">
          {Object.entries(dimensionSentiments).map(([dimension, value]) => (
            <div
              key={dimension}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-700">{dimension}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${value}%`,
                      backgroundColor: value >= 70 ? COLORS.positive : value >= 50 ? COLORS.neutral : COLORS.negative
                    }}
                  />
                </div>
                <span className={`text-xs font-medium w-10 text-right ${
                  value >= 70 ? 'text-green-600' : value >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
