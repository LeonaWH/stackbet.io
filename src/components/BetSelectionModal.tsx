import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { TrendingUp } from "lucide-react";

interface BetSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeOdds: number;
    drawOdds?: number | null;
    awayOdds: number;
    tournament?: string;
  };
  onSelectBet: (
    id: string,
    team: string,
    opponent: string,
    odds: number,
    type: string
  ) => void;
}

export function BetSelectionModal({
  isOpen,
  onClose,
  match,
  onSelectBet,
}: BetSelectionModalProps) {
  const handleBetSelection = (
    team: string,
    opponent: string,
    odds: number,
    type: string
  ) => {
    onSelectBet(match.id, team, opponent, odds, type);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Select Your Bet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Match Info */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-1">
                {match.homeTeam} vs {match.awayTeam}
              </h3>
              {match.tournament && (
                <p className="text-sm text-gray-400">{match.tournament}</p>
              )}
            </div>
          </div>

          {/* Betting Options */}
          <div className="space-y-3">
            <p className="text-sm text-gray-400 font-medium">
              Choose your selection:
            </p>

            {/* Home Win */}
            <Button
              onClick={() =>
                handleBetSelection(
                  match.homeTeam,
                  match.awayTeam,
                  match.homeOdds,
                  `${match.homeTeam} Win`
                )
              }
              className="w-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 text-base border-2 border-green-500 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between w-full">
                <span>{match.homeTeam} Win</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xl">{match.homeOdds.toFixed(2)}</span>
                </div>
              </div>
            </Button>

            {/* Draw (if applicable) */}
            {match.drawOdds && (
              <Button
                onClick={() =>
                  handleBetSelection(
                    "Draw",
                    `${match.homeTeam} vs ${match.awayTeam}`,
                    match.drawOdds,
                    "Draw"
                  )
                }
                className="w-full bg-gradient-to-br from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold py-6 text-base border-2 border-yellow-500 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between w-full">
                  <span>Draw</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xl">{match.drawOdds.toFixed(2)}</span>
                  </div>
                </div>
              </Button>
            )}

            {/* Away Win */}
            <Button
              onClick={() =>
                handleBetSelection(
                  match.awayTeam,
                  match.homeTeam,
                  match.awayOdds,
                  `${match.awayTeam} Win`
                )
              }
              className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 text-base border-2 border-blue-500 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between w-full">
                <span>{match.awayTeam} Win</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xl">{match.awayOdds.toFixed(2)}</span>
                </div>
              </div>
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center pt-2">
            Your selection will be added to the bet slip
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
