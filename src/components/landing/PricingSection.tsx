import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "£39",
      period: "/month",
      description: "Perfect for early-stage founders",
      icon: Zap,
      features: [
        "500 AI-generated emails/month",
        "Basic personalization",
        "Email deliverability tracking",
        "24/7 email support",
        "Dashboard analytics"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Growth",
      price: "£119",
      period: "/month",
      description: "For scaling startups",
      icon: Crown,
      features: [
        "2,500 AI-generated emails/month",
        "Advanced personalization",
        "A/B testing",
        "Priority support",
        "Advanced analytics",
        "CRM integrations",
        "Custom templates"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For high-volume senders",
      icon: Crown,
      features: [
        "Unlimited emails",
        "Custom AI training",
        "Dedicated success manager",
        "White-label options",
        "Advanced integrations",
        "Custom reporting",
        "SLA guarantee"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const handleCTAClick = (cta: string) => {
    if (cta === "Start Free Trial") {
      window.location.href = "/signup";
    }
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, scale as you grow. No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative p-8 bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              plan.popular 
                ? 'border-blue-500 shadow-lg' 
                : 'border-gray-200 hover:border-blue-300'
            }`}>
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-12 h-12 bg-gradient-to-r ${
                  plan.popular ? 'from-blue-600 to-purple-600' : 'from-gray-400 to-gray-600'
                } rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                asChild={plan.cta === "Start Free Trial"}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
                size="lg"
              >
                {plan.cta === "Start Free Trial" ? (
                  <Link to="/auth?mode=signup">{plan.cta}</Link>
                ) : (
                  <span>{plan.cta}</span>
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
