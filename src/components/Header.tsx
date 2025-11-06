import { Button } from "./ui/button";
import { Menu, User, Wallet, LogOut, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onToggleSidebar: () => void;
  user?: {
    isLoggedIn: boolean;
    username?: string;
    balance?: number;
  };
  onLogout?: () => void;
}

export function Header({ currentPage, onPageChange, onToggleSidebar, user, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'sports', label: 'Sports' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavigation = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-black text-white shadow-lg border-b border-green-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold text-green-400">
                  StackBet<span className="text-yellow-400">.io</span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`px-3 py-2 rounded-md transition-colors font-medium ${
                      currentPage === item.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-200 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {user?.isLoggedIn ? (
                <>
                  {/* Wallet Balance - Hidden on small screens */}
                  <div className="hidden lg:flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                    <Wallet className="w-4 h-4 text-green-400" />
                    <span className="text-white font-bold">${user.balance?.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  {/* Profile Button - All screens */}
                  <Button
                    size="sm"
                    onClick={() => handleNavigation('profile')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold p-2 shadow-md"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                  
                  {/* Bet Slip Button */}
                  <Button
                    size="sm"
                    onClick={onToggleSidebar}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center space-x-2 shadow-md"
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="hidden sm:inline">Bet Slip</span>
                  </Button>

                  {/* Logout Button - All screens */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLogout}
                    className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold p-2"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={3} />
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleNavigation('signin')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold shadow-md px-3 sm:px-4"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Sign In</span>
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-gray-700 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                data-testid="mobile-menu-toggle"
                id="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div id="mobile-menu" className="fixed top-16 left-0 right-0 bg-black border-b border-green-500/20 shadow-xl">
            <div className="px-4 py-2 space-y-1">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
                    currentPage === item.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-200 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Wallet Balance */}
              {user?.isLoggedIn && (
                <div className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 mt-3">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Balance:</span>
                  </div>
                  <span className="text-white font-bold">${user.balance?.toFixed(2) || '0.00'}</span>
                </div>
              )}
              
              {/* Mobile Actions */}
              {user?.isLoggedIn && (
                <div className="pt-3 border-t border-gray-700 mt-3">
                  <Button
                    variant="outline"
                    onClick={onLogout}
                    className="w-full border-red-900 text-red-400 hover:bg-red-500 hover:text-white font-bold justify-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}