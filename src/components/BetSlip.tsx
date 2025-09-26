import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { X, Trash2, DollarSign, TrendingUp, Calculator } from "lucide-react";

interface BetSlipProps {
  isOpen: boolean;
  onClose: () => void;
  bets: Array<{
    id: string;
    team: string;
    opponent: string;
    odds: number;
    type: string;
    stake?: number;
  }>;
  onRemoveBet: (id: string) => void;
  onUpdateStake: (id: string, stake: number) => void;
  onClearAll: () => void;
  onPlaceBets: (bets: Array<{
    id: string;
    team: string;
    opponent: string;
    odds: number;
    type: string;
    stake: number;
  }>, totalStake: number) => void;
  userBalance?: number;
}

export function BetSlip({ 
  isOpen, 
  onClose, 
  bets, 
  onRemoveBet, 
  onUpdateStake,
  onClearAll,
  onPlaceBets,
  userBalance = 0
}: BetSlipProps) {
  const [quickStakeAmount, setQuickStakeAmount] = useState<number>(10);
  
  const totalStake = bets.reduce((sum, bet) => sum + (bet.stake || 0), 0);
  const potentialWin = bets.reduce((sum, bet) => sum + ((bet.stake || 0) * bet.odds), 0);
  const potentialProfit = potentialWin - totalStake;
  
  const hasInsufficientBalance = totalStake > userBalance;
  const hasValidBets = bets.some(bet => bet.stake && bet.stake > 0);
  
  const applyQuickStake = (betId: string) => {
    onUpdateStake(betId, quickStakeAmount);
  };
  
  const applyStakeToAll = () => {
    bets.forEach(bet => {
      onUpdateStake(bet.id, quickStakeAmount);
    });
  };

  const handlePlaceBets = () => {
    const validBets = bets.filter(bet => bet.stake && bet.stake > 0);
    if (validBets.length > 0) {
      onPlaceBets(validBets as Array<{
        id: string;
        team: string;
        opponent: string;
        odds: number;
        type: string;
        stake: number;
      }>, totalStake);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg bg-gray-900 text-white border-l border-gray-700 p-0 flex flex-col h-full"
        aria-describedby="bet-slip-description"
        showClose={false}
      >
        <SheetHeader className="px-6 py-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-2xl text-green-400 flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Bet Slip
              </SheetTitle>
              <SheetDescription className="text-gray-200 mt-1" id="bet-slip-description">
                {bets.length} selection{bets.length !== 1 ? 's' : ''} • Balance: ${userBalance.toFixed(2)}
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-gray-700 h-8 w-8 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Balance and Quick Actions */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-lg font-bold text-green-400">${userBalance.toFixed(2)}</span>
              <span className="text-sm text-gray-400">Available</span>
            </div>
            {bets.length > 0 && (
              <Button
                size="sm"
                onClick={onClearAll}
                className="bg-red-600 text-white hover:bg-red-700 text-xs border-none"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Quick Stake Controls */}
          {bets.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-200">Quick Stake:</span>
                <Input
                  type="number"
                  value={quickStakeAmount}
                  onChange={(e) => setQuickStakeAmount(parseFloat(e.target.value) || 0)}
                  className="w-20 h-8 bg-gray-700 border-gray-600 text-white text-sm"
                  placeholder="10"
                />
                <Button
                  size="sm"
                  onClick={applyStakeToAll}
                  className="h-8 text-xs bg-green-600 text-black hover:bg-green-700 border-none"
                >
                  Apply to All
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bets List */}
        <div className="flex-1 overflow-hidden">
          {bets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <Calculator className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl text-gray-300 mb-2">No Bets Selected</h3>
              <p className="text-gray-500 text-sm">
                Add bets from the sports section to get started
              </p>
            </div>
          ) : (
            <ScrollArea className="h-full px-6 py-4">
              <div className="space-y-4">
                {bets.map((bet, index) => (
                  <Card key={bet.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                    <div className="p-4">
                      {/* Bet Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                              {bet.type}
                            </Badge>
                            <span className="text-xs text-gray-400">#{index + 1}</span>
                          </div>
                          <h4 className="font-semibold text-sm leading-tight text-white">
                            {bet.team} <span className="text-white">vs</span> {bet.opponent}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600 text-white font-bold">
                            {bet.odds.toFixed(2)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveBet(bet.id)}
                            className="text-gray-400 hover:text-red-400 h-6 w-6 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Stake Input */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-gray-400">Stake Amount</label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => applyQuickStake(bet.id)}
                            className="text-xs text-green-400 hover:text-green-300 h-5 px-2"
                          >
                            Use ${quickStakeAmount}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={bet.stake || ''}
                            onChange={(e) => onUpdateStake(bet.id, parseFloat(e.target.value) || 0)}
                            className="flex-1 bg-gray-700 border-gray-600 text-white h-9"
                          />
                          {bet.stake && bet.stake > 0 && (
                            <div className="text-right">
                              <div className="text-xs text-gray-400">Returns</div>
                              <div className="text-sm font-bold text-green-400">
                                ${(bet.stake * bet.odds).toFixed(2)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Summary and Place Bet */}
        {bets.length > 0 && (
          <div className="border-t border-gray-700 bg-gray-800 p-6 space-y-4">
            {/* Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="font-semibold text-green-400">Bet Summary</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Stake:</span>
                    <span className={`font-bold ${hasInsufficientBalance ? 'text-red-400' : 'text-white'}`}>
                      ${totalStake.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Potential Win:</span>
                    <span className="font-bold text-green-400">${potentialWin.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Profit:</span>
                    <span className="font-bold text-yellow-400">${potentialProfit.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Selections:</span>
                    <span className="font-bold text-white">{bets.length}</span>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />
            </div>

            {/* Error Messages */}
            {hasInsufficientBalance && (
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium text-sm">
                    Insufficient Balance
                  </span>
                </div>
                <p className="text-red-300 text-xs mt-1">
                  You need ${(totalStake - userBalance).toFixed(2)} more to place these bets.
                </p>
              </div>
            )}

            {/* Place Bet Button */}
            <Button 
              className={`w-full h-12 font-bold text-lg ${
                hasInsufficientBalance 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
              disabled={!hasValidBets}
              onClick={handlePlaceBets}
            >
              {hasInsufficientBalance ? 'Add Funds' : `Place Bet${bets.length > 1 ? 's' : ''}`}
            </Button>

            <p className="text-xs text-gray-300 text-center">
              🔒 Licensed and regulated • Responsible gambling
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}