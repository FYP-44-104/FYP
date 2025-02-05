import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: {
    name: string;
    price: number;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({ isOpen, onClose, plan }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Processing payment:', { cardNumber, expiry, cvc, name });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-2xl p-8 w-full max-w-md relative border border-gray-800 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
              {plan && (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-gray-400">Selected Plan</p>
                  <p className="text-white font-semibold">{plan.name}</p>
                  <p className="text-primary text-xl font-bold">${plan.price}/month</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="card" className="block text-sm font-medium text-gray-400 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="card"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                  <CreditCard className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-400 mb-1">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="expiry"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                    <Calendar className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-400 mb-1">
                    CVC
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cvc"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                    <Lock className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 mt-6"
              >
                Pay Now
              </button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-6">
              Your payment is secure and encrypted
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentForm;