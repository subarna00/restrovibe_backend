'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollAnimate } from '@/components/ui/scroll-animate'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Smartphone, 
  QrCode, 
  BarChart3,
  ShoppingCart,
  Package,
  CreditCard,
  Clock,
  Shield,
  Globe,
  Download,
  Play,
  ChevronRight,
  Quote,
  Sparkles,
  Zap,
  Heart,
  Award,
  Target,
  Rocket,
  Utensils,
  ClipboardList,
  ChartBar,
  Bot,
  Smartphone as Mobile,
  Headphones,
  Calendar,
  Phone,
  CheckCircle2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Scroll Indicator */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-blue-600 transform origin-left z-50"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                RestroVibe
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-10">
              <a href="#features" className="text-gray-700 font-medium hover:text-red-600 transition-colors relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#analytics" className="text-gray-700 font-medium hover:text-red-600 transition-colors relative group">
                Analytics
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#benefits" className="text-gray-700 font-medium hover:text-red-600 transition-colors relative group">
                Benefits
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-700 font-medium hover:text-red-600 transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  onClick={() => router.push('/dashboard')}
                  className="hidden lg:block text-gray-700 hover:text-red-600"
                >
                  Dashboard
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={() => router.push('/login')}
                  className="hidden lg:block text-gray-700 hover:text-red-600"
                >
                  Sign In
                </Button>
              )}
              <Button 
                onClick={() => router.push(isAuthenticated ? '/dashboard' : '/register')}
                className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{
        backgroundImage: `
          radial-gradient(circle at 25px 25px, rgba(220, 38, 38, 0.1) 2px, transparent 2px),
          radial-gradient(circle at 75px 75px, rgba(29, 78, 216, 0.1) 2px, transparent 2px)
        `,
        backgroundSize: '100px 100px'
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="lg:pr-8">
              <ScrollAnimate>
                <Badge className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
                  <Rocket className="w-4 h-4 mr-2" />
                  Revolutionary Restaurant Technology
                </Badge>
              </ScrollAnimate>
              
              <ScrollAnimate delay={1}>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                  Transform Your
                  <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"> Restaurant</span>
                  Operations
                </h1>
              </ScrollAnimate>
              
              <ScrollAnimate delay={2}>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                  Enterprise-grade restaurant management system trusted by 5-star hotels and local establishments. 
                  AI-powered insights, real-time analytics, and seamless operations.
                </p>
              </ScrollAnimate>
              
              <ScrollAnimate delay={3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Button 
                    onClick={() => router.push('/register')}
                    className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:opacity-90 transition-all shadow-lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Free Trial
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold text-base hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Demo
                  </Button>
                </div>
              </ScrollAnimate>
              
              <ScrollAnimate delay={4}>
                <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
                  <div>
                    <div className="text-xl font-bold text-gray-900">99.9%</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">500+</div>
                    <div className="text-xs text-gray-600">Restaurants</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
            
            <ScrollAnimate delay={2}>
              <div className="relative">
                <div className="animate-floating">
                <Card className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-0">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Live Operations</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
                        <div>
                          <div className="font-semibold text-gray-900">Table 7 - Order Complete</div>
                          <div className="text-sm text-gray-600">Pasta Carbonara, Caesar Salad</div>
                        </div>
                        <div className="text-green-600 font-bold">Ready</div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div>
                          <div className="font-semibold text-gray-900">Table 12 - In Kitchen</div>
                          <div className="text-sm text-gray-600">Grilled Salmon, Risotto</div>
                        </div>
                        <div className="text-blue-600 font-bold">8 min</div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-200">
                        <div>
                          <div className="font-semibold text-gray-900">Table 5 - New Order</div>
                          <div className="text-sm text-gray-600">Steak Medium, Wine</div>
                        </div>
                        <div className="text-red-600 font-bold">Just in</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600 font-medium">Today's Revenue</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">$4,287</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-red-600 to-blue-600 h-3 rounded-full w-3/4"></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">74% of daily target achieved</div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollAnimate>
              <Badge className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Comprehensive Features
              </Badge>
            </ScrollAnimate>
            <ScrollAnimate delay={1}>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
                Everything You Need to <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Excel</span>
              </h2>
            </ScrollAnimate>
            <ScrollAnimate delay={2}>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Professional-grade tools designed for modern restaurants and hospitality businesses
              </p>
            </ScrollAnimate>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ClipboardList className="w-7 h-7" />,
                title: "Order Management",
                description: "Real-time order tracking, kitchen integration, and table management with intuitive workflow optimization.",
                features: ["Real-time synchronization", "Kitchen display systems", "Table status tracking"]
              },
              {
                icon: <ChartBar className="w-7 h-7" />,
                title: "Advanced Analytics",
                description: "Comprehensive business intelligence with predictive insights and performance optimization recommendations.",
                features: ["Revenue analytics", "Customer behavior insights", "Profit margin analysis"]
              },
              {
                icon: <Bot className="w-7 h-7" />,
                title: "AI Intelligence",
                description: "Machine learning algorithms for demand forecasting, menu optimization, and operational efficiency.",
                features: ["Demand prediction", "Menu recommendations", "Inventory optimization"]
              },
              {
                icon: <Mobile className="w-7 h-7" />,
                title: "Multi-Platform",
                description: "Native iOS and Android applications with web dashboard for complete operational control.",
                features: ["Native mobile apps", "Offline capabilities", "Cloud synchronization"]
              },
              {
                icon: <Shield className="w-7 h-7" />,
                title: "Enterprise Security",
                description: "Bank-grade security with encrypted data transmission and compliance with industry standards.",
                features: ["End-to-end encryption", "PCI DSS compliance", "Role-based access"]
              },
              {
                icon: <Headphones className="w-7 h-7" />,
                title: "24/7 Support",
                description: "Dedicated support team with instant response times and comprehensive training programs.",
                features: ["Live chat support", "Training programs", "Technical assistance"]
              }
            ].map((feature, index) => (
              <ScrollAnimate key={index} delay={Math.min(index + 1, 4) as 1 | 2 | 3 | 4}>
                <Card 
                  className="group hover:shadow-2xl transition-all duration-500 border border-gray-200 bg-white hover:-translate-y-2"
                >
                <CardContent className="p-8">
                  <div className="w-18 h-18 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gradient-to-r from-red-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-white mb-20">
            <ScrollAnimate>
              <h2 className="text-3xl lg:text-4xl font-black mb-6">
                Proven Business Results
              </h2>
            </ScrollAnimate>
            <ScrollAnimate delay={1}>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Data-driven outcomes from restaurants and hotels using RestroVibe worldwide
              </p>
            </ScrollAnimate>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "45%", label: "Faster Service", description: "Average order processing time reduction" },
              { number: "30%", label: "Revenue Growth", description: "Average revenue increase within 6 months" },
              { number: "65%", label: "Efficiency Gain", description: "Operational efficiency improvement" },
              { number: "99.9%", label: "Reliability", description: "System uptime guarantee" }
            ].map((stat, index) => (
              <ScrollAnimate key={index} delay={Math.min(index + 2, 4) as 1 | 2 | 3 | 4}>
                <div className="p-6 group hover:scale-105 transition-all duration-300">
                <div className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-blue-100">{stat.description}</div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <ScrollAnimate>
            <Badge className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Join Industry Leaders
            </Badge>
          </ScrollAnimate>
          
          <ScrollAnimate delay={1}>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8">
              Ready to Transform Your <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Restaurant?</span>
            </h2>
          </ScrollAnimate>
          
          <ScrollAnimate delay={2}>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Join hundreds of successful restaurants and hotels. Start your transformation today with our 30-day free trial.
            </p>
          </ScrollAnimate>
          
          <ScrollAnimate delay={3}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              onClick={() => router.push('/register')}
              className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 hover:text-white transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Talk to Expert
            </Button>
            </div>
          </ScrollAnimate>
          
          <ScrollAnimate delay={4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
              Setup in under 10 minutes
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <ScrollAnimate>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold">RestroVibe</span>
                </div>
              </ScrollAnimate>
              <ScrollAnimate delay={1}>
                <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                  Enterprise-grade restaurant management system trusted by industry leaders worldwide. 
                  Transform your operations with AI-powered insights and seamless technology.
                </p>
              </ScrollAnimate>
              <ScrollAnimate delay={2}>
                <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                </div>
              </ScrollAnimate>
            </div>
            
            <ScrollAnimate delay={1}>
              <h4 className="text-lg font-bold mb-6">Solution</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </ScrollAnimate>
            
            <ScrollAnimate delay={2}>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </ScrollAnimate>
          </div>
          
          <ScrollAnimate delay={3}>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RestroVibe. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </ScrollAnimate>
        </div>
      </footer>
    </div>
  )
}