import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Mail, Phone, Clock, MapPin, MessageSquare, Send, CheckCircle } from "lucide-react";

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-green-400" />,
      title: "Email Us",
      value: "support@stackbet.io",
      description: "Get a response within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-400" />,
      title: "Call Us",
      value: "+1 (555) STACK-BET",
      description: "24/7 support available"
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-400" />,
      title: "Business Hours",
      value: "24/7 Available",
      description: "Platform never sleeps"
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-400" />,
      title: "Office Location",
      value: "Virtual Location",
      description: "Cloud-based environment"
    }
  ];



  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Our Team
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions about our sports betting platform? Want to discuss custom solutions? 
            We're here to help with all your presentation needs.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                  Send us a message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300">
                      Thank you for your interest in our platform. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-white">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-white">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white mt-2"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiry-type" className="text-white">Inquiry Type</Label>
                        <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="platform">Platform Questions</SelectItem>
                            <SelectItem value="custom">Custom Solutions</SelectItem>
                            <SelectItem value="business">Business Partnership</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="presentation">Presentation Needs</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-white">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-2"
                        placeholder="Brief subject line"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white mt-2 min-h-[120px]"
                        placeholder="Tell us about your needs or questions..."
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-bold"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Button>

                    <p className="text-gray-400 text-sm text-center">
                      * Required fields. This is a contact form for presentation purposes.
                    </p>
                  </form>
                )}
              </div>
            </Card>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{info.title}</h4>
                        <p className="text-gray-300 font-medium">{info.value}</p>
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Demo Notice */}
            <Card className="bg-blue-900/20 border-blue-600">
              <div className="p-6">
                <h4 className="font-bold text-blue-400 mb-3">Platform Notice</h4>
                <p className="text-blue-200 text-sm mb-4">
                  This contact form is part of our presentation platform. While functional, 
                  it's designed to showcase contact capabilities for sports betting platforms.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  Learn More About Platform
                </Button>
              </div>
            </Card>
          </div>
        </div>


      </div>
    </div>
  );
}