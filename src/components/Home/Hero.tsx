import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Background overlay with slight opacity */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Discover the Latest in Tech Innovation
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-md mx-auto md:mx-0">
              Explore premium gadgets and electronics that enhance your digital lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Button
                as={Link}
                to="/products"
                variant="primary"
                size="lg"
                className="group"
              >
                Shop Now
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              
              <Button
                as={Link}
                to="/featured"
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                Featured Products
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              {/* Main product image */}
              <img 
                src="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Featured Electronic Product" 
                className="rounded-lg shadow-2xl w-full object-cover z-10 relative"
              />
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600 rounded-full opacity-20 filter blur-3xl -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500 rounded-full opacity-20 filter blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;