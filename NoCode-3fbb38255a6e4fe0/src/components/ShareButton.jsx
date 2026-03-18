import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { generateShareText } from '@/utils/mockData';
import { toast } from 'sonner';

const ShareButton = ({ analysisResult }) => {
  const handleShare = async () => {
    const text = generateShareText(analysisResult);
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success('报告已复制到剪贴板！');
    } catch (err) {
      // 降级方案：使用 textarea
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('报告已复制到剪贴板！');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-1"
    >
      <Share2 className="h-4 w-4" />
      分享报告
    </Button>
  );
};

export default ShareButton;
