import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { X, Copy, Gift, Users } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ReferralPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferralPopup({ isOpen, onClose }: ReferralPopupProps) {
  const [referralCode] = useState("SPORTS" + Math.random().toString(36).substr(2, 6).toUpperCase());

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                  onClick={copyReferralCode}
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
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-black font-bold"
            >
              Start Inviting Friends
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}