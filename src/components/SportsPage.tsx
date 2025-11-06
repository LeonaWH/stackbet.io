import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AdBanner } from "./AdBanner";
import { BetSelectionModal } from "./BetSelectionModal";
import { Calendar, Clock, Plus, TrendingUp, Users, Zap, Play, Trophy, Target } from "lucide-react";



interface SportsPageProps {
  onAddBet: (bet: {
    id: string;
    team: string;
    opponent: string;
    odds: number;
    type: string;
  }) => void;
  onOpenBetSlip: () => void;
  isLoggedIn?: boolean;
  onPageChange?: (page: string) => void;
}

export function SportsPage({ onAddBet, onOpenBetSlip, isLoggedIn, onPageChange }: SportsPageProps) {
  const [selectedSport, setSelectedSport] = useState("football");
  const [selectedEsport, setSelectedEsport] = useState("csgo");
  const [betModalOpen, setBetModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  // Featured matches for carousel
  const featuredMatches = [
    {
      id: "featured1",
      title: "UEFA Champions League Tonight",
      subtitle: "Manchester City vs Real Madrid",
      image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVRUZBJTIwQ2hhbXBpb25zJTIwTGVhZ3VlJTIwc3RhZGl1bSUyMG5pZ2h0fGVufDF8fHx8MTc1NzY3ODkzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      odds: "2.15 / 3.20 / 3.45",
      status: "Tonight 21:00"
    },
    {
      id: "featured2", 
      title: "NBA Playoffs",
      subtitle: "Lakers vs Warriors",
      image: "https://images.unsplash.com/photo-1674917470371-4797a55dd303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOQkElMjBiYXNrZXRiYWxsJTIwcGxheW9mZnMlMjBhcmVuYXxlbnwxfHx8fDE3NTc2Nzg5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      odds: "1.85 / 2.20",
      status: "Live Now"
    },
    {
      id: "featured3",
      title: "World Cup Final",
      subtitle: "Argentina vs France",
      image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVRUZBJTIwQ2hhbXBpb25zJTIwTGVhZ3VlJTIwc3RhZGl1bSUyMG5pZ2h0fGVufDF8fHx8MTc1NzY3ODkzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      odds: "2.80 / 3.10 / 2.65",
      status: "Sunday 18:00"
    }
  ];


  // Live matches for sidebar
  const liveMatches = [
    { id: "live1", teams: "Barcelona vs PSG", score: "2-1", time: "75'", sport: "⚽" },
    { id: "live2", teams: "Celtics vs Heat", score: "98-95", time: "Q4 2:45", sport: "🏀" },
    { id: "live3", teams: "Djokovic vs Nadal", score: "6-4, 3-2", time: "Set 2", sport: "🎾" },
    { id: "live4", teams: "TSM vs FaZe", score: "13-8", time: "Map 2", sport: "🎮" }
  ];

  // Promotions for sidebar
  const promotions = [
    { id: "promo1", title: "Bet £10 Get £30 Free", description: "New customers only", badge: "New" },
    { id: "promo2", title: "Weekend Odds Boost", description: "Enhanced odds on football", badge: "Hot" },
    { id: "promo3", title: "Live Casino Cashback", description: "10% cashback on losses", badge: "Popular" }
  ];

  const sportsData = {
    football: [
      {
        id: "f1",
        homeTeam: "Manchester City",
        awayTeam: "Real Madrid",
        date: "Today 21:00",
        tournament: "UEFA Champions League",
        status: "Live",
        homeOdds: 2.15,
        drawOdds: 3.20,
        awayOdds: 3.45,
        isLive: true
      },
      {
        id: "f2",
        homeTeam: "Barcelona",
        awayTeam: "PSG",
        date: "Today 21:00",
        tournament: "UEFA Champions League",
        status: "Live",
        homeOdds: 1.85,
        drawOdds: 3.50,
        awayOdds: 4.20,
        isLive: true
      },
      {
        id: "f3",
        homeTeam: "Liverpool",
        awayTeam: "Bayern Munich",
        date: "Tomorrow 20:00",
        tournament: "UEFA Champions League",
        status: "Upcoming",
        homeOdds: 2.80,
        drawOdds: 3.10,
        awayOdds: 2.65,
        isLive: false
      }
    ],
    basketball: [
      {
        id: "b1",
        homeTeam: "Los Angeles Lakers",
        awayTeam: "Golden State Warriors",
        date: "Today 19:00",
        tournament: "NBA Playoffs",
        status: "Live",
        homeOdds: 1.95,
        drawOdds: null,
        awayOdds: 1.85,
        isLive: true
      },
      {
        id: "b2",
        homeTeam: "Boston Celtics",
        awayTeam: "Miami Heat",
        date: "Tomorrow 21:00",
        tournament: "NBA Playoffs",
        status: "Upcoming",
        homeOdds: 2.10,
        drawOdds: null,
        awayOdds: 1.75,
        isLive: false
      }
    ],
    tennis: [
      {
        id: "t1",
        homeTeam: "Novak Djokovic",
        awayTeam: "Rafael Nadal",
        date: "Today 16:00",
        tournament: "French Open",
        status: "Live",
        homeOdds: 1.60,
        drawOdds: null,
        awayOdds: 2.40,
        isLive: true
      },
      {
        id: "t2",
        homeTeam: "Carlos Alcaraz",
        awayTeam: "Jannik Sinner",
        date: "Tomorrow 14:00",
        tournament: "French Open",
        status: "Upcoming",
        homeOdds: 1.90,
        drawOdds: null,
        awayOdds: 1.90,
        isLive: false
      }
    ],
    cricket: [
      {
        id: "c1",
        homeTeam: "England",
        awayTeam: "Australia",
        date: "Today 10:00",
        tournament: "The Ashes",
        status: "Live",
        homeOdds: 2.20,
        drawOdds: 3.80,
        awayOdds: 3.10,
        isLive: true
      },
      {
        id: "c2",
        homeTeam: "India",
        awayTeam: "Pakistan",
        date: "Tomorrow 09:00",
        tournament: "World Cup",
        status: "Upcoming",
        homeOdds: 1.75,
        drawOdds: 4.50,
        awayOdds: 4.80,
        isLive: false
      }
    ]
  };

  const esportsData = {
    csgo: [
      {
        id: "cs1",
        homeTeam: "FaZe Clan",
        awayTeam: "Astralis",
        date: "Today 18:00",
        tournament: "ESL Pro League",
        status: "Live",
        homeOdds: 1.65,
        awayOdds: 2.25,
        isLive: true
      },
      {
        id: "cs2",
        homeTeam: "NAVI",
        awayTeam: "G2 Esports",
        date: "Tomorrow 20:00",
        tournament: "IEM Katowice",
        status: "Upcoming",
        homeOdds: 1.80,
        awayOdds: 2.00,
        isLive: false
      }
    ],
    dota2: [
      {
        id: "d1",
        homeTeam: "Team Spirit",
        awayTeam: "OG",
        date: "Today 16:00",
        tournament: "The International",
        status: "Live",
        homeOdds: 1.90,
        awayOdds: 1.90,
        isLive: true
      }
    ],
    lol: [
      {
        id: "l1",
        homeTeam: "T1",
        awayTeam: "Gen.G",
        date: "Today 17:00",
        tournament: "LCK",
        status: "Live",
        homeOdds: 2.10,
        awayOdds: 1.75,
        isLive: true
      }
    ],
    valorant: [
      {
        id: "v1",
        homeTeam: "Sentinels",
        awayTeam: "OpTic Gaming",
        date: "Today 22:00",
        tournament: "VCT Masters",
        status: "Upcoming",
        homeOdds: 1.55,
        awayOdds: 2.45,
        isLive: false
      }
    ]
  };

  const handleAddBet = (matchId: string, team: string, opponent: string, odds: number, type: string) => {
    if (!isLoggedIn && onPageChange) {
      onPageChange('signin');
      return;
    }
    
    onAddBet({
      id: `${matchId}-${type}`,
      team,
      opponent,
      odds,
      type
    });
  };

  const handleBetButtonClick = (match: any) => {
    if (!isLoggedIn && onPageChange) {
      onPageChange('signin');
      return;
    }
    setSelectedMatch(match);
    setBetModalOpen(true);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {featuredMatches.map((match, index) => (
              <CarouselItem key={match.id}>
                <div className="relative h-64 sm:h-80 md:h-96">
                  <ImageWithFallback
                    src={match.image}
                    alt={match.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <div className="max-w-2xl">
                        <Badge className={`mb-2 sm:mb-4 text-xs sm:text-sm ${match.status.includes('Live') ? 'bg-red-600' : 'bg-green-600'}`}>
                          {match.status.includes('Live') && <Clock className="w-3 h-3 mr-1" />}
                          {match.status}
                        </Badge>
                        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-2">
                          {match.title}
                        </h1>
                        <h2 className="text-base sm:text-xl md:text-2xl text-green-400 mb-3 sm:mb-4">
                          {match.subtitle}
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                          <span className="text-gray-300 text-sm sm:text-base">Odds:</span>
                          <span className="text-yellow-400 font-bold text-base sm:text-lg">{match.odds}</span>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Bet Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 sm:left-4 w-8 h-8 sm:w-10 sm:h-10" />
          <CarouselNext className="right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10" />
        </Carousel>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Sportsbook Section */}
            <section className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Sportsbook</h2>
              </div>

              <Tabs value={selectedSport} onValueChange={setSelectedSport} className="w-full">
                <TabsList className="grid grid-cols-4 bg-gray-800 border border-gray-700 mb-4 sm:mb-6 min-h-[60px]">
                  <TabsTrigger 
                    value="football" 
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">⚽</span>
                    <span className="text-xs sm:text-sm">Football</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="basketball"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">🏀</span>
                    <span className="text-xs sm:text-sm">Basketball</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tennis"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">🎾</span>
                    <span className="text-xs sm:text-sm">Tennis</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cricket"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">🏏</span>
                    <span className="text-xs sm:text-sm">Cricket</span>
                  </TabsTrigger>
                </TabsList>

                {Object.entries(sportsData).map(([sport, matches]) => (
                  <TabsContent key={sport} value={sport}>
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white capitalize">
                            {sport} Matches
                          </h3>
                        </div>

                        <div>
                          {/* Desktop Table View */}
                          <div className="hidden md:block overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow className="border-gray-700">
                                  <TableHead className="text-gray-300 font-bold">Event / Teams</TableHead>
                                  <TableHead className="text-gray-300 font-bold">Tournament</TableHead>
                                  <TableHead className="text-gray-300 font-bold text-center">Home</TableHead>
                                  {sport === 'football' || sport === 'cricket' ? (
                                    <TableHead className="text-gray-300 font-bold text-center">Draw</TableHead>
                                  ) : null}
                                  <TableHead className="text-gray-300 font-bold text-center">Away</TableHead>
                                  <TableHead className="text-gray-300 font-bold text-center">Bet Now</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {matches.map((match) => (
                                  <TableRow key={match.id} className="border-gray-700 hover:bg-gray-700">
                                    <TableCell className="text-white">
                                      <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <div className="font-bold">{match.homeTeam} vs {match.awayTeam}</div>
                                          {match.isLive && (
                                            <Badge className="bg-red-600 text-white text-xs animate-pulse">
                                              🔴 LIVE
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="text-sm text-gray-400 flex items-center gap-2">
                                          <Calendar className="w-3 h-3" />
                                          {match.date}
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-gray-300">
                                      <Badge variant="outline" className="border-green-500 text-green-400">
                                        {match.tournament}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddBet(
                                          match.id,
                                          match.homeTeam,
                                          match.awayTeam,
                                          match.homeOdds,
                                          `${match.homeTeam} Win`
                                        )}
                                        className={`font-bold min-w-[80px] ${
                                          match.isLive 
                                            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                            : 'bg-gray-700 border-green-500 text-green-400 hover:bg-green-600 hover:text-black'
                                        }`}
                                      >
                                        {match.homeOdds.toFixed(2)}
                                        <Plus className="w-3 h-3 ml-1" />
                                      </Button>
                                    </TableCell>
                                    {(sport === 'football' || sport === 'cricket') && match.drawOdds && (
                                      <TableCell className="text-center">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleAddBet(
                                            match.id,
                                            "Draw",
                                            `${match.homeTeam} vs ${match.awayTeam}`,
                                            match.drawOdds,
                                            "Draw"
                                          )}
                                          className={`font-bold min-w-[80px] ${
                                            match.isLive 
                                              ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                              : 'bg-gray-700 border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-black'
                                          }`}
                                        >
                                          {match.drawOdds.toFixed(2)}
                                          <Plus className="w-3 h-3 ml-1" />
                                        </Button>
                                      </TableCell>
                                    )}
                                    <TableCell className="text-center">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddBet(
                                          match.id,
                                          match.awayTeam,
                                          match.homeTeam,
                                          match.awayOdds,
                                          `${match.awayTeam} Win`
                                        )}
                                        className={`font-bold min-w-[80px] ${
                                          match.isLive 
                                            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                            : 'bg-gray-700 border-green-500 text-green-400 hover:bg-green-600 hover:text-black'
                                        }`}
                                      >
                                        {match.awayOdds.toFixed(2)}
                                        <Plus className="w-3 h-3 ml-1" />
                                      </Button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Button 
                                        onClick={() => handleBetButtonClick(match)}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold"
                                      >
                                        <Target className="w-4 h-4 mr-1" />
                                        Bet
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          {/* Mobile Card View */}
                          <div className="md:hidden space-y-4">
                            {matches.map((match) => (
                              <Card key={match.id} className="bg-gray-700 border-gray-600">
                                <div className="p-4">
                                  {/* Match Header */}
                                  <div className="flex flex-col mb-3">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h4 className="font-bold text-white text-sm truncate">
                                            {match.homeTeam} vs {match.awayTeam}
                                          </h4>
                                          {match.isLive && (
                                            <Badge className="bg-red-600 text-white text-xs animate-pulse">
                                              🔴 LIVE
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                                          <Calendar className="w-3 h-3" />
                                          {match.date}
                                        </div>
                                      </div>
                                    </div>
                                    <Badge variant="outline" className="border-green-500 text-green-400 w-fit text-xs">
                                      {match.tournament}
                                    </Badge>
                                  </div>

                                  {/* Betting Options */}
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddBet(
                                          match.id,
                                          match.homeTeam,
                                          match.awayTeam,
                                          match.homeOdds,
                                          `${match.homeTeam} Win`
                                        )}
                                        className={`font-bold text-xs ${
                                          match.isLive 
                                            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                            : 'bg-gray-700 border-green-500 text-green-400 hover:bg-green-600 hover:text-black'
                                        }`}
                                      >
                                        <div className="flex flex-col items-center">
                                          <span className="truncate text-xs">{match.homeTeam}</span>
                                          <span className="font-bold">{match.homeOdds.toFixed(2)}</span>
                                        </div>
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddBet(
                                          match.id,
                                          match.awayTeam,
                                          match.homeTeam,
                                          match.awayOdds,
                                          `${match.awayTeam} Win`
                                        )}
                                        className={`font-bold text-xs ${
                                          match.isLive 
                                            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                            : 'bg-gray-700 border-green-500 text-green-400 hover:bg-green-600 hover:text-black'
                                        }`}
                                      >
                                        <div className="flex flex-col items-center">
                                          <span className="truncate text-xs">{match.awayTeam}</span>
                                          <span className="font-bold">{match.awayOdds.toFixed(2)}</span>
                                        </div>
                                      </Button>
                                    </div>
                                    
                                    {/* Draw option for football and cricket */}
                                    {((sport === 'football' || sport === 'cricket') && match.drawOdds) && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddBet(
                                          match.id,
                                          "Draw",
                                          `${match.homeTeam} vs ${match.awayTeam}`,
                                          match.drawOdds,
                                          "Draw"
                                        )}
                                        className={`w-full font-bold text-xs ${
                                          match.isLive 
                                            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                            : 'bg-gray-700 border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-black'
                                        }`}
                                      >
                                        <div className="flex items-center justify-center gap-1">
                                          <span>Draw</span>
                                          <span className="font-bold">{match.drawOdds.toFixed(2)}</span>
                                        </div>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* eSports Section */}
            <section className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">eSports</h2>
              </div>

              <Tabs value={selectedEsport} onValueChange={setSelectedEsport} className="w-full">
                <TabsList className="grid grid-cols-4 bg-gray-800 border border-gray-700 mb-4 sm:mb-6 min-h-[60px]">
                  <TabsTrigger 
                    value="csgo" 
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">🎮</span>
                    <span className="text-xs sm:text-sm">CS2</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dota2"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">⚔️</span>
                    <span className="text-xs sm:text-sm">Dota 2</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="lol"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">🏆</span>
                    <span className="text-xs sm:text-sm">LoL</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="valorant"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white font-bold text-xs sm:text-sm p-2 sm:p-3 flex flex-col sm:flex-row gap-0.5 sm:gap-2 items-center justify-center"
                  >
                    <span className="text-sm sm:text-base">🎯</span>
                    <span className="text-xs sm:text-sm">Valorant</span>
                  </TabsTrigger>
                </TabsList>

                {Object.entries(esportsData).map(([esport, matches]) => (
                  <TabsContent key={esport} value={esport}>
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white capitalize">
                            {esport === 'csgo' ? 'Counter-Strike 2' : 
                             esport === 'dota2' ? 'Dota 2' :
                             esport === 'lol' ? 'League of Legends' :
                             'Valorant'} Matches
                          </h3>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-gray-700">
                                <TableHead className="text-gray-300 font-bold">Event / Teams</TableHead>
                                <TableHead className="text-gray-300 font-bold">Tournament</TableHead>
                                <TableHead className="text-gray-300 font-bold text-center">Team 1</TableHead>
                                <TableHead className="text-gray-300 font-bold text-center">Team 2</TableHead>
                                <TableHead className="text-gray-300 font-bold text-center">Bet Now</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {matches.map((match) => (
                                <TableRow key={match.id} className="border-gray-700 hover:bg-gray-700">
                                  <TableCell className="text-white">
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="font-bold">{match.homeTeam} vs {match.awayTeam}</div>
                                        {match.isLive && (
                                          <Badge className="bg-red-600 text-white text-xs animate-pulse">
                                            🔴 LIVE
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-sm text-gray-400 flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        {match.date}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-gray-300">
                                    <Badge variant="outline" className="border-purple-500 text-purple-400">
                                      {match.tournament}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleAddBet(
                                        match.id,
                                        match.homeTeam,
                                        match.awayTeam,
                                        match.homeOdds,
                                        `${match.homeTeam} Win`
                                      )}
                                      className={`font-bold min-w-[80px] ${
                                        match.isLive 
                                          ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                          : 'bg-gray-700 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white'
                                      }`}
                                    >
                                      {match.homeOdds.toFixed(2)}
                                      <Plus className="w-3 h-3 ml-1" />
                                    </Button>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleAddBet(
                                        match.id,
                                        match.awayTeam,
                                        match.homeTeam,
                                        match.awayOdds,
                                        `${match.awayTeam} Win`
                                      )}
                                      className={`font-bold min-w-[80px] ${
                                        match.isLive 
                                          ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                          : 'bg-gray-700 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white'
                                      }`}
                                    >
                                      {match.awayOdds.toFixed(2)}
                                      <Plus className="w-3 h-3 ml-1" />
                                    </Button>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Button 
                                      onClick={() => handleBetButtonClick(match)}
                                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                                    >
                                      <Target className="w-4 h-4 mr-1" />
                                      Bet
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                          {matches.map((match) => (
                            <Card key={match.id} className="bg-gray-700 border-gray-600">
                              <div className="p-4">
                                {/* Match Header */}
                                <div className="flex flex-col mb-3">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-white text-sm truncate">
                                          {match.homeTeam} vs {match.awayTeam}
                                        </h4>
                                        {match.isLive && (
                                          <Badge className="bg-red-600 text-white text-xs animate-pulse">
                                            🔴 LIVE
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                                        <Calendar className="w-3 h-3" />
                                        {match.date}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="border-purple-500 text-purple-400 w-fit text-xs">
                                    {match.tournament}
                                  </Badge>
                                </div>

                                {/* Betting Options */}
                                <div className="grid grid-cols-2 gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddBet(
                                      match.id,
                                      match.homeTeam,
                                      match.awayTeam,
                                      match.homeOdds,
                                      `${match.homeTeam} Win`
                                    )}
                                    className={`font-bold text-xs ${
                                      match.isLive 
                                        ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                        : 'bg-gray-700 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white'
                                    }`}
                                  >
                                    <div className="flex flex-col items-center">
                                      <span className="truncate text-xs">{match.homeTeam}</span>
                                      <span className="font-bold">{match.homeOdds.toFixed(2)}</span>
                                    </div>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddBet(
                                      match.id,
                                      match.awayTeam,
                                      match.homeTeam,
                                      match.awayOdds,
                                      `${match.awayTeam} Win`
                                    )}
                                    className={`font-bold text-xs ${
                                      match.isLive 
                                        ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse' 
                                        : 'bg-gray-700 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white'
                                    }`}
                                  >
                                    <div className="flex flex-col items-center">
                                      <span className="truncate text-xs">{match.awayTeam}</span>
                                      <span className="font-bold">{match.awayOdds.toFixed(2)}</span>
                                    </div>
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>


            {/* Ad Banner */}
            <AdBanner size="large" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-4 sm:space-y-6">
            {/* Live Matches */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Live Now</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {liveMatches.map((match) => (
                    <div key={match.id} className="bg-gray-700 rounded-lg p-2 sm:p-3 hover:bg-gray-650 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-white flex items-center gap-1">
                          <span>{match.sport}</span>
                          <span className="truncate">{match.teams}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-400 font-bold">{match.score}</span>
                        <span className="text-xs text-gray-400">{match.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Promotions */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-bold text-white text-sm sm:text-base">Promotions</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {promotions.map((promo) => (
                    <div key={promo.id} className="bg-gray-700 rounded-lg p-2 sm:p-3 hover:bg-gray-650 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-xs font-bold text-white leading-tight">{promo.title}</h4>
                        <Badge className={`text-xs px-1 py-0.5 ${
                          promo.badge === 'New' ? 'bg-blue-600' :
                          promo.badge === 'Hot' ? 'bg-red-600' :
                          'bg-green-600'
                        }`}>
                          {promo.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">{promo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Ad Banner */}
            <AdBanner size="sidebar" />

            {/* Popular Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Users className="w-4 h-4 text-blue-400" />
                  <h3 className="font-bold text-white text-sm sm:text-base">Popular This Hour</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">⚽ Man City vs Real Madrid</span>
                    <span className="text-xs text-green-400 font-bold">2.15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">🏀 Lakers vs Warriors</span>
                    <span className="text-xs text-green-400 font-bold">1.95</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">🎾 Djokovic vs Nadal</span>
                    <span className="text-xs text-green-400 font-bold">1.60</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bet Selection Modal */}
      {selectedMatch && (
        <BetSelectionModal
          isOpen={betModalOpen}
          onClose={() => setBetModalOpen(false)}
          match={selectedMatch}
          onSelectBet={handleAddBet}
        />
      )}
    </div>
  );
}
