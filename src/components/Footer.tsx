import { Button } from "./ui/button";

interface FooterProps {
  onPageChange: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  const footerLinks = {
    sports: [
      { label: "Football", onClick: () => onPageChange('sports') },
      { label: "Basketball", onClick: () => onPageChange('sports') },
      { label: "Tennis", onClick: () => onPageChange('sports') },
      { label: "Cricket", onClick: () => onPageChange('sports') },
    ],
    casino: [
      { label: "Live Casino", onClick: () => onPageChange('sports') },
      { label: "Slots", onClick: () => onPageChange('sports') },
      { label: "Blackjack", onClick: () => onPageChange('sports') },
      { label: "Roulette", onClick: () => onPageChange('sports') },
    ],
    esports: [
      { label: "CS:GO", onClick: () => onPageChange('sports') },
      { label: "Dota 2", onClick: () => onPageChange('sports') },
      { label: "League of Legends", onClick: () => onPageChange('sports') },
      { label: "Valorant", onClick: () => onPageChange('sports') },
    ],
    company: [
      { label: "About Us", onClick: () => onPageChange('about') },
      { label: "Contact", onClick: () => onPageChange('contact') },
      { label: "Promotions", onClick: () => onPageChange('promotions') },
      { label: "Support", onClick: () => onPageChange('contact') },
    ],
    legal: [
      { label: "Terms & Conditions", onClick: () => {} },
      { label: "Privacy Policy", onClick: () => {} },
      { label: "Responsible Gaming", onClick: () => {} },
      { label: "Cookie Policy", onClick: () => {} },
    ],
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo and description */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              StackBet<span className="text-yellow-400">.io</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              The ultimate sports betting experience with competitive odds, live betting, casino games, and esports action.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white">📱</button>
              <button className="text-gray-400 hover:text-white">📧</button>
              <button className="text-gray-400 hover:text-white">💬</button>
            </div>
          </div>

          {/* Sports */}
          <div className="col-span-1">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              ⚽ Sports
            </h4>
            <ul className="space-y-2">
              {footerLinks.sports.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Casino */}
          <div className="col-span-1">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              ⭐ Casino
            </h4>
            <ul className="space-y-2">
              {footerLinks.casino.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Esports */}
          <div className="col-span-1">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              🎮 Esports
            </h4>
            <ul className="space-y-2">
              {footerLinks.esports.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal section moved to its own row */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <h4 className="font-bold text-white mb-3 text-sm">Legal & Security</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.onClick}
                      className="text-gray-400 hover:text-white text-xs transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">💳 Visa</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">💳 Mastercard</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">🍎 Apple Pay</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">🏦 Bank Transfer</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm">Game Providers</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Evolution Gaming</div>
                <div>NetEnt</div>
                <div>Pragmatic Play</div>
                <div>Microgaming</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm">Support</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>📞 24/7 Live Chat</div>
                <div>📧 support@stackbet.io</div>
                <div>🌍 Multi-Language</div>
                <div>📱 Mobile App</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 stackbet.io. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">🔒 SSL Secured</span>
              <span className="text-gray-400 text-sm">🎯 Licensed</span>
              <span className="text-gray-400 text-sm">🛡️ Protected</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              18+ only. Gambling can be addictive. Please play responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}