import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface CountrySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCountrySelect: (country: string, isAllowed: boolean) => void;
}

const COUNTRIES = [
  // Allowed countries
  { name: "United States", code: "US", allowed: true },
  { name: "United Kingdom", code: "GB", allowed: true },
  { name: "Canada", code: "CA", allowed: true },
  { name: "Australia", code: "AU", allowed: true },
  
  // Restricted countries
  { name: "Germany", code: "DE", allowed: false },
  { name: "Singapore", code: "SG", allowed: false },
  { name: "United Arab Emirates", code: "AE", allowed: false },
  { name: "France", code: "FR", allowed: false },
  { name: "India", code: "IN", allowed: false },
  
  // Additional countries (mostly allowed for demo purposes)
  { name: "Netherlands", code: "NL", allowed: true },
  { name: "Sweden", code: "SE", allowed: true },
  { name: "Norway", code: "NO", allowed: true },
  { name: "Denmark", code: "DK", allowed: true },
  { name: "Finland", code: "FI", allowed: true },
  { name: "Ireland", code: "IE", allowed: true },
  { name: "New Zealand", code: "NZ", allowed: true },
  { name: "South Africa", code: "ZA", allowed: true },
  { name: "Brazil", code: "BR", allowed: true },
  { name: "Mexico", code: "MX", allowed: true },
  { name: "Argentina", code: "AR", allowed: true },
  { name: "Chile", code: "CL", allowed: true },
  { name: "Japan", code: "JP", allowed: false },
  { name: "South Korea", code: "KR", allowed: false },
  { name: "China", code: "CN", allowed: false },
  { name: "Russia", code: "RU", allowed: false },
  { name: "Turkey", code: "TR", allowed: false },
].sort((a, b) => a.name.localeCompare(b.name));

export function CountrySelectionModal({ isOpen, onClose, onCountrySelect }: CountrySelectionModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);
  const [showCloseError, setShowCloseError] = useState(false);

  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setShowCloseError(false); // Clear close error when user selects a country
    const country = COUNTRIES.find(c => c.code === countryCode);
    
    if (country && !country.allowed) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowCloseError(false); // Clear close error when user starts searching
    // Clear selection if current selection doesn't match search
    if (selectedCountry && value) {
      const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);
      if (selectedCountryData && !selectedCountryData.name.toLowerCase().includes(value.toLowerCase())) {
        setSelectedCountry("");
        setShowError(false);
      }
    }
  };

  const handleContinue = () => {
    const country = COUNTRIES.find(c => c.code === selectedCountry);
    if (country) {
      onCountrySelect(country.name, country.allowed);
    }
  };

  const handleCancel = () => {
    // Check if an allowed country has been selected
    const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);
    
    if (!selectedCountryData || !selectedCountryData.allowed) {
      setShowCloseError(true);
      setTimeout(() => setShowCloseError(false), 4000); // Clear error after 4 seconds
      return;
    }
    
    onClose();
  };

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);
  const canContinue = selectedCountry && !showError;

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      // User is trying to close the dialog
      handleCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-md mx-4 bg-gray-800 border-gray-700 shadow-2xl" hideClose aria-describedby="country-selection-description">
        <DialogHeader className="text-center space-y-3">
          <div className="w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4" />
          <DialogTitle className="text-2xl text-white">
            Select Your Country
          </DialogTitle>
          <DialogDescription className="text-white leading-relaxed" id="country-selection-description">
            Access to this site depends on your location. Please choose your country of residence.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Search and Select Container */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-green-500 placeholder:text-white placeholder:font-bold placeholder:opacity-90"
              />
              {searchTerm && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCountry("");
                      setShowError(false);
                      setShowCloseError(false);
                    }}
                    className="text-white hover:text-gray-300 text-xs"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <Select value={selectedCountry} onValueChange={handleCountryChange} key={searchTerm}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/30 focus:ring-[3px]">
                <SelectValue placeholder={searchTerm ? `${filteredCountries.length} countries found` : "Choose your country"} className="text-white font-medium" />
              </SelectTrigger>
              <SelectContent className="max-h-60 bg-gray-800 border-gray-600">
                {filteredCountries.map((country) => (
                  <SelectItem key={country.code} value={country.code} className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{country.name}</span>
                      {!country.allowed && (
                        <span className="text-xs text-red-300 bg-red-900/50 px-2 py-0.5 rounded font-medium">
                          Restricted
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-3 py-2 text-sm text-white font-medium">
                    {searchTerm ? `No countries found for "${searchTerm}"` : "No countries available"}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Error States */}
          {showError && selectedCountryData && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <p className="text-red-300 font-medium">
                Sorry, betting is not available in {selectedCountryData.name}.
              </p>
              <p className="text-red-200 text-sm mt-1">
                Please select a different country if you are located elsewhere.
              </p>
            </div>
          )}

          {showCloseError && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <p className="text-red-300 font-medium">
                Please choose an allowed country to proceed.
              </p>
              <p className="text-red-200 text-sm mt-1">
                You must select a country where betting is available before continuing.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-white"
            >
              Continue
            </Button>
            <button
              onClick={handleCancel}
              className="text-white hover:text-gray-300 transition-colors underline text-sm"
            >
              Cancel
            </button>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-gray-600">
            <p className="text-xs text-white text-center">
              18+ only. Please play responsibly.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}