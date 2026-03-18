import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Store } from 'lucide-react';
import { MOCK_MERCHANT_ACCOUNT } from '@/utils/mockData';

const MerchantLogin = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === MOCK_MERCHANT_ACCOUNT.username && password === MOCK_MERCHANT_ACCOUNT.password) {
      onLogin({
        username,
        restaurantName: MOCK_MERCHANT_ACCOUNT.restaurantName
      });
      onClose();
      setUsername('');
      setPassword('');
    } else {
      setError('用户名或密码错误（提示：demo / 123456）');
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-blue-500" />
            商家登录
          </DialogTitle>
          <DialogDescription>
            登录后可查看详细的数据分析和改进建议
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="merchant-username">用户名</Label>
            <Input
              id="merchant-username"
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="merchant-password">密码</Label>
            <Input
              id="merchant-password"
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded">
            💡 演示账号：demo / 123456
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>登录中...</>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-1" />
                登录
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MerchantLogin;
