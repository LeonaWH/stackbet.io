export function MarqueeBanner() {
  return (
    <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 py-2 overflow-hidden">
      <div 
        className="whitespace-nowrap"
        style={{
          animation: 'marquee 20s linear infinite'
        }}
      >
        <span className="inline-block px-4 sm:px-8 text-black font-bold text-sm sm:text-base">
          🎁 Welcome Bonus 100% (Demo) | 🔥 Weekly Free Bet | 🎉 VIP Bronze Rewards | 
          💰 Live Cash Drops | ⭐ Exclusive Member Benefits | 🏆 Tournament Series | 
          🎁 Welcome Bonus 100% (Demo) | 🔥 Weekly Free Bet | 🎉 VIP Bronze Rewards
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}