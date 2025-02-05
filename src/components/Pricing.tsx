import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PaymentForm from './PaymentForm';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 29, annual: 24 },
    features: [
      'Up to 10 team members',
      'Basic collaboration tools',
      'Real-time chat',
      '5GB storage',
      'Email support'
    ]
  },
  {
    name: 'Professional',
    price: { monthly: 79, annual: 69 },
    features: [
      'Up to 50 team members',
      'Advanced collaboration',
      'Video conferencing',
      '50GB storage',
      'Priority support',
      'API access',
      'Custom integrations'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: { monthly: 199, annual: 179 },
    features: [
      'Unlimited team members',
      'Enterprise security',
      'Advanced analytics',
      'Unlimited storage',
      '24/7 dedicated support',
      'Custom deployment',
      'SLA guarantee',
      'Advanced permissions'
    ]
  }
];

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);

  const handleGetStarted = (plan: typeof plans[0]) => {
    setSelectedPlan({
      name: plan.name,
      price: isAnnual ? plan.price.annual : plan.price.monthly
    });
    setIsPaymentOpen(true);
  };

  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your team's needs
          </p>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-gray-800 transition-colors duration-300"
            >
              <div
                className={`absolute w-6 h-6 rounded-full bg-primary transition-transform duration-300 transform ${
                  isAnnual ? 'translate-x-9' : 'translate-x-1'
                } top-1`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual <span className="text-primary">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border ${
                plan.popular ? 'border-primary' : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-gray-400">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGetStarted(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            All plans include: 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>

      <PaymentForm
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        plan={selectedPlan || undefined}
      />
    </section>
  );
};

export default Pricing;