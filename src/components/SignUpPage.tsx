import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { User, Mail, Lock, MapPin, Calendar as CalendarIcon, Eye, EyeOff, CheckCircle, FileText, CreditCard } from "lucide-react";
import { format } from "date-fns";

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

interface SignUpPageProps {
  onPageChange: (page: string) => void;
  onLogin: (userData: any) => void;
}

export function SignUpPage({ onPageChange, onLogin }: SignUpPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [isIdSectionOpen, setIsIdSectionOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    agreeToTermsAndAge: false,
    agreeToMarketing: false,
    idType: "",
    idNumber: "",
    addressLine1: "",
    city: "",
    postcode: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    setTimeout(() => {
      const userData = {
        username: formData.username,
        email: formData.email,
        balance: 500.00,
        isLoggedIn: true,
        dateOfBirth: dateOfBirth,
        country: formData.country,
        idType: formData.idType,
        idNumber: formData.idNumber,
        addressLine1: formData.addressLine1,
        city: formData.city,
        postcode: formData.postcode
      };
      onLogin(userData);
      onPageChange('home');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.agreeToTermsAndAge && formData.username && formData.email && formData.password && formData.confirmPassword && formData.country && dateOfBirth && formData.idType && formData.idNumber && formData.city && formData.postcode;

  if (isSubmitted) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Account Created!</h2>
            <p className="text-gray-300 mb-6">
              Welcome to stackbet.io! Your account has been created successfully.
            </p>
            <div className="animate-spin w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-gray-400 mt-4">Redirecting to your dashboard...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-2xl">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Join stackbet.io</h1>
                <p className="text-gray-400">Create your account and start betting today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="text-white">Username *</Label>
                    <div className="relative mt-2">
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white pl-10"
                        placeholder="Choose a username"
                        required
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white pl-10"
                        placeholder="your@email.com"
                        required
                      />
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-white">Password *</Label>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white pl-10 pr-10"
                        placeholder="Create a strong password"
                        required
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password *</Label>
                    <div className="relative mt-2">
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white pl-10"
                        placeholder="Confirm your password"
                        required
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Country Text Input */}
                  <div>
                    <Label htmlFor="country" className="text-white">Country *</Label>
                    <div className="relative mt-2">
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white pl-3"
                        placeholder="Enter your country"
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label htmlFor="dateOfBirth" className="text-white">Date of Birth *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2 bg-gray-700 border-gray-600 text-white hover:bg-gray-600",
                            !dateOfBirth && "text-gray-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth ? format(dateOfBirth, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600" align="start">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={setDateOfBirth}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                          className="bg-gray-700 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="termsAndAge"
                      checked={formData.agreeToTermsAndAge}
                      onCheckedChange={(checked) => handleInputChange('agreeToTermsAndAge', !!checked)}
                      className="border-gray-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1"
                    />
                    <Label htmlFor="termsAndAge" className="text-sm text-gray-300 leading-relaxed">
                      I confirm that I am 18+ and agree to the{" "}
                      <button type="button" className="text-green-400 hover:text-green-300 underline">
                        Terms & Conditions
                      </button>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange('agreeToMarketing', !!checked)}
                      className="border-gray-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1"
                    />
                    <Label htmlFor="marketing" className="text-sm text-gray-300">
                      I want to receive promotional offers and updates
                    </Label>
                  </div>
                </div>

                {/* ID & Address Section */}
                <div className="border-t border-gray-600 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    ID & Address Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* ID Type Text Input */}
                      <div>
                        <Label htmlFor="idType" className="text-white">ID Type *</Label>
                        <div className="relative mt-2">
                          <Input
                            id="idType"
                            value={formData.idType}
                            onChange={(e) => handleInputChange('idType', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white pl-3"
                            placeholder="Enter your ID type (e.g. Passport)"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="idNumber" className="text-white">ID Number *</Label>
                        <div className="relative mt-2">
                          <Input
                            id="idNumber"
                            value={formData.idNumber}
                            onChange={(e) => handleInputChange('idNumber', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white pl-10"
                            placeholder="AB1234567"
                            required
                          />
                          <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Enter your ID number as shown on your document</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="addressLine1" className="text-white">Address Line 1</Label>
                      <div className="relative mt-2">
                        <Input
                          id="addressLine1"
                          value={formData.addressLine1}
                          onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white pl-10"
                          placeholder="123 ABC Street"
                        />
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-white">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                          placeholder="Sampleville"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="postcode" className="text-white">Postcode/ZIP *</Label>
                        <Input
                          id="postcode"
                          value={formData.postcode}
                          onChange={(e) => handleInputChange('postcode', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                          placeholder="12345"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isFormValid}
                >
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-gray-400">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => onPageChange('signin')}
                      className="text-green-400 hover:text-green-300 font-bold"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </Card>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
          <div className="relative w-full h-fit max-h-[700px] overflow-hidden rounded-lg mx-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1631746410377-b0e23f61d083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwY3Jvd2R8ZW58MXx8fHwxNzU3NTg1NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Sports stadium"
              className="w-full h-full object-cover min-h-[600px]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4">Welcome to stackbet.io</h2>
                <p className="text-xl text-gray-200">
                  Join thousands of sports fans betting on their favorite teams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
