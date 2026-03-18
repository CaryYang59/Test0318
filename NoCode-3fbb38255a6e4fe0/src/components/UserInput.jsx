import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Sparkles } from 'lucide-react';

const UserInput = ({ onViewSummary, onAddComment, isLoading, hasResult }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showAddComment, setShowAddComment] = useState(false);

  const handleViewSummary = () => {
    if (!restaurantName.trim()) {
      alert('请输入餐厅名称');
      return;
    }
    onViewSummary(restaurantName.trim());
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert('请输入您的评价');
      return;
    }
    onAddComment(newComment.trim());
    setNewComment('');
    setShowAddComment(false);
  };

  return (
    <div className="space-y-4">
      {/* 餐厅查询卡片 */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            查询餐厅口碑
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurant-name">餐厅名称</Label>
            <div className="flex gap-2">
              <Input
                id="restaurant-name"
                placeholder="输入餐厅名称，如：海底捞、外婆家..."
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleViewSummary()}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 shrink-0"
                onClick={handleViewSummary}
                disabled={isLoading || !restaurantName.trim()}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-1 animate-spin" />
                    查询中...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-1" />
                    查看概要
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 热门餐厅推荐 */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">热门：</span>
            {['海底捞火锅', '外婆家', '西贝莜面村', '绿茶餐厅'].map((name) => (
              <Badge
                key={name}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => setRestaurantName(name)}
              >
                {name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 补充评价卡片 - 仅在有结果后显示 */}
      {hasResult && (
        <Card className="w-full border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-700">
              <Plus className="h-5 w-5" />
              补充我的评价
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!showAddComment ? (
              <Button
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-100"
                onClick={() => setShowAddComment(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                我也来说两句
              </Button>
            ) : (
              <>
                <Textarea
                  placeholder="分享您的用餐体验，您的评价将帮助更多人了解这家餐厅..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddComment(false);
                      setNewComment('');
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    提交评价
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserInput;
