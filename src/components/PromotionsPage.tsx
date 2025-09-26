import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Gift, Clock, Star, Zap, Users, Trophy } from "lucide-react";

export function PromotionsPage() {
  const promotions = [
    {
      id: 1,
      title: "Welcome Bonus",
      description: "Get $100 in free bets when you sign up",
      terms: "Min deposit $20. Wagering requirements apply.",
      badge: "New Users",
      color: "bg-gradient-to-r from-green-600 to-green-700",
      icon: <Gift className="w-8 h-8" />,
      expires: "No expiry"
    },
    {
      id: 2,
      title: "Weekend Boost",
      description: "50% bonus on all weekend football bets",
      terms: "Applied to qualifying bets - Max bonus $50",
      badge: "Weekend Only",
      color: "bg-gradient-to-r from-yellow-600 to-yellow-700",
      icon: <Zap className="w-8 h-8" />,
      expires: "Every weekend"
    },
    {
      id: 3,
      title: "VIP Rewards Program",
      description: "Earn points for every bet placed",
      terms: "VIP program - Collect rewards and exclusive bonuses",
      badge: "VIP",
      color: "bg-gradient-to-r from-purple-600 to-purple-700",
      icon: <Star className="w-8 h-8" />,
      expires: "Ongoing program"
    },
    {
      id: 4,
      title: "Refer a Friend",
      description: "Both get $25 bonus when friend joins",
      terms: "Referral system - Both accounts must be verified",
      badge: "Referral",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      icon: <Users className="w-8 h-8" />,
      expires: "Limited time offer"
    },
    {
      id: 5,
      title: "Championship Special",
      description: "Enhanced odds on championship finals",
      terms: "Enhanced odds on selected championship matches",
      badge: "Special Event",
      color: "bg-gradient-to-r from-red-600 to-red-700",
      icon: <Trophy className="w-8 h-8" />,
      expires: "During championships"
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-yellow-600/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Exclusive</span>
              <span className="text-yellow-400"> Promotions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Boost your betting experience with our exclusive offers and bonuses
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-600 text-black px-4 py-2 rounded-full font-bold">
              <Gift className="w-5 h-5" />
              Licensed & Regulated Platform
            </div>
          </div>
        </div>
      </section>

      {/* Featured Promotion */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <Badge className="bg-yellow-400 text-black mb-4">
                    🔥 Featured Offer
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    $100 Welcome Bonus
                  </h2>
                  <p className="text-xl text-green-100 mb-6">
                    Start your betting journey with a $100 welcome bonus. 
                    Sign up today and boost your first deposit!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg"
                      className="bg-white text-green-800 hover:bg-gray-100 px-8 py-4 font-bold"
                    >
                      Claim Bonus
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white text-green-800 hover:bg-white hover:text-green-600 px-8 py-4 font-bold"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="text-8xl">🎁</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* All Promotions */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            All Promotions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <Card key={promo.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:border-green-500 transition-colors">
                <div className={`${promo.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {promo.icon}
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {promo.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-gray-100">{promo.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      {promo.expires}
                    </div>
                    <p className="text-gray-300 text-sm">{promo.terms}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                    disabled={promo.id === 1} // Simulate already claimed for welcome bonus
                  >
                    {promo.id === 1 ? 'Active' : 'Claim Offer'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Program Info */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our VIP Program
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Unlock exclusive features, higher betting limits, and priority support
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-800/50 p-6 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-bold text-white mb-2">Bronze Level</h3>
              <p className="text-purple-200">Total bets: $0 - $500</p>
            </div>
            <div className="bg-purple-700/50 p-6 rounded-lg border-2 border-yellow-400">
              <div className="text-3xl mb-2">🥈</div>
              <h3 className="font-bold text-white mb-2">Silver Level</h3>
              <p className="text-purple-200">Total bets: $500 - $2,000</p>
            </div>
            <div className="bg-purple-600/50 p-6 rounded-lg">
              <div className="text-3xl mb-2">🥇</div>
              <h3 className="font-bold text-white mb-2">Gold Level</h3>
              <p className="text-purple-200">Total bets: $2,000+</p>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 font-bold"
          >
            Start VIP Journey
          </Button>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gray-700 border-gray-600">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Promotion Terms & Conditions
              </h3>
              <div className="text-gray-300 space-y-2">
                <p>• All promotions subject to terms and conditions</p>
                <p>• Minimum deposit and wagering requirements apply</p>
                <p>• Bonus funds must be wagered before withdrawal</p>
                <p>• Promotional offers may be withdrawn at any time</p>
                <p>• Licensed and regulated gaming platform</p>
                <p>• Must be 18+ to participate in promotions</p>
                <p>• Please gamble responsibly</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}