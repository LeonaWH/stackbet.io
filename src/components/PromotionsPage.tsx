import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Gift, Clock, Star, Zap, Users, Trophy, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface User {
  isLoggedIn: boolean;
  username?: string;
  email?: string;
  balance?: number;
}

interface PromotionsPageProps {
  user?: User;
  referralCode: string;
}

export function PromotionsPage({ user, referralCode }: PromotionsPageProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isWeekendBoostModalOpen, setIsWeekendBoostModalOpen] = useState(false);
  const [isVIPRewardsModalOpen, setIsVIPRewardsModalOpen] = useState(false);
  const [isChampionshipModalOpen, setIsChampionshipModalOpen] = useState(false);
  const promotions = [
    {
      id: 1,
      title: "Welcome Bonus",
      description: "Get $25 in free bets when you sign up",
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
      title: "Invite Friends & Earn",
      description: "Get 100 bonus credits for each friend who joins",
      terms: "Share your referral code and get bonus credits",
      badge: "Referral",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      icon: <Users className="w-8 h-8" />,
      expires: "Ongoing offer"
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
                    $25 Welcome Bonus
                  </h2>
                  <p className="text-xl text-green-100 mb-6">
                    Start your betting journey with a $25 welcome bonus.
                    Sign up today and boost your first deposit!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    onClick={() => setIsReferralModalOpen(true)}
                    className="bg-white text-green-800 hover:bg-gray-100 px-8 py-4 font-bold"
                    disabled={user?.isLoggedIn}
                  >
                    {user?.isLoggedIn ? 'Active' : 'Claim Bonus'}
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
                    onClick={() => {
                      if (promo.id === 1) setIsReferralModalOpen(true);
                      else if (promo.id === 2) setIsWeekendBoostModalOpen(true);
                      else if (promo.id === 3) setIsVIPRewardsModalOpen(true);
                      else if (promo.id === 4) setIsReferralModalOpen(true);
                      else if (promo.id === 5) setIsChampionshipModalOpen(true);
                    }}
                    disabled={promo.id === 1 && user?.isLoggedIn}
                  >
                    {promo.id === 1 && user?.isLoggedIn 
                      ? 'Active' 
                      : (promo.id === 2 || promo.id === 3 || promo.id === 5)
                      ? 'Learn More'
                      : 'Get My Code'
                    }
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

      {/* Referral Code Modal */}
      <Dialog open={isReferralModalOpen} onOpenChange={setIsReferralModalOpen}>
        <DialogContent className="bg-gray-800 border-green-500 max-w-md" aria-describedby="referral-description">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex flex-col items-center">
                <Gift className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                <span className="text-2xl font-bold text-white">
                  Invite Friends & Earn!
                </span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center" id="referral-description">
              Get 100 bonus credits for each friend who joins
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center">
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Your referral code:</p>
                    <p className="text-lg font-bold text-green-400">{referralCode}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(referralCode);
                      toast.success("Referral code copied to clipboard!");
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-yellow-400">100</div>
                  <div className="text-xs text-gray-400">Credits per referral</div>
                </div>
                <div className="text-center p-3 bg-gray-700 rounded-lg">
                  <div className="text-xl font-bold text-green-400">∞</div>
                  <div className="text-xs text-gray-400">Unlimited invites</div>
                </div>
              </div>

              <div className="text-left space-y-2">
                <h3 className="font-bold text-white flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-400" />
                  How it works:
                </h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Share your unique code</li>
                  <li>• Friend signs up and makes first deposit</li>
                  <li>• You both get 100 bonus credits</li>
                  <li>• Start betting together!</li>
                </ul>
              </div>

              <Button
                onClick={() => setIsReferralModalOpen(false)}
                className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-black font-bold"
              >
                Start Inviting Friends
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Weekend Boost Terms Modal */}
      <Dialog open={isWeekendBoostModalOpen} onOpenChange={setIsWeekendBoostModalOpen}>
        <DialogContent className="bg-gray-800 border-yellow-500 max-w-md" aria-describedby="weekend-boost-description">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex flex-col items-center">
                <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                <span className="text-2xl font-bold text-white">
                  Weekend Boost
                </span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center" id="weekend-boost-description">
              50% bonus on all weekend football bets
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-yellow-400">50%</div>
                <div className="text-xs text-gray-400">Bonus Boost</div>
              </div>
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-yellow-400">$50</div>
                <div className="text-xs text-gray-400">Max Bonus</div>
              </div>
            </div>

            <div className="text-left space-y-2">
              <h3 className="font-bold text-white">Terms & Conditions:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Applies to all football bets placed on weekends (Saturday & Sunday)</li>
                <li>• Maximum bonus amount is $50 per weekend</li>
                <li>• Minimum qualifying bet is $10</li>
                <li>• Bonus is applied automatically to qualifying bets</li>
                <li>• Bonus funds must be wagered 3x before withdrawal</li>
                <li>• Only pre-match bets qualify for this promotion</li>
                <li>• Promotion available every weekend</li>
                <li>• Standard terms and conditions apply</li>
              </ul>
            </div>

            <Button
              onClick={() => setIsWeekendBoostModalOpen(false)}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold"
            >
              Got It!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIP Rewards Terms Modal */}
      <Dialog open={isVIPRewardsModalOpen} onOpenChange={setIsVIPRewardsModalOpen}>
        <DialogContent className="bg-gray-800 border-purple-500 max-w-md" aria-describedby="vip-rewards-description">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex flex-col items-center">
                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                <span className="text-2xl font-bold text-white">
                  VIP Rewards Program
                </span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center" id="vip-rewards-description">
              Earn points for every bet placed
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-yellow-400">🏆</div>
                <div className="text-xs text-gray-400">Bronze</div>
              </div>
              <div className="text-center p-2 bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-yellow-400">🥈</div>
                <div className="text-xs text-gray-400">Silver</div>
              </div>
              <div className="text-center p-2 bg-gray-700 rounded-lg">
                <div className="text-lg font-bold text-yellow-400">🥇</div>
                <div className="text-xs text-gray-400">Gold</div>
              </div>
            </div>

            <div className="text-left space-y-2">
              <h3 className="font-bold text-white">Terms & Conditions:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Earn 1 point for every $10 wagered on qualifying bets</li>
                <li>• Points accumulate towards VIP tier status</li>
                <li>• Bronze tier: $0 - $500 total bets</li>
                <li>• Silver tier: $500 - $2,000 total bets (10% bonus on points)</li>
                <li>• Gold tier: $2,000+ total bets (20% bonus on points)</li>
                <li>• Higher tiers unlock exclusive bonuses and promotions</li>
                <li>• Points expire after 12 months of inactivity</li>
                <li>• VIP status reviewed monthly</li>
                <li>• Priority customer support for Silver and Gold tiers</li>
                <li>• Standard terms and conditions apply</li>
              </ul>
            </div>

            <Button
              onClick={() => setIsVIPRewardsModalOpen(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold"
            >
              Got It!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Championship Special Terms Modal */}
      <Dialog open={isChampionshipModalOpen} onOpenChange={setIsChampionshipModalOpen}>
        <DialogContent className="bg-gray-800 border-red-500 max-w-md" aria-describedby="championship-description">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex flex-col items-center">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                <span className="text-2xl font-bold text-white">
                  Championship Special
                </span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center" id="championship-description">
              Enhanced odds on championship finals
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-red-400">Enhanced</div>
                <div className="text-xs text-gray-400">Odds Boost</div>
              </div>
              <div className="text-center p-3 bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-red-400">Finals</div>
                <div className="text-xs text-gray-400">Only</div>
              </div>
            </div>

            <div className="text-left space-y-2">
              <h3 className="font-bold text-white">Terms & Conditions:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Enhanced odds available on selected championship matches</li>
                <li>• Applies to finals and semi-finals of major tournaments</li>
                <li>• Odds boost varies by event (typically 10-30%)</li>
                <li>• Maximum bet limit of $500 per enhanced odds bet</li>
                <li>• Enhanced odds available on first bet only per match</li>
                <li>• Available for pre-match bets only (no live betting)</li>
                <li>• Must be opted-in to receive enhanced odds notifications</li>
                <li>• Winnings paid as bonus funds with 1x wagering requirement</li>
                <li>• Cannot be combined with other promotions</li>
                <li>• Standard terms and conditions apply</li>
              </ul>
            </div>

            <Button
              onClick={() => setIsChampionshipModalOpen(false)}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold"
            >
              Got It!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
