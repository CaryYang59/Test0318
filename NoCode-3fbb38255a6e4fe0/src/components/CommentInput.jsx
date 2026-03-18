import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Trash2, Upload, History } from 'lucide-react';
import { SAMPLE_COMMENTS } from '@/utils/mockData';

const CommentInput = ({ onAnalyze, isLoading }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [comments, setComments] = useState('');
  const [commentCount, setCommentCount] = useState(0);

  const handleCommentsChange = (e) => {
    const text = e.target.value;
    setComments(text);
    // 统计评论条数（按换行分割，过滤空行）
    const lines = text.split('\n').filter(line => line.trim());
    setCommentCount(lines.length);
  };

  const handleLoadSample = () => {
    setComments(SAMPLE_COMMENTS.join('\n'));
    setCommentCount(SAMPLE_COMMENTS.length);
  };

  const handleClear = () => {
    setComments('');
    setCommentCount(0);
    setRestaurantName('');
  };

  const handleSubmit = () => {
    const commentList = comments.split('\n').filter(line => line.trim());
    if (!restaurantName.trim()) {
      alert('请输入餐厅名称');
      return;
    }
    if (commentList.length === 0) {
      alert('请输入至少一条评论');
      return;
    }
    if (commentList.length > 50) {
      alert('评论数量超过50条，请分批处理');
      return;
    }
    onAnalyze(restaurantName, commentList);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          评论分析
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 餐厅名称输入 */}
        <div className="space-y-2">
          <Label htmlFor="restaurant-name">餐厅名称</Label>
          <Input
            id="restaurant-name"
            placeholder="请输入餐厅名称..."
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 评论输入区 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="comments">用户评论（每条一行）</Label>
            <div className="flex items-center gap-2">
              {commentCount > 0 && (
                <Badge variant={commentCount > 50 ? 'destructive' : 'secondary'}>
                  {commentCount}/50 条
                </Badge>
              )}
            </div>
          </div>
          <Textarea
            id="comments"
            placeholder="粘贴用户评论，每条评论占一行..."
            value={comments}
            onChange={handleCommentsChange}
            className="min-h-[200px] resize-none"
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadSample}
            disabled={isLoading}
          >
            <Upload className="h-4 w-4 mr-1" />
            加载示例
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            清空
          </Button>
          <Button
            className="ml-auto bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={isLoading || !restaurantName.trim() || commentCount === 0}
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 mr-1 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-1" />
                开始分析
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentInput;
