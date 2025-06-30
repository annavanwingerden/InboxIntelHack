
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechFlow",
      company: "YC S23",
      content: "InboxIntel helped us reach 100+ investors in 2 weeks. The personalization is incredible - 60% response rate!",
      avatar: "SC",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, DataPipe",
      company: "YC W23",
      content: "Finally, cold emails that don't feel cold. Our customer acquisition cost dropped by 40% using InboxIntel.",
      avatar: "MR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Thompson",
      role: "Founder, GrowthLab",
      company: "YC F23",
      content: "The AI understands our target market better than we do. We've closed 3 enterprise deals from cold outreach.",
      avatar: "ET",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Loved by founders{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Y Combinator founders are using InboxIntel to scale their outreach and close more deals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-blue-500 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
