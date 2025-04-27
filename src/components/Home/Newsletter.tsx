import React, { useState } from 'react';
import Button from '../UI/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the API call to subscribe the user here
    setIsSubmitted(true);
  };
  
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8">
            Stay updated with our latest products, exclusive deals, and tech news.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-xl font-medium mb-2">Thank You for Subscribing!</div>
              <p className="text-blue-100">
                You've been added to our newsletter list. Get ready for updates on the latest tech and exclusive offers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          )}
          
          <p className="text-blue-100 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;