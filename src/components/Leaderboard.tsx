import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Trophy, TrendingUp, Crown, Star, Flame } from "lucide-react";

export function Leaderboard() {
  const topPlayers = [
    {
      id: 1,
      username: "BetKing99",
      winnings: 15420.50,
      winRate: 78.5,
      streak: 12,
      level: "Diamond",
      avatar: "BK"
    },
    {
      id: 2,
      username: "SportsMaster",
      winnings: 12890.25,
      winRate: 75.2,
      streak: 8,
      level: "Gold",
      avatar: "SM"
    },
    {
      id: 3,
      username: "OddsWizard",
      winnings: 11250.75,
      winRate: 72.8,
      streak: 15,
      level: "Gold",
      avatar: "OW"
    },
    {
      id: 4,
      username: "LuckyStrike",
      winnings: 9875.00,
      winRate: 69.4,
      streak: 5,
      level: "Silver",
      avatar: "LS"
    },
    {
      id: 5,
      username: "ProBettor",
      winnings: 8945.30,
      winRate: 71.1,
      streak: 7,
      level: "Silver",
      avatar: "PB"
    }
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Diamond":
        return <Crown className="w-4 h-4 text-cyan-400" />;
      case "Gold":
        return <Star className="w-4 h-4 text-yellow-400" />;
      case "Silver":
        return <Trophy className="w-4 h-4 text-gray-400" />;
      default:
        return <Trophy className="w-4 h-4 text-green-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Diamond":
        return "bg-cyan-600 text-white";
      case "Gold":
        return "bg-yellow-600 text-black";
      case "Silver":
        return "bg-gray-500 text-white";
      default:
        return "bg-green-600 text-white";
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
            Top Players This Week
          </h3>
          <Badge className="bg-green-600 text-white">
            Live Rankings
          </Badge>
        </div>

        <div className="space-y-4">
          {topPlayers.map((player, index) => (
            <div
              key={player.id}
              className={`p-3 sm:p-4 rounded-lg transition-colors ${
                index === 0 ? 'bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30' :
                index === 1 ? 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 border border-gray-500/30' :
                index === 2 ? 'bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-500/30' :
                'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                {/* Mobile: Top row with rank, avatar, name and level */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-gray-300' :
                      index === 2 ? 'text-amber-400' :
                      'text-white'
                    }`}>
                      #{index + 1}
                    </span>
                    {index === 0 && <Crown className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400" />}
                  </div>
                  
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarFallback className="bg-green-600 text-white font-bold text-xs sm:text-sm">
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="font-bold text-white text-sm sm:text-base truncate">{player.username}</span>
                      <Badge className={`text-xs w-fit ${getLevelColor(player.level)}`}>
                        {getLevelIcon(player.level)}
                        <span className="ml-1">{player.level}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Winnings - always visible on right for desktop */}
                  <div className="hidden sm:block text-right">
                    <div className="text-lg font-bold text-green-400">
                      ${player.winnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Winnings</div>
                  </div>
                </div>
                
                {/* Mobile: Bottom row with stats and winnings */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                    <span className="whitespace-nowrap">{player.winRate}% WR</span>
                    <span className="flex items-center whitespace-nowrap">
                      <Flame className="w-3 h-3 text-orange-400 mr-1 flex-shrink-0" />
                      {player.streak}
                    </span>
                  </div>
                  
                  {/* Mobile winnings */}
                  <div className="sm:hidden text-right">
                    <div className="font-bold text-green-400 text-sm">
                      ${player.winnings.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            Rankings update every hour based on net winnings
          </p>
        </div>
      </div>
    </Card>
  );
}

export function TrendingBets() {
  const trendingMatches = [
    {
      id: 1,
      homeTeam: "City Eagles",
      awayTeam: "United Wolves",
      sport: "Football",
      betsCount: 1247,
      popularBet: "City Eagles Win",
      odds: 2.15,
      trend: "up"
    },
    {
      id: 2,
      homeTeam: "Storm Riders",
      awayTeam: "Fire Hawks",
      sport: "Basketball",
      betsCount: 892,
      popularBet: "Over 210.5 Points",
      odds: 1.95,
      trend: "up"
    },
    {
      id: 3,
      homeTeam: "Cyber Knights",
      awayTeam: "Digital Warriors",
      sport: "eSports",
      betsCount: 756,
      popularBet: "Cyber Knights Win",
      odds: 1.65,
      trend: "down"
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
            Trending Bets
          </h3>
          <Badge className="bg-orange-600 text-white">
            Hot
          </Badge>
        </div>

        <div className="space-y-4">
          {trendingMatches.map((match) => (
            <div key={match.id} className="p-3 sm:p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-2">
                <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                  <div className="font-bold text-white text-sm sm:text-base">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                      <span className="truncate">{match.homeTeam}</span>
                      <span className="text-gray-300 text-xs sm:text-base">vs</span>
                      <span className="truncate">{match.awayTeam}</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{match.sport}</div>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end">
                  <div className="flex items-center">
                    <TrendingUp className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${
                      match.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`} />
                    <span className="text-xs sm:text-sm font-bold text-white">{match.betsCount}</span>
                  </div>
                  <div className="text-right sm:mt-1">
                    <div className="text-base sm:text-lg font-bold text-yellow-400">{match.odds}</div>
                    <div className="text-xs text-gray-400">odds</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-600">
                <div className="text-xs sm:text-sm text-gray-300 truncate">Popular: {match.popularBet}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}