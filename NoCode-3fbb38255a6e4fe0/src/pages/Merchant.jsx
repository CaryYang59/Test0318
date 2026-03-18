import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, LogOut, BarChart3, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import TrendChart from '@/components/TrendChart';
import ImprovementSuggestions from '@/components/ImprovementSuggestions';
import { MOCK_TREND_DATA } from '@/utils/mockData';

const Merchant = () => {
  // 计算统计数据
  const latestMonth = MOCK_TREND_DATA[MOCK_TREND_DATA.length - 1];
  const previousMonth = MOCK_TREND_DATA[MOCK_TREND_DATA.length - 2];
  
  const stats = [
    {
      title: '本月正面评价',
      value: `${latestMonth.positive}%`,
      change: latestMonth.positive - previousMonth.positive,
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: '本月负面评价',
      value: `${latestMonth.negative}%`,
      change: previousMonth.negative - latestMonth.negative,
      icon: AlertTriangle,
      color: 'text-red-500'
    },
    {
      title: '本月评论数',
      value: '156',
      change: 23,
      icon: BarChart3,
      color: 'text-blue-500'
    },
    {
      title: '平均评分',
      value: '4.2',
      change: 0.3,
      icon: Users,
      color: 'text-orange-500'
    }
  ];

  const handleLogout = () => {
    window.location.hash = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Store className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-800">商家中心</h1>
            <Badge variant="outline" className="ml-2">
              示例餐厅
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-1"
          >
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-xs mt-1 ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)} 较上月
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 趋势图和建议 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart />
          <ImprovementSuggestions />
        </div>

        {/* 操作提示 */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Store className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-800">商家专属功能</p>
                <p className="text-sm text-gray-600">
                  查看详细的数据趋势分析和个性化改进建议，帮助您提升餐厅口碑
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Merchant;
