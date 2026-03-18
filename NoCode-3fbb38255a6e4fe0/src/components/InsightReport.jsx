import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';

const InsightReport = ({ pros, cons }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          洞察报告
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top3 优点 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <ThumbsUp className="h-4 w-4" />
              <span className="font-medium">Top3 优点</span>
            </div>
            {pros.length > 0 ? (
              <div className="space-y-2">
                {pros.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-green-50 rounded-lg"
                  >
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{item.text}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {item.count}次提及
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 p-2">暂无明显优点</p>
            )}
          </div>

          {/* Top3 缺点 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600">
              <ThumbsDown className="h-4 w-4" />
              <span className="font-medium">Top3 缺点</span>
            </div>
            {cons.length > 0 ? (
              <div className="space-y-2">
                {cons.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 bg-red-50 rounded-lg"
                  >
                    <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{item.text}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {item.count}次提及
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 p-2">暂无明显缺点</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightReport;
