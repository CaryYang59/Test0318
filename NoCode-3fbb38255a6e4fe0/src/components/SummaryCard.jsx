import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const SummaryCard = ({ summary, dimensionSentiments }) => {
  const getSentimentIcon = (sentiment) => {
    if (sentiment === 'positive') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (sentiment === 'negative') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getSentimentColor = (value) => {
    if (value >= 70) return 'bg-green-100 text-green-800';
    if (value >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          一段话总结
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 摘要文本 */}
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
          {summary}
        </p>

        {/* 各维度情感 */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(dimensionSentiments).map(([dimension, value]) => (
            <Badge
              key={dimension}
              variant="outline"
              className={`${getSentimentColor(value)} px-3 py-1`}
            >
              {dimension} {value}%正面
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
