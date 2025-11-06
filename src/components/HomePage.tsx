import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AdBanner } from "./AdBanner";
import { Leaderboard, TrendingBets } from "./Leaderboard";
import { ReferralPopup } from "./ReferralPopup";
import { TrendingUp, Shield, Clock, Users, Gift } from "lucide-react";
import { useState } from "react";

interface HomePageProps {
  onPageChange: (page: string) => void;
  isLoggedIn?: boolean;
  referralCode: string;
}

export function HomePage({ onPageChange, isLoggedIn, referralCode }: HomePageProps) {
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  
  const featuredSports = [
    { 
      name: "Football", 
      matches: 24, 
      icon: "⚽", 
      description: "UEFA Champions League, Premier League",
      color: "from-green-600 to-green-700",
      borderColor: "border-green-500"
    },
    { 
      name: "Basketball", 
      matches: 18, 
      icon: "🏀", 
      description: "NBA Playoffs, EuroLeague",
      color: "from-orange-600 to-orange-700",
      borderColor: "border-orange-500"
    },
    { 
      name: "Tennis", 
      matches: 12, 
      icon: "🎾", 
      description: "French Open, Wimbledon",
      color: "from-yellow-600 to-yellow-700",
      borderColor: "border-yellow-500"
    },
    { 
      name: "eSports", 
      matches: 16, 
      icon: "🎮", 
      description: "CS:GO, Dota 2, League of Legends",
      color: "from-blue-600 to-blue-700",
      borderColor: "border-blue-500"
    },
    { 
      name: "Cricket", 
      matches: 8, 
      icon: "🏏", 
      description: "World Cup, The Ashes",
      color: "from-teal-600 to-teal-700",
      borderColor: "border-teal-500"
    }
  ];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Best Odds",
      description: "Competitive odds across all major sports"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Secure Platform",
      description: "Licensed and regulated for your protection"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-400" />,
      title: "Live Betting",
      description: "Bet on games as they happen in real-time"
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: "Expert Support",
      description: "24/7 customer service and betting assistance"
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1631746410377-b0e23f61d083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwY3Jvd2R8ZW58MXx8fHwxNzU3NTg1NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sports stadium crowd"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">The Ultimate</span><br />
              <span className="text-green-400">Sports Betting</span><br />
              <span className="text-yellow-400">Experience</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">
              Join thousands of sports fans and bet on your favorite teams with the best odds, 
              live betting, and secure transactions. The ultimate sports betting experience awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => onPageChange(isLoggedIn ? 'sports' : 'signup')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold"
              >
                {isLoggedIn ? 'Explore Bets' : 'Get Started'}
              </Button>
              <Button
                size="lg"
                onClick={() => onPageChange('promotions')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg font-bold shadow-lg border-2 border-yellow-300"
              >
                View Promotions
              </Button>
            </div>
            <p className="text-sm text-gray-200 mt-4">
              🔒 Licensed and regulated platform
            </p>
          </div>
        </div>
      </section>

      {/* Large Hero Ad Banner */}
      <section className="py-8 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner 
            size="large" 
            title="Exclusive VIP Betting Experience"
            description="Unlock premium features, higher limits, and exclusive bonuses"
          />
        </div>
      </section>

      {/* Featured Sports */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Sports & Entertainment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredSports.map((sport) => (
              <Card
                key={sport.name}
                onClick={() => onPageChange('sports')}
                className={`p-4 bg-gradient-to-br ${sport.color} border-2 ${sport.borderColor} hover:scale-105 cursor-pointer transition-all duration-300 text-center shadow-lg hover:shadow-xl`}
              >
                <div className="text-3xl mb-2">{sport.icon}</div>
                <h3 className="font-bold text-white mb-1 text-sm">{sport.name}</h3>
                <p className="text-white/80 text-xs mb-2">{sport.description}</p>
                <p className="text-white/90 font-bold text-xs">
                  {sport.matches} live matches
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Banner */}
      <section className="py-8 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border-2 border-yellow-300 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="mr-4">
                <Gift className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  🎉 Invite Friends, Earn 100 Credits! 🎉
                </h3>
                <p className="text-white/90 font-medium drop-shadow-sm">
                  Share your referral code and get bonus credits for every friend who joins
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsReferralOpen(true)}
              className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-3 shadow-lg border-2 border-yellow-300 transform hover:scale-105 transition-all duration-200"
            >
              ✨ Get My Code ✨
            </Button>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-8 sm:py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white">
            Community & Trending
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="w-full overflow-hidden">
              <Leaderboard />
            </div>
            <div className="w-full overflow-hidden">
              <TrendingBets />
            </div>
          </div>
        </div>
      </section>

      {/* Medium Ad Banner */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner 
            size="large" 
            title="Mobile App Available Now!"
            description="Bet on the go with our mobile app. Download for iOS and Android"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose stackbet.io?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Ads in Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdBanner 
              size="small" 
              title="VIP Program"
              description="Exclusive Benefits"
              imageUrl="https://images.unsplash.com/photo-1609189123897-42db027571c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXAlMjBsdXh1cnklMjBleHBlcmllbmNlfGVufDF8fHx8MTc1NzUyNzA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
            <AdBanner 
              size="small" 
              title="Live Streaming"
              description="Watch & Bet Live"
              imageUrl="https://images.unsplash.com/photo-1667328167888-123ade490edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwc3RyZWFtaW5nJTIwc3BvcnRzfGVufDF8fHx8MTc1NzU2NDgwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
            <AdBanner 
              size="small" 
              title="Mobile App"
              description="Bet On The Go"
              imageUrl="https://images.unsplash.com/photo-1730818874932-5b0f5211dc87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGFwcHN8ZW58MXx8fHwxNzU3NTgxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Betting?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Create your demo account and explore our platform risk-free
          </p>
          <Button
            size="lg"
            onClick={() => onPageChange(isLoggedIn ? 'sports' : 'signup')}
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
          >
            {isLoggedIn ? 'Start Betting' : 'Join Now'}
          </Button>
        </div>
      </section>

      {/* Referral Popup */}
      <ReferralPopup isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} referralCode={referralCode} />
    </div>
  );
}