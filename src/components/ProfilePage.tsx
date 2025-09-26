import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AddFundsPopup } from "./AddFundsPopup";
import { User, Wallet, Settings, History, Trophy, TrendingUp, Calendar, X, ArrowUpRight, ArrowDownRight, Edit, Lock, Mail, Trash2, Shield, Eye, EyeOff, MapPin, CreditCard, FileText } from "lucide-react";
import { format } from "date-fns";

interface ProfilePageProps {
  user?: {
    isLoggedIn: boolean;
    username?: string;
    email?: string;
    balance?: number;
    dateOfBirth?: Date;
    country?: string;
    idType?: string;
    idNumber?: string;
    addressLine1?: string;
    city?: string;
    postcode?: string;
  };
  onUpdateBalance?: (newBalance: number) => void;
}

export function ProfilePage({ user, onUpdateBalance }: ProfilePageProps) {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isWithdrawFundsOpen, setIsWithdrawFundsOpen] = useState(false);
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.username || "Player123",
    email: user?.email || "player@stackbet.io",
  });
  const [bettingHistoryFilters, setBettingHistoryFilters] = useState({
    sport: "all",
    sortBy: "date",
    sortOrder: "desc" as "asc" | "desc"
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [recoveryEmail, setRecoveryEmail] = useState(user?.email || "");
  const [statsPeriod, setStatsPeriod] = useState("1month");
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    method: "",
    accountNumber: "",
    routingNumber: "",
    paypalEmail: "",
    cryptoAddress: ""
  });
  
  const currentUser = {
    name: user?.username || "Player123",
    email: user?.email || "player@stackbet.io",
    joinDate: "January 2025",
    vipLevel: "Silver",
    balance: user?.balance || 0.00,
    totalBets: 47,
    winRate: 62.5,
    totalWinnings: 1234.56
  };

  // Get stats based on selected period
  const getStatsForPeriod = () => {
    const statsMap = {
      "1month": { totalBets: 12, winRate: 75.0, totalWinnings: 456.78 },
      "3months": { totalBets: 28, winRate: 68.5, totalWinnings: 892.45 },
      "6months": { totalBets: 35, winRate: 65.7, totalWinnings: 1098.33 },
      "1year": { totalBets: 47, winRate: 62.5, totalWinnings: 1234.56 }
    };
    return statsMap[statsPeriod as keyof typeof statsMap] || statsMap["1year"];
  };

  const currentStats = getStatsForPeriod();

  const recentBets = [
    {
      id: 1,
      match: "City Eagles vs United Wolves",
      sport: "Football",
      bet: "City Eagles Win",
      stake: 50.00,
      odds: 2.15,
      status: "Won",
      payout: 107.50,
      date: "2025-01-15"
    },
    {
      id: 2,
      match: "Thunder FC vs Lightning United",
      sport: "Football",
      bet: "Over 2.5 Goals",
      stake: 25.00,
      odds: 1.85,
      status: "Lost",
      payout: 0,
      date: "2025-01-14"
    },
    {
      id: 3,
      match: "Storm Riders vs Fire Hawks",
      sport: "Basketball",
      bet: "Storm Riders Win",
      stake: 75.00,
      odds: 1.95,
      status: "Won",
      payout: 146.25,
      date: "2025-01-13"
    },
    {
      id: 4,
      match: "Djokovic vs Nadal",
      sport: "Tennis",
      bet: "Djokovic Win",
      stake: 30.00,
      odds: 1.75,
      status: "Pending",
      payout: 0,
      date: "2025-01-15"
    },
    {
      id: 5,
      match: "FaZe vs Astralis",
      sport: "eSports",
      bet: "FaZe Win",
      stake: 40.00,
      odds: 1.65,
      status: "Won",
      payout: 66.00,
      date: "2025-01-12"
    },
    {
      id: 6,
      match: "England vs Australia",
      sport: "Cricket",
      bet: "England Win",
      stake: 60.00,
      odds: 2.20,
      status: "Lost",
      date: "2025-01-11"
    },
    {
      id: 7,
      match: "Manchester United vs Arsenal",
      sport: "Football", 
      bet: "Under 3.5 Goals",
      stake: 35.00,
      odds: 1.90,
      status: "Won",
      payout: 66.50,
      date: "2025-01-10"
    },
    {
      id: 8,
      match: "Lakers vs Warriors",
      sport: "Basketball",
      bet: "Lakers +5.5",
      stake: 80.00,
      odds: 1.85,
      status: "Lost",
      payout: 0,
      date: "2025-01-09"
    },
    {
      id: 9,
      match: "Serena Williams vs Naomi Osaka",
      sport: "Tennis",
      bet: "Serena Williams Win",
      stake: 45.00,
      odds: 2.10,
      status: "Won",
      payout: 94.50,
      date: "2025-01-08"
    },
    {
      id: 10,
      match: "Team Liquid vs NAVI",
      sport: "eSports",
      bet: "Team Liquid Win",
      stake: 20.00,
      odds: 2.50,
      status: "Lost",
      date: "2025-01-07"
    },
    {
      id: 11,
      match: "India vs Pakistan",
      sport: "Cricket",
      bet: "India Win",
      stake: 55.00,
      odds: 1.70,
      status: "Won",
      payout: 93.50,
      date: "2025-01-06"
    },
    {
      id: 12,
      match: "Chelsea vs Liverpool",
      sport: "Football",
      bet: "Draw",
      stake: 40.00,
      odds: 3.20,
      status: "Lost",
      date: "2025-01-05"
    },
    {
      id: 13,
      match: "Celtics vs Nets",
      sport: "Basketball",
      bet: "Over 210.5 Points",
      stake: 65.00,
      odds: 1.95,
      status: "Won",
      payout: 126.75,
      date: "2025-01-04"
    },
    {
      id: 14,
      match: "Rafael Nadal vs Roger Federer",
      sport: "Tennis",
      bet: "Nadal Win in Straight Sets",
      stake: 85.00,
      odds: 2.30,
      status: "Pending",
      date: "2025-01-16"
    },
    {
      id: 15,
      match: "G2 Esports vs Fnatic",
      sport: "eSports",
      bet: "G2 Esports Win",
      stake: 30.00,
      odds: 1.80,
      status: "Won",
      payout: 54.00,
      date: "2025-01-03"
    },
    {
      id: 16,
      match: "Australia vs New Zealand",
      sport: "Cricket",
      bet: "Over 300 Runs First Innings",
      stake: 50.00,
      odds: 1.65,
      status: "Lost",
      date: "2025-01-02"
    },
    {
      id: 17,
      match: "Real Madrid vs Barcelona",
      sport: "Football",
      bet: "Real Madrid Win",
      stake: 100.00,
      odds: 2.05,
      status: "Won",
      payout: 205.00,
      date: "2025-01-01"
    },
    {
      id: 18,
      match: "Phoenix Suns vs Denver Nuggets",
      sport: "Basketball",
      bet: "Phoenix Suns Win",
      stake: 70.00,
      odds: 2.15,
      status: "Lost",
      date: "2024-12-30"
    }
  ];

  // Filter and sort betting history
  const getFilteredAndSortedBets = () => {
    let filtered = recentBets;
    
    // Filter by sport
    if (bettingHistoryFilters.sport !== "all") {
      filtered = filtered.filter(bet => bet.sport.toLowerCase() === bettingHistoryFilters.sport.toLowerCase());
    }
    
    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (bettingHistoryFilters.sortBy) {
        case "stake":
          comparison = a.stake - b.stake;
          break;
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      
      return bettingHistoryFilters.sortOrder === "desc" ? -comparison : comparison;
    });
    
    return filtered;
  };

  const transactions = [
    {
      id: 1,
      type: "deposit",
      description: "Added funds via Credit Card",
      amount: 100.00,
      date: "2025-01-15 14:30",
      status: "Completed"
    },
    {
      id: 2,
      type: "deposit",
      description: "Added funds via PayPal",
      amount: 250.00,
      date: "2025-01-12 09:15",
      status: "Completed"
    },
    {
      id: 3,
      type: "withdrawal",
      description: "Withdrawal to Bank Account",
      amount: 150.00,
      date: "2025-01-10 16:45",
      status: "Completed"
    },
    {
      id: 4,
      type: "deposit",
      description: "Added funds via Debit Card",
      amount: 75.00,
      date: "2025-01-08 11:20",
      status: "Completed"
    },
    {
      id: 5,
      type: "withdrawal",
      description: "Withdrawal to PayPal",
      amount: 200.00,
      date: "2025-01-06 14:30",
      status: "Processing"
    },
    {
      id: 6,
      type: "deposit",
      description: "Added funds via Bank Transfer",
      amount: 500.00,
      date: "2025-01-04 10:00",
      status: "Completed"
    },
    {
      id: 7,
      type: "withdrawal",
      description: "Withdrawal to Cryptocurrency Wallet",
      amount: 300.00,
      date: "2025-01-02 18:15",
      status: "Completed"
    },
    {
      id: 8,
      type: "deposit",
      description: "Added funds via Apple Pay",
      amount: 125.00,
      date: "2024-12-30 13:45",
      status: "Completed"
    },
    {
      id: 9,
      type: "deposit",
      description: "Added funds via Google Pay",
      amount: 180.00,
      date: "2024-12-28 16:20",
      status: "Completed"
    },
    {
      id: 10,
      type: "withdrawal",
      description: "Withdrawal to Bank Account",
      amount: 450.00,
      date: "2024-12-26 12:10",
      status: "Completed"
    }
  ];

  const achievements = [
    { name: "First Bet", description: "Placed your first bet", earned: true },
    { name: "High Roller", description: "Placed a bet over $100", earned: false },
    { name: "Lucky Streak", description: "Won 5 bets in a row", earned: true },
    { name: "Sports Fan", description: "Bet on all 4 sports categories", earned: true },
    { name: "VIP Member", description: "Reached Silver VIP status", earned: true }
  ];

  const handleWithdrawal = () => {
    const withdrawAmount = parseFloat(withdrawalData.amount);
    
    // Validation
    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Please enter a valid withdrawal amount");
      return;
    }
    
    if (withdrawAmount > currentUser.balance) {
      alert("Insufficient funds for withdrawal");
      return;
    }
    
    if (withdrawAmount < 10) {
      alert("Minimum withdrawal amount is $10");
      return;
    }
    
    if (!withdrawalData.method) {
      alert("Please select a withdrawal method");
      return;
    }
    
    // Method-specific validation
    if (withdrawalData.method === 'bank_transfer' && (!withdrawalData.accountNumber || !withdrawalData.routingNumber)) {
      alert("Please provide account and routing numbers for bank transfer");
      return;
    }
    
    if (withdrawalData.method === 'paypal' && !withdrawalData.paypalEmail) {
      alert("Please provide PayPal email address");
      return;
    }
    
    if (withdrawalData.method === 'crypto' && !withdrawalData.cryptoAddress) {
      alert("Please provide cryptocurrency wallet address");
      return;
    }
    
    // Update balance
    if (onUpdateBalance && user?.balance) {
      onUpdateBalance(user.balance - withdrawAmount);
    }
    
    // Reset form and close modal
    setWithdrawalData({
      amount: "",
      method: "",
      accountNumber: "",
      routingNumber: "",
      paypalEmail: "",
      cryptoAddress: ""
    });
    setIsWithdrawFundsOpen(false);
    
    alert(`Withdrawal request submitted successfully! ${withdrawAmount.toFixed(2)} will be processed within 1-3 business days.`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-green-600" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{currentUser.name}</h1>
              <p className="text-green-100 mb-2">{currentUser.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-yellow-400 text-black">
                  {currentUser.vipLevel} VIP
                </Badge>
                <Badge variant="outline" className="border-white text-white">
                  Member since {currentUser.joinDate}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Account Balance */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-400" />
                  Account Balance
                </h3>
                <Button 
                  size="sm" 
                  onClick={() => setIsAddFundsOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  Add Funds
                </Button>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${currentUser.balance.toFixed(2)}
              </div>
              <p className="text-gray-400 text-sm mb-4">Available for betting</p>
              
              <div className="space-y-2">
                <Button 
                  size="sm"
                  onClick={() => setIsWithdrawFundsOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Withdraw Funds
                </Button>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setIsTransactionHistoryOpen(true)}
                  className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 font-bold"
                >
                  <History className="w-4 h-4 mr-2" />
                  View Transaction History
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Betting Stats
                </h3>
                <Select value={statsPeriod} onValueChange={setStatsPeriod}>
                  <SelectTrigger className="w-[130px] bg-gray-700 border-gray-600 text-white text-sm focus:border-green-500 focus:ring-green-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    <SelectItem value="1month" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">Last Month</SelectItem>
                    <SelectItem value="3months" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">Last 3 Months</SelectItem>
                    <SelectItem value="6months" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">Last 6 Months</SelectItem>
                    <SelectItem value="1year" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Bets:</span>
                  <span className="text-white font-bold">{currentStats.totalBets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate:</span>
                  <span className="text-green-400 font-bold">{currentStats.winRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Winnings:</span>
                  <span className="text-yellow-400 font-bold">${currentStats.totalWinnings}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => setEditProfileOpen(true)}
                  className="w-full justify-start bg-white text-black hover:bg-gray-100 font-bold"
                >
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setAccountSettingsOpen(true)}
                  className="w-full justify-start bg-white text-black hover:bg-gray-100 font-bold"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-white text-black hover:bg-gray-100 font-bold">
                  <History className="w-4 h-4 mr-2" />
                  Download History
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Personal Details Section */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6 text-orange-400" />
                Personal Details
              </h3>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setPersonalDetailsOpen(true)}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date of Birth */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 text-sm">Date of Birth</span>
                </div>
                <p className="text-white font-medium">
                  {user?.dateOfBirth ? format(user.dateOfBirth, "dd/MM/yyyy") : "25/05/1995"}
                </p>
              </div>

              {/* Country */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span className="text-gray-400 text-sm">Country</span>
                </div>
                <p className="text-white font-medium">
                  {user?.country ? 
                    (user.country === 'us' ? 'United States' :
                     user.country === 'uk' ? 'United Kingdom' :
                     user.country === 'ca' ? 'Canada' :
                     user.country === 'au' ? 'Australia' :
                     user.country === 'de' ? 'Germany' :
                     user.country === 'fr' ? 'France' : user.country) 
                    : "United Kingdom"}
                </p>
              </div>

              {/* ID Information (Partially Visible) */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400 text-sm">ID Document</span>
                </div>
                <p className="text-white font-medium">
                  {user?.idType ? 
                    (user.idType === 'passport' ? 'Passport' :
                     user.idType === 'drivers_license' ? 'Driver\'s License' :
                     user.idType === 'national_id' ? 'National ID' : user.idType)
                    : "Passport"}
                </p>
                <p className="text-gray-400 text-sm font-mono">
                  {user?.idNumber ? 
                    `***${user.idNumber.slice(-4)}` : 
                    "***4567"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Full Width Recent Betting History */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="w-6 h-6 text-purple-400" />
                Recent Betting History
              </h3>
              
              {/* Filters and Sorting */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Select 
                  value={bettingHistoryFilters.sport} 
                  onValueChange={(value) => setBettingHistoryFilters(prev => ({ ...prev, sport: value }))}
                >
                  <SelectTrigger className="w-[140px] bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Sports" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="all" className="text-white hover:bg-gray-600 focus:bg-gray-600">All Sports</SelectItem>
                    <SelectItem value="football" className="text-white hover:bg-gray-600 focus:bg-gray-600">Football</SelectItem>
                    <SelectItem value="basketball" className="text-white hover:bg-gray-600 focus:bg-gray-600">Basketball</SelectItem>
                    <SelectItem value="tennis" className="text-white hover:bg-gray-600 focus:bg-gray-600">Tennis</SelectItem>
                    <SelectItem value="cricket" className="text-white hover:bg-gray-600 focus:bg-gray-600">Cricket</SelectItem>
                    <SelectItem value="esports" className="text-white hover:bg-gray-600 focus:bg-gray-600">eSports</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={bettingHistoryFilters.sortBy} 
                  onValueChange={(value) => setBettingHistoryFilters(prev => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger className="w-[120px] bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="date" className="text-white hover:bg-gray-600 focus:bg-gray-600">Date</SelectItem>
                    <SelectItem value="stake" className="text-white hover:bg-gray-600 focus:bg-gray-600">Stake</SelectItem>
                    <SelectItem value="status" className="text-white hover:bg-gray-600 focus:bg-gray-600">Status</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBettingHistoryFilters(prev => ({ 
                    ...prev, 
                    sortOrder: prev.sortOrder === "asc" ? "desc" : "asc" 
                  }))}
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  {bettingHistoryFilters.sortOrder === "asc" ? "↑" : "↓"}
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Sport</TableHead>
                    <TableHead className="text-gray-400">Match</TableHead>
                    <TableHead className="text-gray-400">Bet</TableHead>
                    <TableHead className="text-gray-400">Stake</TableHead>
                    <TableHead className="text-gray-400">Odds</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Payout</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredAndSortedBets().map((bet) => (
                    <TableRow key={bet.id} className="border-gray-700">
                      <TableCell>
                        <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                          {bet.sport}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {bet.match}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {bet.bet}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        ${bet.stake.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {bet.odds.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            bet.status === 'Won' ? 'default' : 
                            bet.status === 'Lost' ? 'destructive' : 
                            'secondary'
                          }
                          className={
                            bet.status === 'Won' ? 'bg-green-600' :
                            bet.status === 'Lost' ? 'bg-red-600' :
                            'bg-yellow-600'
                          }
                        >
                          {bet.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={
                        bet.status === 'Won' ? 'text-green-400 font-bold' :
                        bet.status === 'Lost' ? 'text-red-400' :
                        'text-gray-400'
                      }>
                        {bet.payout > 0 ? `$${bet.payout.toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {bet.date}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {getFilteredAndSortedBets().length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No betting history found for the selected filters.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Achievements
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-yellow-600/10 border-yellow-600' 
                      : 'bg-gray-700 border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      🏆
                    </div>
                    <div>
                      <h4 className={`font-bold ${
                        achievement.earned ? 'text-yellow-400' : 'text-gray-400'
                      }`}>
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <AddFundsPopup
        isOpen={isAddFundsOpen}
        onClose={() => setIsAddFundsOpen(false)}
        onAddFunds={(amount) => {
          if (onUpdateBalance && user?.balance) {
            onUpdateBalance(user.balance + amount);
          }
        }}
      />

      {/* Withdraw Funds Modal */}
      <Dialog open={isWithdrawFundsOpen} onOpenChange={setIsWithdrawFundsOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-md" aria-describedby="withdraw-funds-description">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-blue-400" />
              Withdraw Funds
            </DialogTitle>
            <DialogDescription className="text-gray-400" id="withdraw-funds-description">
              Withdraw funds from your betting account. Withdrawals are processed within 1-3 business days.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Current Balance */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Available Balance:</span>
                <span className="text-green-400 font-bold text-lg">
                  ${currentUser.balance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Withdrawal Amount */}
            <div>
              <Label className="text-white mb-2 block">Withdrawal Amount *</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={withdrawalData.amount}
                  onChange={(e) => setWithdrawalData(prev => ({ ...prev, amount: e.target.value }))}
                  className="pl-8 bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  min="10"
                  step="0.01"
                  max={currentUser.balance}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Minimum withdrawal: $10.00</p>
            </div>

            {/* Withdrawal Method */}
            <div>
              <Label className="text-white mb-2 block">Withdrawal Method *</Label>
              <Select 
                value={withdrawalData.method} 
                onValueChange={(value) => setWithdrawalData(prev => ({ ...prev, method: value }))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Choose withdrawal method" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  <SelectItem value="bank_transfer" className="text-white hover:bg-gray-600 focus:bg-gray-600">
                    Bank Transfer (1-3 days)
                  </SelectItem>
                  <SelectItem value="paypal" className="text-white hover:bg-gray-600 focus:bg-gray-600">
                    PayPal (24-48 hours)
                  </SelectItem>
                  <SelectItem value="crypto" className="text-white hover:bg-gray-600 focus:bg-gray-600">
                    Cryptocurrency (1-24 hours)
                  </SelectItem>
                  <SelectItem value="check" className="text-white hover:bg-gray-600 focus:bg-gray-600">
                    Paper Check (5-10 days)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Method-specific fields */}
            {withdrawalData.method === 'bank_transfer' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Account Number *</Label>
                  <Input
                    placeholder="Enter account number"
                    value={withdrawalData.accountNumber}
                    onChange={(e) => setWithdrawalData(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Routing Number *</Label>
                  <Input
                    placeholder="Enter routing number"
                    value={withdrawalData.routingNumber}
                    onChange={(e) => setWithdrawalData(prev => ({ ...prev, routingNumber: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {withdrawalData.method === 'paypal' && (
              <div>
                <Label className="text-white mb-2 block">PayPal Email Address *</Label>
                <Input
                  type="email"
                  placeholder="Enter PayPal email"
                  value={withdrawalData.paypalEmail}
                  onChange={(e) => setWithdrawalData(prev => ({ ...prev, paypalEmail: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                />
              </div>
            )}

            {withdrawalData.method === 'crypto' && (
              <div>
                <Label className="text-white mb-2 block">Cryptocurrency Wallet Address *</Label>
                <Input
                  placeholder="Enter wallet address"
                  value={withdrawalData.cryptoAddress}
                  onChange={(e) => setWithdrawalData(prev => ({ ...prev, cryptoAddress: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Supports BTC, ETH, USDT</p>
              </div>
            )}

            {withdrawalData.method === 'check' && (
              <div className="bg-yellow-600/10 border border-yellow-600 p-3 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  Paper checks will be sent to your registered address. Processing time: 5-10 business days.
                </p>
              </div>
            )}

            {/* Processing Info */}
            {withdrawalData.method && (
              <div className="bg-blue-600/10 border border-blue-600 p-3 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">Processing Information:</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Withdrawals are processed once per business day</li>
                  <li>• Processing fees may apply depending on method</li>
                  <li>• You'll receive an email confirmation when processed</li>
                  <li>• Minimum withdrawal: $10.00</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleWithdrawal}
                disabled={!withdrawalData.amount || !withdrawalData.method}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white"
              >
                Submit Withdrawal Request
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsWithdrawFundsOpen(false);
                  setWithdrawalData({
                    amount: "",
                    method: "",
                    accountNumber: "",
                    routingNumber: "",
                    paypalEmail: "",
                    cryptoAddress: ""
                  });
                }}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={isTransactionHistoryOpen} onOpenChange={setIsTransactionHistoryOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh]" aria-describedby="transaction-history-description">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-green-400" />
              Transaction History
            </DialogTitle>
            <DialogDescription className="text-gray-400" id="transaction-history-description">
              View all your financial transactions including deposits and withdrawals.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-650 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'deposit' ? 'bg-green-600/20' :
                        transaction.type === 'withdrawal' ? 'bg-blue-600/20' :
                        'bg-red-600/20'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownRight className="w-4 h-4 text-green-400" />
                        ) : transaction.type === 'withdrawal' ? (
                          <ArrowUpRight className="w-4 h-4 text-blue-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-gray-400 text-sm">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <Badge 
                        variant={transaction.status === 'Completed' ? 'default' : 'secondary'}
                        className={transaction.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="bg-gray-800 border-gray-700" aria-describedby="edit-profile-description">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-400" />
              Edit Profile
            </DialogTitle>
            <DialogDescription className="text-gray-400" id="edit-profile-description">
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name" className="text-white">Display Name</Label>
              <Input
                id="edit-name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="Enter your display name"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-email" className="text-white">Email Address</Label>
              <Input
                id="edit-email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setEditProfileOpen(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setEditProfileOpen(false);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Settings Dialog */}
      <Dialog open={accountSettingsOpen} onOpenChange={setAccountSettingsOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl" aria-describedby="account-settings-description">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              Account Settings
            </DialogTitle>
            <DialogDescription className="text-gray-400" id="account-settings-description">
              Manage your account security and preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Change Password Section */}
            <div>
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-yellow-400" />
                Change Password
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="current-password" className="text-white">Current Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="current-password"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="new-password" className="text-white">New Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="new-password"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white pr-10"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="confirm-password"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white pr-10"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update Password
                </Button>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Recovery Email Section */}
            <div>
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-400" />
                Recovery Email
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="recovery-email" className="text-white">Recovery Email Address</Label>
                  <Input
                    id="recovery-email"
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                    placeholder="Enter recovery email"
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Update Recovery Email
                </Button>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Danger Zone */}
            <div>
              <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-400" />
                Danger Zone
              </h4>
              <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-white font-bold">Delete Account</h5>
                    <p className="text-gray-400 text-sm">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button 
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setAccountSettingsOpen(false)}
                className="flex-1 border-gray-600 text-black hover:bg-gray-700 hover:text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Personal Details Dialog */}
      <Dialog open={personalDetailsOpen} onOpenChange={setPersonalDetailsOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl" aria-describedby="personal-details-description">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-400" />
              Personal Details
            </DialogTitle>
            <DialogDescription className="text-gray-400" id="personal-details-description">
              View your complete personal information and address details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                Personal Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">Date of Birth</Label>
                  <p className="text-white font-medium mt-1">
                    {user?.dateOfBirth ? format(user.dateOfBirth, "dd/MM/yyyy") : "25/05/1995"}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Country</Label>
                  <p className="text-white font-medium mt-1">
                    {user?.country ? 
                      (user.country === 'us' ? 'United States' :
                       user.country === 'uk' ? 'United Kingdom' :
                       user.country === 'ca' ? 'Canada' :
                       user.country === 'au' ? 'Australia' :
                       user.country === 'de' ? 'Germany' :
                       user.country === 'fr' ? 'France' : user.country) 
                      : "United Kingdom"}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* ID Information */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-400" />
                ID Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400 text-sm">ID Type</Label>
                  <p className="text-white font-medium mt-1">
                    {user?.idType ? 
                      (user.idType === 'passport' ? 'Passport' :
                       user.idType === 'drivers_license' ? 'Driver\'s License' :
                       user.idType === 'national_id' ? 'National ID' : user.idType)
                      : "Passport"}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">ID Number</Label>
                  <p className="text-white font-medium font-mono mt-1">
                    {user?.idNumber || "GB1234567"}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Address Information */}
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                Address Information
              </h4>
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm">Address Line 1</Label>
                  <p className="text-white font-medium mt-1">
                    {user?.addressLine1 || "123 Main Street"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400 text-sm">City</Label>
                    <p className="text-white font-medium mt-1">
                      {user?.city || "London"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Postcode/ZIP</Label>
                    <p className="text-white font-medium mt-1">
                      {user?.postcode || "SW1A 1AA"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setPersonalDetailsOpen(false)}
                className="flex-1 border-gray-600 text-black hover:bg-gray-700 hover:text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}