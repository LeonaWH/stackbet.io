import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";

interface SignInPageProps {
  onPageChange: (page: string) => void;
  onLogin: (userData: any) => void;
}

export function SignInPage({ onPageChange, onLogin }: SignInPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate login
    setTimeout(() => {
      const userData = {
        username: "Player123",
        email: formData.email,
        balance: 750.00,
        isLoggedIn: true
      };
      onLogin(userData);
      onPageChange('sports');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordSubmitted(true);
    
    // Simulate password reset email
    setTimeout(() => {
      setForgotPasswordSubmitted(false);
      setForgotPasswordOpen(false);
      setForgotPasswordEmail("");
      // Could show a toast notification here
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Welcome Back!</h2>
            <p className="text-gray-300 mb-6">
              Successfully signed in to your stackbet.io account.
            </p>
            <div className="animate-spin w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-gray-400 mt-4">Loading your dashboard...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400">Sign in to your stackbet.io account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white">Email Address</Label>
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

                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white pl-10 pr-10"
                      placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                      className="border-gray-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-300">
                      Remember me
                    </Label>
                  </div>
                  <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-sm text-green-400 hover:text-green-300"
                      >
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">Reset Password</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      
                      {forgotPasswordSubmitted ? (
                        <div className="text-center py-8">
                          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-white mb-2">Email Sent!</h3>
                          <p className="text-gray-300 mb-4">
                            We've sent a password reset link to {forgotPasswordEmail}
                          </p>
                          <div className="animate-spin w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full mx-auto"></div>
                        </div>
                      ) : (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                          <div>
                            <Label htmlFor="reset-email" className="text-white">Email Address</Label>
                            <div className="relative mt-2">
                              <Input
                                id="reset-email"
                                type="email"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white pl-10"
                                placeholder="your@email.com"
                                required
                              />
                              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setForgotPasswordOpen(false)}
                              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit"
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                              Send Reset Link
                            </Button>
                          </div>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-bold text-base"
                >
                  Sign In
                </Button>

                <div className="text-center">
                  <p className="text-gray-400">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => onPageChange('signup')}
                      className="text-green-400 hover:text-green-300 font-bold"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>

              {/* Social Login Options */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-600 text-black hover:bg-gray-700 hover:text-white bg-white"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-600 text-black hover:bg-gray-700 hover:text-white bg-white"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
          <div className="relative w-full h-fit max-h-[600px] overflow-hidden rounded-lg mx-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1746333253387-5aac26260c96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwYWN0aW9ufGVufDF8fHx8MTc1NzU5NzQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Football match"
              className="w-full h-full object-cover min-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4">Ready to Win Big?</h2>
                <p className="text-xl text-gray-200">
                  Access your account and start betting on your favorite sports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}