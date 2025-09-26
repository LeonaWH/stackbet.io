import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Shield, Award, Users, Clock, CheckCircle, AlertTriangle, Phone, Mail } from "lucide-react";

export function AboutPage() {
  const licenses = [
    { name: "Gaming Commission", number: "GC-2024-PRO", status: "Active" },
    { name: "Betting Authority", number: "BA-PRO-001", status: "Active" },
    { name: "Responsible Gaming Council", number: "RGC-CERT-PRO", status: "Certified" }
  ];

  const teamMembers = [
    { name: "Alex Johnson", role: "Platform Development", experience: "10+ years" },
    { name: "Sarah Martinez", role: "Odds Management", experience: "8+ years" },
    { name: "Mike Chen", role: "Customer Support", experience: "5+ years" },
    { name: "Emma Thompson", role: "Responsible Gaming", experience: "12+ years" }
  ];

  const securityFeatures = [
    { name: "Advanced Encryption", description: "All user data is securely encrypted" },
    { name: "Identity Verification", description: "Comprehensive identity verification process" },
    { name: "24/7 Monitoring", description: "Continuous platform monitoring for security" },
    { name: "Safe Environment", description: "Secure and protected betting environment" }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About StackBet.io
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            A trusted sports betting platform designed for the ultimate betting experience. 
            Experience the thrill of sports betting with competitive odds and secure transactions.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  stackbet.io was founded to deliver the premier online sports betting experience. 
                  Our platform combines cutting-edge technology with comprehensive betting options 
                  across all major sports and events worldwide.
                </p>
                <p>
                  Built with advanced security protocols and user experience at the forefront, our 
                  platform provides seamless betting functionality with competitive odds, live betting 
                  options, and comprehensive account management features.
                </p>
                <p>
                  Whether you're a seasoned bettor or new to sports betting, stackbet.io offers 
                  the tools, resources, and support you need for an exceptional betting experience 
                  with complete peace of mind.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-6">🏆</div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-gray-400">Secure Platform</div>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">24/7</div>
                  <div className="text-gray-400">Customer Support</div>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className="text-gray-400">Sports Covered</div>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">1M+</div>
                  <div className="text-gray-400">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing & Regulation */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-green-400" />
              Licensing & Compliance
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform is fully licensed and regulated, following all industry standards and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {licenses.map((license, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <Badge className="bg-green-600">
                    {license.status}
                  </Badge>
                </div>
                <h3 className="font-bold text-white mb-2">{license.name}</h3>
                <p className="text-gray-400 text-sm mb-4">License: {license.number}</p>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Verified</span>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-900/20 border-blue-600 p-6">
            <div className="text-center">
              <h3 className="font-bold text-blue-400 mb-2">Compliance Commitment</h3>
              <p className="text-blue-200">
                stackbet.io maintains the highest standards of regulatory compliance and responsible gaming practices. 
                All operations are conducted under strict oversight and licensing requirements.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Security & Trust
            </h2>
            <p className="text-xl text-gray-300">
              Enterprise-level security protecting your data and transactions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 p-6 text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">{feature.name}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Gaming */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              Responsible Gaming
            </h2>
            <p className="text-xl text-gray-300">
              Your wellbeing is our priority - we promote safe and responsible gaming
            </p>
          </div>

          <Card className="bg-gray-800 border-gray-700 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-white mb-3">Our Commitment</h3>
                <p className="text-gray-300">
                  stackbet.io is committed to providing a safe and responsible betting environment. 
                  We believe in empowering our users with the tools and knowledge needed to bet 
                  responsibly and within their means.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-400 mb-3">Safety Features</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Customizable spending limits</li>
                    <li>• Session time tracking</li>
                    <li>• Self-exclusion options</li>
                    <li>• Reality check reminders</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">Support Resources</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• 24/7 customer support</li>
                    <li>• Problem gambling helplines</li>
                    <li>• Educational materials</li>
                    <li>• Professional counseling referrals</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-600/10 border border-yellow-600 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">Remember to Bet Responsibly</h4>
                <p className="text-yellow-200 text-sm">
                  Sports betting should be entertaining and enjoyable. Please ensure you understand 
                  the risks involved and only bet what you can afford to lose. If you feel you may 
                  have a gambling problem, seek help immediately.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-300">
              Meet the professionals behind stackbet.io's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 p-6 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-1">{member.name}</h3>
                <p className="text-green-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.experience}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Have questions? Our customer support team is here to help 24/7
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center gap-2 text-green-100">
              <Mail className="w-5 h-5" />
              <span>support@stackbet.io</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <Phone className="w-5 h-5" />
              <span>+1 (800) 555-BETS</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <Clock className="w-5 h-5" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 font-bold"
          >
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  );
}