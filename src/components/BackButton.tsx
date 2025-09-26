import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export function BackButton({ onPageChange, currentPage }: BackButtonProps) {
  const getBackPage = () => {
    // Define navigation hierarchy
    switch (currentPage) {
      case 'sports':
      case 'promotions':
      case 'about':
      case 'contact':
      case 'profile':
      case 'wallet':
        return 'home';
      case 'signin':
      case 'signup':
        return 'home';
      default:
        return 'home';
    }
  };

  if (currentPage === 'home') {
    return null; // Don't show back button on home page
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Button
        variant="ghost"
        onClick={() => onPageChange(getBackPage())}
        className="text-white hover:bg-gray-800 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
    </div>
  );
}