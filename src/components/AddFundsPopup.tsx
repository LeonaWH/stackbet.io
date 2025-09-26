import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CreditCard, Smartphone, Building, DollarSign, Shield, CheckCircle, Scan, Lock, Calendar, User } from "lucide-react";

interface AddFundsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFunds: (amount: number) => void;
}

export function AddFundsPopup({ isOpen, onClose, onAddFunds }: AddFundsPopupProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Payment form states
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
    bankName: ""
  });
  
  const [isScanning, setIsScanning] = useState(false);

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "apple",
      name: "Apple Pay",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Touch ID or Face ID",
    },
    {
      id: "google",
      name: "Google Pay",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Quick and secure",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Building className="w-5 h-5" />,
      description: "Direct from your bank account",
    },
  ];

  const quickAmounts = [25, 50, 100, 250, 500];

  const validatePaymentDetails = () => {
    if (paymentMethod === "card") {
      if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill in all card details");
        return false;
      }
    }
    
    if (paymentMethod === "bank") {
      if (!bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.routingNumber) {
        alert("Please fill in all bank details");
        return false;
      }
    }
    
    if ((paymentMethod === "apple" || paymentMethod === "google") && !isScanning) {
      alert(`Please authenticate with ${paymentMethod === "apple" ? "Apple Pay" : "Google Pay"} first`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fundAmount = parseFloat(amount);
    
    if (fundAmount < 10) {
      alert("Minimum deposit is $10");
      return;
    }

    if (!validatePaymentDetails()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing with different timing based on method
    const processingTime = paymentMethod === "bank" ? 5000 : 3000;
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      setTimeout(() => {
        onAddFunds(fundAmount);
        onClose();
        setIsComplete(false);
        setAmount("");
        setPaymentMethod("card");
        setCardDetails({ number: "", expiry: "", cvv: "", name: "" });
        setBankDetails({ accountNumber: "", routingNumber: "", accountType: "checking", bankName: "" });
        setIsScanning(false);
      }, 2000);
    }, processingTime);
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      setAmount("");
      setPaymentMethod("card");
      setIsComplete(false);
      setCardDetails({ number: "", expiry: "", cvv: "", name: "" });
      setBankDetails({ accountNumber: "", routingNumber: "", accountType: "checking", bankName: "" });
      setIsScanning(false);
    }
  };

  if (isComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-900 border-green-500 text-white max-w-md" aria-describedby="payment-success-description">
          <DialogHeader>
            <DialogTitle className="sr-only">Payment Successful</DialogTitle>
            <DialogDescription className="sr-only" id="payment-success-description">
              Your payment has been processed successfully and funds have been added to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Funds Added Successfully!</h2>
            <p className="text-gray-300 mb-2">
              ${amount} has been added to your account
            </p>
            <p className="text-sm text-gray-400">
              Your balance will be updated shortly
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (isProcessing) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md" aria-describedby="payment-processing-description">
          <DialogHeader>
            <DialogTitle className="sr-only">Processing Payment</DialogTitle>
            <DialogDescription className="sr-only" id="payment-processing-description">
              Your payment is currently being processed. Please wait while we add funds to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="animate-spin w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-4">Processing Payment</h2>
            <p className="text-gray-300 mb-2">
              Adding ${amount} to your account...
            </p>
            <p className="text-sm text-gray-400">
              Please wait while we process your payment
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="add-funds-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-400" />
            Add Funds
          </DialogTitle>
          <DialogDescription className="text-gray-400" id="add-funds-description">
            Choose your payment method and amount to add to your account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Selection */}
          <div>
            <Label htmlFor="amount" className="text-white font-medium">
              Amount to Add
            </Label>
            <div className="mt-2 space-y-3">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount ($10 minimum)"
                className="bg-gray-800 border-gray-600 text-white"
                min="10"
                step="0.01"
                required
              />
              
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="border-gray-600 text-black hover:bg-gray-800 hover:text-white"
                  >
                    ${quickAmount}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          {/* Payment Method Selection */}
          <div>
            <Label className="text-white font-medium">
              Payment Method
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => {
                setPaymentMethod(value);
                setIsScanning(false);
              }}
              className="mt-3 space-y-2"
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    className="border-gray-600 text-green-400"
                  />
                  <Label
                    htmlFor={method.id}
                    className="flex items-center space-x-3 flex-1 cursor-pointer p-3 rounded-lg border border-gray-700 hover:bg-gray-800"
                  >
                    <div className="text-green-400">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{method.name}</div>
                      <div className="text-sm text-gray-400">{method.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Method Specific Forms */}
          {paymentMethod === "card" && (
            <Card className="bg-gray-800 border-gray-700 p-4 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-green-400" />
                <h4 className="font-medium text-white">Card Details</h4>
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="card-name" className="text-white text-sm">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="card-number" className="text-white text-sm">Card Number</Label>
                  <Input
                    id="card-number"
                    value={cardDetails.number}
                    onChange={(e) => {
                      // Format card number with spaces
                      const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                      setCardDetails(prev => ({ ...prev, number: value }));
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="card-expiry" className="text-white text-sm">Expiry Date</Label>
                    <Input
                      id="card-expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        // Format expiry date with slash
                        const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{1,2})/, '$1/$2');
                        setCardDetails(prev => ({ ...prev, expiry: value }));
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-cvv" className="text-white text-sm">CVV</Label>
                    <Input
                      id="card-cvv"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                      maxLength={4}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-3">
                <Shield className="w-4 h-4" />
                <span>Your card details are encrypted and secure</span>
              </div>
            </Card>
          )}

          {(paymentMethod === "apple" || paymentMethod === "google") && (
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="text-center space-y-4">
                {!isScanning ? (
                  <>
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">
                        {paymentMethod === "apple" ? "Apple Pay" : "Google Pay"} Payment
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">
                        {paymentMethod === "apple" 
                          ? "Use Touch ID, Face ID, or your passcode to authenticate"
                          : "Use your fingerprint or PIN to authenticate"
                        }
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setIsScanning(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
                    >
                      <Scan className="w-4 h-4 mr-2" />
                      Authenticate with {paymentMethod === "apple" ? "Apple Pay" : "Google Pay"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                        <Scan className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">Scanning...</h4>
                      <p className="text-sm text-gray-400 mb-4">
                        Please follow the instructions on your device
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-w-32 mx-auto">
                      <div className="h-2 bg-green-400 rounded animate-pulse"></div>
                      <div className="h-2 bg-green-400 rounded animate-pulse delay-75"></div>
                      <div className="h-2 bg-green-400 rounded animate-pulse delay-150"></div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsScanning(false)}
                      className="w-full border-gray-600 text-gray-600 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </Card>
          )}

          {paymentMethod === "bank" && (
            <Card className="bg-gray-800 border-gray-700 p-4 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-5 h-5 text-green-400" />
                <h4 className="font-medium text-white">Bank Transfer Details</h4>
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="bank-name" className="text-white text-sm">Bank Name</Label>
                  <Input
                    id="bank-name"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="Chase Bank"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="account-type" className="text-white text-sm">Account Type</Label>
                  <Select 
                    value={bankDetails.accountType} 
                    onValueChange={(value) => setBankDetails(prev => ({ ...prev, accountType: value }))}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1 focus:border-green-500 focus:ring-green-500/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600 text-white">
                      <SelectItem value="checking" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">Checking</SelectItem>
                      <SelectItem value="savings" className="text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="routing-number" className="text-white text-sm">Routing Number</Label>
                  <Input
                    id="routing-number"
                    value={bankDetails.routingNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, routingNumber: e.target.value }))}
                    placeholder="123456789"
                    maxLength={9}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="account-number" className="text-white text-sm">Account Number</Label>
                  <Input
                    id="account-number"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                    placeholder="1234567890"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-400 font-medium">Processing Time</p>
                    <p className="text-blue-200">Bank transfers typically take 1-3 business days to process</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Security Notice */}
          <Card className="bg-blue-900/20 border-blue-600 p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <h4 className="font-medium text-blue-400">Secure Payment</h4>
                <p className="text-sm text-blue-200">
                  All transactions are encrypted and protected by industry-standard security
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-gray-600 text-black hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
              disabled={
                !amount || 
                parseFloat(amount) < 10 ||
                (paymentMethod === "card" && (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) ||
                (paymentMethod === "bank" && (!bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.routingNumber)) ||
                ((paymentMethod === "apple" || paymentMethod === "google") && !isScanning)
              }
            >
              {paymentMethod === "bank" ? "Initiate Transfer" : `Add ${amount || '0'}`}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Minimum deposit: $10. Funds are typically available within minutes.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}