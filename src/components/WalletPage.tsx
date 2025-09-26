import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Wallet, Plus, Minus, CreditCard, DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface WalletPageProps {
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
}

export function WalletPage({ balance, onUpdateBalance }: WalletPageProps) {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 500.00,
      description: "Credit Card Deposit",
      date: "2024-01-15 14:30",
      status: "completed"
    },
    {
      id: 2,
      type: "bet",
      amount: -50.00,
      description: "Bet: City Eagles vs United Wolves",
      date: "2024-01-15 15:45",
      status: "completed"
    },
    {
      id: 3,
      type: "win",
      amount: 107.50,
      description: "Winning: City Eagles vs United Wolves",
      date: "2024-01-15 17:00",
      status: "completed"
    },
    {
      id: 4,
      type: "bet",
      amount: -25.00,
      description: "Bet: Thunder FC vs Lightning United",
      date: "2024-01-14 20:15",
      status: "completed"
    },
    {
      id: 5,
      type: "deposit",
      amount: 250.00,
      description: "Bank Transfer",
      date: "2024-01-13 10:00",
      status: "completed"
    },
    {
      id: 6,
      type: "bet",
      amount: -75.00,
      description: "Bet: Storm Riders vs Fire Hawks",
      date: "2024-01-13 21:30",
      status: "completed"
    },
    {
      id: 7,
      type: "win",
      amount: 146.25,
      description: "Winning: Storm Riders vs Fire Hawks",
      date: "2024-01-13 23:45",
      status: "completed"
    },
    {
      id: 8,
      type: "withdrawal",
      amount: -200.00,
      description: "Withdrawal to Bank Account",
      date: "2024-01-12 16:20",
      status: "pending"
    }
  ];

  const handleAddFunds = () => {
    const amount = parseFloat(addAmount);
    if (amount > 0) {
      onUpdateBalance(balance + amount);
      setIsAddFundsOpen(false);
      setAddAmount("");
      setPaymentMethod("");
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case "bet":
        return <Minus className="w-4 h-4 text-orange-400" />;
      case "win":
        return <Plus className="w-4 h-4 text-green-400" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
      case "win":
        return "text-green-400";
      case "withdrawal":
      case "bet":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Wallet className="w-8 h-8" />
                My Wallet
              </h1>
              <p className="text-green-100">Manage your funds and view transaction history</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-sm text-green-100">Current Balance</div>
              <div className="text-4xl font-bold text-white">${balance.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Wallet Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available Balance:</span>
                    <span className="text-green-400 font-bold">${balance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Month Deposited:</span>
                    <span className="text-white font-bold">$750.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Month Won:</span>
                    <span className="text-green-400 font-bold">$253.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pending Withdrawals:</span>
                    <span className="text-yellow-400 font-bold">$200.00</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Wallet Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Wallet Actions</h3>
                <div className="space-y-3">
                  <Dialog open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Funds
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white" aria-describedby="add-funds-wallet-description">
                      <DialogHeader>
                        <DialogTitle className="text-white">Add Funds to Wallet</DialogTitle>
                        <DialogDescription className="text-gray-400" id="add-funds-wallet-description">
                          Choose your payment method and amount to add to your wallet
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount" className="text-white">Amount</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="payment-method" className="text-white">Payment Method</Label>
                          <Select onValueChange={setPaymentMethod}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="credit">Credit Card</SelectItem>
                              <SelectItem value="debit">Debit Card</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="crypto">Cryptocurrency</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={handleAddFunds}
                          disabled={!addAmount || !paymentMethod}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Add ${addAmount || "0.00"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
                    disabled
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Withdraw Funds (Coming Soon)
                  </Button>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Saved Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-medium text-white">•••• •••• •••• 4567</div>
                        <div className="text-sm text-gray-400">Expires 12/26</div>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Primary</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                        PP
                      </div>
                      <div>
                        <div className="font-medium text-white">PayPal Account</div>
                        <div className="text-sm text-gray-400">user@email.com</div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Transaction History */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  Transaction History
                </h3>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-400">Type</TableHead>
                        <TableHead className="text-gray-400">Description</TableHead>
                        <TableHead className="text-gray-400">Amount</TableHead>
                        <TableHead className="text-gray-400">Date</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id} className="border-gray-700">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              <span className="text-white capitalize">{transaction.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {transaction.description}
                          </TableCell>
                          <TableCell className={`font-bold ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {transaction.date}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                              className={
                                transaction.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Load More Transactions
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}