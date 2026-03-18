import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, User, RefreshCw, ArrowRight } from 'lucide-react';
import UserInput from '@/components/UserInput';
import SummaryCard from '@/components/SummaryCard';
import SentimentChart from '@/components/SentimentChart';
import KeywordTable from '@/components/KeywordTable';
import InsightReport from '@/components/InsightReport';
import HistoryPanel from '@/components/HistoryPanel';
import MerchantLogin from '@/components/MerchantLogin';
import ShareButton from '@/components/ShareButton';
import { generateSummary } from '@/utils/analysis';
import { saveToHistory, getPresetRestaurant, generateRandomComments } from '@/utils/mockData';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentRestaurant, setCurrentRestaurant] = useState('');
  const [currentComments, setCurrentComments] = useState([]);
  const [showMerchantLogin, setShowMerchantLogin] = useState(false);

  // 查看餐厅概要
  const handleViewSummary = useCallback(async (restaurantName) => {
    setIsLoading(true);
    setCurrentRestaurant(restaurantName);

    // 模拟加载延迟
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 获取预设数据或生成随机数据
    const preset = getPresetRestaurant(restaurantName);
    const comments = preset ? preset.comments : generateRandomComments(restaurantName);
    setCurrentComments(comments);

    // 生成分析结果
    const result = generateSummary(restaurantName, comments);
    const fullResult = {
      restaurantName,
      commentCount: comments.length,
      ...result
    };

    // 保存到历史
    saveToHistory({
      restaurantName,
      commentCount: comments.length,
      summary: result.summary
    });

    setAnalysisResult(fullResult);
    setIsLoading(false);
  }, []);

  // 补充评价
  const handleAddComment = useCallback((comment) => {
    if (!currentRestaurant) return;

    // 添加新评论到现有列表
    const newComments = [...currentComments, comment];
    setCurrentComments(newComments);

    // 重新分析
    const result = generateSummary(currentRestaurant, newComments);
    const fullResult = {
      restaurantName: currentRestaurant,
      commentCount: newComments.length,
      ...result
    };

    setAnalysisResult(fullResult);
  }, [currentRestaurant, currentComments]);

  const handleLoadHistory = useCallback((record) => {
    if (record && record.restaurantName) {
      handleViewSummary(record.restaurantName);
    }
  }, [handleViewSummary]);

  const handleMerchantLogin = useCallback(() => {
    window.location.hash = '/merchant';
  }, []);

  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentRestaurant('');
    setCurrentComments([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 左侧：工具名称 + 商家入口 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">评</span>
              </div>
              <h1 className="text-lg font-bold text-gray-800">餐厅评论洞察</h1>
            </div>
            
            {/* 商家入口按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMerchantLogin(true)}
              className="gap-1 ml-2 border-orange-300 text-orange-600 hover:bg-orange-50">
              
              <Store className="h-4 w-4" />
              我是商家
              <span className="hidden sm:inline">- 查看改进计划</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>

          {/* 右侧：当前视角提示 */}
          <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700">
            <User className="h-3 w-3" />
            我是用户 - 看看餐厅现状
          </Badge>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：输入区域 */}
          <div className="lg:col-span-1 space-y-4">
            <UserInput
              onViewSummary={handleViewSummary}
              onAddComment={handleAddComment}
              isLoading={isLoading}
              hasResult={!!analysisResult} />
            
            <HistoryPanel onLoadHistory={handleLoadHistory} />
          </div>

          {/* 右侧：结果区域 */}
          <div className="lg:col-span-2">
            {isLoading ?
            <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg border">
                <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500">正在查询餐厅口碑...</p>
              </div> :
            analysisResult ?
            <div className="space-y-4">
                {/* 操作栏 */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {analysisResult.restaurantName} - 口碑概要
                  </h2>
                  <div className="flex gap-2">
                    <ShareButton analysisResult={analysisResult} />
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}>
                    
                      <RefreshCw className="h-4 w-4 mr-1" />
                      查询其他餐厅
                    </Button>
                  </div>
                </div>

                {/* 结果卡片 */}
                <SummaryCard
                summary={analysisResult.summary}
                dimensionSentiments={analysisResult.dimensionSentiments} />
              
                <SentimentChart dimensionSentiments={analysisResult.dimensionSentiments} />
                <KeywordTable keywords={analysisResult.keywords} />
                <InsightReport pros={analysisResult.pros} cons={analysisResult.cons} />
              </div> :

            <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-dashed h-[508px]">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-gray-500 text-center mb-2">
                  输入餐厅名称，即可查看该餐厅的口碑概要
                </p>
                <p className="text-gray-400 text-sm text-center">
                  支持热门餐厅快速查询，也可以补充您的评价
                </p>
              </div>
            }
          </div>
        </div>
      </main>

      {/* 商家登录弹窗 */}
      <MerchantLogin
        isOpen={showMerchantLogin}
        onClose={() => setShowMerchantLogin(false)}
        onLogin={handleMerchantLogin} />
      
    </div>);

};

export default Index;
