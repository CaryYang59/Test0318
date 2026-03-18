import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Trash2, Clock } from 'lucide-react';
import { getHistory, clearHistory } from '@/utils/mockData';

const HistoryPanel = ({ onLoadHistory }) => {
  const history = getHistory();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClearHistory = () => {
    if (confirm('确定要清空所有历史记录吗？')) {
      clearHistory();
      onLoadHistory();
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5 text-blue-500" />
            历史记录
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-500"
            onClick={handleClearHistory}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            清空
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {history.slice(0, 5).map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onLoadHistory(record)}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{record.restaurantName}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatDate(record.timestamp)}
                </div>
              </div>
              <Badge variant="outline" className="ml-2 shrink-0">
                {record.commentCount}条
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryPanel;
