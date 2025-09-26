import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink } from "lucide-react";

interface AdBannerProps {
  size: "large" | "medium" | "small" | "footer" | "sidebar";
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export function AdBanner({ size, title, description, imageUrl, link }: AdBannerProps) {
  const sizeClasses = {
    large: "h-32 md:h-40",
    medium: "h-64 w-80",
    small: "h-64 w-72",
    footer: "h-24",
    sidebar: "h-32"
  };

  // Create a diverse set of images based on content keywords
  const getImageForContent = (title: string, description: string) => {
    const content = `${title} ${description}`.toLowerCase();
    
    if (content.includes('casino') || content.includes('slots')) {
      return "https://images.unsplash.com/photo-1583272948447-5bbb5d5b9579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjBzbG90cyUyMG1hY2hpbmV8ZW58MXx8fHwxNzU3NTA4MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    }
    if (content.includes('vip') || content.includes('luxury') || content.includes('exclusive')) {
      return "https://images.unsplash.com/photo-1609189123897-42db027571c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXAlMjBsdXh1cnklMjBleHBlcmllbmNlfGVufDF8fHx8MTc1NzUyNzA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    }
    if (content.includes('streaming') || content.includes('live') || content.includes('watch')) {
      return "https://images.unsplash.com/photo-1615986200762-a1ed9610d3b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwc3BvcnRzJTIwc3RyZWFtaW5nfGVufDF8fHx8MTc1NzYwMjM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    }
    if (content.includes('mobile') || content.includes('app')) {
      return "https://images.unsplash.com/photo-1744974086616-8cd4368609ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiZXR0aW5nJTIwYXBwfGVufDF8fHx8MTc1NzYwMjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    }
    if (content.includes('poker') || content.includes('tournament') || content.includes('cards')) {
      return "https://images.unsplash.com/photo-1726004592905-dc5cd794bda6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlciUyMHRvdXJuYW1lbnQlMjBjYXJkc3xlbnwxfHx8fDE3NTc2MDIzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    }
    if (content.includes('analytics') || content.includes('data') || content.includes('stats')) {
      return "https://images.unsplash.com/photo-1612151387614-0d29a04ff5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhbmFseXRpY3MlMjBkYXRhfGVufDF8fHx8MTc1NzYwMjM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    }
    
    // Default fallback images based on size
    const fallbacks = [
      "https://images.unsplash.com/photo-1704213897535-500313098396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjBnYW1ibGluZyUyMGFkdmVydGlzZW1lbnR8ZW58MXx8fHwxNzU3NTk4MTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1700872553220-6aac5870c2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlciUyMGNhcmRzJTIwbW9uZXl8ZW58MXx8fHwxNzU3NTk4MTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1583272948447-5bbb5d5b9579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjBzbG90cyUyMG1hY2hpbmV8ZW58MXx8fHwxNzU3NTA4MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ];
    
    // Use a simple hash to get consistent but different images
    const hash = title.length + description.length + (title.charCodeAt(0) || 0);
    return fallbacks[hash % fallbacks.length];
  };

  const defaultAds = {
    large: {
      title: "Win Big with Premium Betting",
      description: "Join thousands of winners on the #1 sports betting platform"
    },
    medium: {
      title: "Poker Championship",
      description: "Live tournaments daily. Big prizes await!"
    },
    small: {
      title: "Casino Games",
      description: "Play slots, blackjack & more"
    },
    sidebar: {
      title: "Live Casino",
      description: "Play live dealer games now!"
    },
    footer: {
      title: "Responsible Gaming - Play Smart, Bet Responsibly",
      description: "18+ only. Gambling can be addictive. Please play responsibly."
    }
  };

  // Fallback to 'medium' if size is not found
  const sizeConfig = defaultAds[size] || defaultAds.medium;
  
  const adData = {
    title: title || sizeConfig.title,
    description: description || sizeConfig.description,
    imageUrl: imageUrl || (size !== 'footer' ? getImageForContent(title || sizeConfig.title, description || sizeConfig.description) : undefined)
  };

  if (size === "footer") {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white text-sm">{adData.title}</h4>
            <p className="text-gray-400 text-xs">{adData.description}</p>
          </div>
          <div className="text-xs text-gray-500">Advertisement</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-800 border border-gray-600 rounded-lg overflow-hidden cursor-pointer hover:border-green-500 transition-colors ${sizeClasses[size] || sizeClasses.medium}`}>
      {adData.imageUrl && (
        <ImageWithFallback
          src={adData.imageUrl}
          alt="Advertisement"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="text-white">
          <h3 className={`font-bold mb-1 ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-base'}`}>
            {adData.title}
          </h3>
          <p className={`text-gray-200 ${size === 'large' ? 'text-base' : 'text-sm'}`}>
            {adData.description}
          </p>
          <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        Ad
      </div>
    </div>
  );
}