import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { X, Flame, TrendingUp, Users } from "lucide-react";

interface LiveBettingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPageChange: (page: string) => void;
  isLoggedIn?: boolean;
}

export function LiveBettingPopup({ isOpen, onClose, onPageChange, isLoggedIn }: LiveBettingPopupProps) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinLive = () => {
    onClose();
    onPageChange(isLoggedIn ? 'sports' : 'signin');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-red-500 text-white max-w-md" aria-describedby="live-betting-description">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              LIVE BETTING
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-gray-300 p-1"
            >
              <X className="w-4 h-4 font-bold" />
            </Button>
          </div>
          <DialogDescription className="text-gray-400" id="live-betting-description">
            Limited time to join the hottest live matches!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {formatTime(timeLeft)}
            </div>
          </div>

          <Card className="bg-red-900/20 border-red-500/30 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Flame className="w-6 h-6 text-red-400" />
              <div>
                <div className="font-bold text-white">City Eagles vs United Wolves</div>
                <div className="text-sm text-gray-300">Championship Final - 45' MIN</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-400">Home</div>
                <div className="font-bold text-green-400">2.15</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Draw</div>
                <div className="font-bold text-yellow-400">3.20</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Away</div>
                <div className="font-bold text-green-400">3.45</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="text-gray-400">2,847 betting live</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-green-400">Odds rising</span>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">🔥 Hot Bets Available</span>
              <Badge className="bg-red-600 text-white text-xs">LIVE</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">⚡ Instant Payouts</span>
              <Badge className="bg-green-600 text-white text-xs">ACTIVE</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">🎯 Best Odds Guaranteed</span>
              <Badge className="bg-yellow-600 text-white text-xs">LIMITED</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleJoinLive}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              {isLoggedIn ? 'JOIN LIVE BETTING' : 'SIGN IN TO BET'}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Later
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Don't miss out on the action! Live odds update in real-time.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}