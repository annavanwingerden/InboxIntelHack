import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { api } from '@/lib/api';

const Auth = () => {
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const isSignupDefault = searchParams.get('mode') !== 'signin';

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(isSignupDefault);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (isSignup) {
      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        }
      });
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    } else {
      const { error } = await signIn({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  const trustedCompanies = [
    { name: 'WeChat', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/WeChat_logo.svg' },
    { name: 'Booking.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' },
    { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="relative min-h-screen flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-8 text-gray-600 hover:text-gray-900">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to home
              </Link>
            </Button>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <span className="text-xl font-bold text-gray-900">InboxIntel</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignup ? 'Start writing smarter' : 'Welcome back'}
              </h1>
              <p className="text-gray-600">
                {isSignup ? 'Join 500+ founders scaling their outreach with AI' : 'Sign in to your account'}
              </p>
            </div>

            {/* Social Proof - Only show for signup */}
            {isSignup && (
              <div className="bg-white p-4 rounded-xl border border-gray-200 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-600 text-lg">20%</div>
                    <div className="text-gray-600">Response Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600 text-lg">2 weeks</div>
                    <div className="text-gray-600">To 100+ leads</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600 text-lg">40%</div>
                    <div className="text-gray-600">Lower CAC</div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields - Only show for signup */}
              {isSignup && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Sarah"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Chen"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="sarah@techflow.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={isSignup ? "Create a strong password" : "Enter your password"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSignup ? 'Start Free Trial' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-50 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full bg-white"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M24 9.5c3.9 0 6.9 1.6 9.2 3.8l6.9-6.9C35.9 2.5 30.2 0 24 0 14.8 0 7.1 5.3 3 13l8.4 6.5c1.8-5.4 6.9-9 12.6-9z"></path>
                <path fill="#34A853" d="M46.2 25.4c0-1.7-.2-3.4-.5-5H24v9.5h12.8c-.6 3-2.2 5.6-4.8 7.4l7.3 5.7c4.3-4 6.9-9.9 6.9-17.6z"></path>
                <path fill="#FBBC05" d="M9.8 29.6c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-8.4-6.5C.7 17.1 0 20.5 0 24s.7 6.9 2.2 10.4l7.6-5.8z"></path>
                <path fill="#EA4335" d="M24 48c6.2 0 11.4-2 15.1-5.4l-7.3-5.7c-2.1 1.4-4.8 2.3-7.8 2.3-5.7 0-10.8-3.6-12.6-9l-8.4 6.5C7.1 42.7 14.8 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Sign in with Google
            </Button>

            {/* Terms - Only show for signup */}
            {isSignup && (
              <p className="mt-6 text-sm text-gray-500 text-center">
                By signing up, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            )}

            {/* Toggle Link */}
            <p className="mt-6 text-center text-gray-600">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                onClick={toggleForm}
                className="text-blue-600 hover:underline font-medium"
              >
                {isSignup ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Testimonial & UI Preview */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center p-12 relative">
          <div className="max-w-md text-white relative z-10">
            <div className="mb-8">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl leading-relaxed mb-6">
                "InboxIntel transformed our outreach completely. We went from 5% to 20% response rates in just two weeks. The AI personalization is incredible."
              </blockquote>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" 
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-white/20"
                />
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-blue-200">Founder, TechFlow • YC S23</div>
                </div>
              </div>
            </div>

            {/* UI Preview */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 