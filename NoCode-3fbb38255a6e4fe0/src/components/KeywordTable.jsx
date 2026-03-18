import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hash, Utensils, Users, Building, DollarSign } from 'lucide-react';

const DIMENSION_ICONS = {
  菜品: Utensils,
  服务: Users,
  环境: Building,
  价格: DollarSign
};

const DIMENSION_COLORS = {
  菜品: 'bg-orange-100 text-orange-800 border-orange-200',
  服务: 'bg-blue-100 text-blue-800 border-blue-200',
  环境: 'bg-green-100 text-green-800 border-green-200',
  价格: 'bg-purple-100 text-purple-800 border-purple-200'
};

const KeywordTable = ({ keywords }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Hash className="h-5 w-5 text-blue-500" />
          高频关键词
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(keywords).map(([dimension, words]) => {
            const Icon = DIMENSION_ICONS[dimension];
            return (
              <div
                key={dimension}
                className="border rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{dimension}</span>
                </div>
                {words.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {words.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={DIMENSION_COLORS[dimension]}
                      >
                        {item.word}
                        <span className="ml-1 text-xs opacity-70">
                          ×{item.count}
                        </span>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">暂无相关关键词</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordTable;
