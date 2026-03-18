import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, ArrowUpRight, Target } from 'lucide-react';
import { MOCK_IMPROVEMENT_SUGGESTIONS } from '@/utils/mockData';

const PRIORITY_CONFIG = {
  high: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800'
  },
  medium: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-800'
  },
  low: {
    icon: Info,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800'
  }
};

const ImprovementSuggestions = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          改进建议
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_IMPROVEMENT_SUGGESTIONS.map((item, index) => {
            const config = PRIORITY_CONFIG[item.priority];
            const Icon = config.icon;
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${config.border} ${config.bg}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 ${config.color} mt-0.5 shrink-0`} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.dimension}</Badge>
                      <Badge className={config.badge}>
                        {item.priority === 'high' ? '高优先级' : item.priority === 'medium' ? '中优先级' : '低优先级'}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      问题：{item.issue}
                    </p>
                    <p className="text-sm text-gray-600">
                      建议：{item.suggestion}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3" />
                      {item.impact}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovementSuggestions;
