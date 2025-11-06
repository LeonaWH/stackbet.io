import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { SportsPage } from "./components/SportsPage";
import { PromotionsPage } from "./components/PromotionsPage";
import { ProfilePage } from "./components/ProfilePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { SignUpPage } from "./components/SignUpPage";
import { SignInPage } from "./components/SignInPage";
import { CountrySelectionModal } from "./components/CountrySelectionModal";

import { BetSlip } from "./components/BetSlip";
import { AdBanner } from "./components/AdBanner";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { Footer } from "./components/Footer";
import { BackButton } from "./components/BackButton";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

interface Bet {
  id: string;
  team: string;
  opponent: string;
  odds: number;
  type: string;
  stake?: number;
}

interface User {
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
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);
  const [user, setUser] = useState<User>({ isLoggedIn: false });
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryVerified, setCountryVerified] = useState(false);
  const [referralCode] = useState("WELCOME" + Math.random().toString(36).substr(2, 6).toUpperCase());

  const handleAddBet = (bet: Bet) => {
    // Check if bet already exists
    const existingBet = bets.find(b => b.id === bet.id);
    if (existingBet) return;
    
    setBets(prev => [...prev, bet]);
    setIsBetSlipOpen(true);
  };

  const handleOpenBetSlip = () => {
    setIsBetSlipOpen(true);
  };

  const handleRemoveBet = (betId: string) => {
    setBets(prev => prev.filter(bet => bet.id !== betId));
  };

  const handleUpdateStake = (betId: string, stake: number) => {
    setBets(prev => prev.map(bet => 
      bet.id === betId ? { ...bet, stake } : bet
    ));
  };

  const handleClearAllBets = () => {
    setBets([]);
  };

  const handleLogin = (userData: Partial<User>) => {
    setUser({
      isLoggedIn: true,
      username: userData.username || 'Player',
      email: userData.email || '',
      balance: userData.balance || 500.00,
      dateOfBirth: userData.dateOfBirth,
      country: userData.country,
      idType: userData.idType,
      idNumber: userData.idNumber,
      addressLine1: userData.addressLine1,
      city: userData.city,
      postcode: userData.postcode
    });
  };

  const handleLogout = () => {
    setUser({ isLoggedIn: false });
    setCurrentPage('home');
    setBets([]);
    setIsBetSlipOpen(false);
  };

  const handleUpdateBalance = (newBalance: number) => {
    setUser(prev => ({ ...prev, balance: newBalance }));
  };

  const handlePlaceBets = (placedBets: Array<{
    id: string;
    team: string;
    opponent: string;
    odds: number;
    type: string;
    stake: number;
  }>, totalStake: number) => {
    // Check if user has sufficient balance
    const currentBalance = user.balance || 0;
    
    if (totalStake > currentBalance) {
      toast.error("Insufficient Balance", {
        description: `You need ${totalStake.toFixed(2)} but only have ${currentBalance.toFixed(2)}. Please add funds to your account.`,
        duration: 4000,
      });
      return;
    }
    
    if (totalStake <= 0) {
      toast.error("Invalid Bet Amount", {
        description: "Please enter a valid stake amount for your bets.",
        duration: 3000,
      });
      return;
    }
    
    // Update user balance
    const newBalance = currentBalance - totalStake;
    setUser(prev => ({ ...prev, balance: newBalance }));
    
    // Clear the bet slip
    setBets([]);
    setIsBetSlipOpen(false);
    
    // Show success toast
    const betCount = placedBets.length;
    const potentialWin = placedBets.reduce((sum, bet) => sum + (bet.stake * bet.odds), 0);
    
    toast.success(
  `Bet${betCount > 1 ? 's' : ''} Placed Successfully! 🎯`,
  {
    description: (
      <span className="text-black font-medium">
        A bet of {totalStake.toFixed(2)} has been placed for {betCount} selection
        {betCount > 1 ? 's' : ''}. Potential return: {potentialWin.toFixed(2)}
      </span>
    ),
    duration: 5000,
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
    }
  }
);
  };

  const renderCurrentPage = () => {
    // Redirect to sign in if trying to access protected pages while not logged in
    if (!user.isLoggedIn && ['profile'].includes(currentPage)) {
      setCurrentPage('signin');
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} isLoggedIn={user.isLoggedIn} referralCode={referralCode} />;
      case 'sports':
        return <SportsPage onAddBet={handleAddBet} onOpenBetSlip={handleOpenBetSlip} isLoggedIn={user.isLoggedIn} onPageChange={setCurrentPage} />;
      case 'promotions':
        return <PromotionsPage user={user} referralCode={referralCode} />;
      case 'profile':
        return user.isLoggedIn ? <ProfilePage user={user} onUpdateBalance={handleUpdateBalance} /> : <SignInPage onPageChange={setCurrentPage} onLogin={handleLogin} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'signup':
        return <SignUpPage onPageChange={setCurrentPage} onLogin={handleLogin} />;
      case 'signin':
        return <SignInPage onPageChange={setCurrentPage} onLogin={handleLogin} />;

      default:
        return <HomePage onPageChange={setCurrentPage} isLoggedIn={user.isLoggedIn} />;
    }
  };

  const handleCountrySelection = (country: string, isAllowed: boolean) => {
    if (isAllowed) {
      setCountryVerified(true);
      setShowCountryModal(false);
      setCurrentPage('home');
    } else {
      // Keep modal open for restricted countries
      // The error state is handled within the modal
    }
  };

  const handleCountryModalClose = () => {
    // Only allow closing if country is verified (when an allowed country is selected)
    if (countryVerified) {
      setShowCountryModal(false);
    }
    // If country is not verified, the modal will stay open and show error
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onToggleSidebar={() => setIsBetSlipOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      
      <MarqueeBanner />
      
      <BackButton onPageChange={setCurrentPage} currentPage={currentPage} />
      
      <main>
        {renderCurrentPage()}
      </main>

      <Footer onPageChange={setCurrentPage} />

      {/* Footer Ad Banner */}
      <section className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner size="footer" />
        </div>
      </section>

      <BetSlip
        isOpen={isBetSlipOpen}
        onClose={() => setIsBetSlipOpen(false)}
        bets={bets}
        onRemoveBet={handleRemoveBet}
        onUpdateStake={handleUpdateStake}
        onClearAll={handleClearAllBets}
        onPlaceBets={handlePlaceBets}
        userBalance={user.balance}
      />

      <CountrySelectionModal
        isOpen={showCountryModal}
        onClose={handleCountryModalClose}
        onCountrySelect={handleCountrySelection}
      />

      <Toaster />
    </div>
  );
}