import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Heart, 
  Menu, 
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            ElectroShop
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-blue-600 transition-colors">
              Shop
            </Link>
            <Link to="/categories" className="text-gray-800 hover:text-blue-600 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-800 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="text-gray-800 hover:text-blue-600 transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/account" className="text-gray-800 hover:text-blue-600 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="text-gray-800 hover:text-blue-600 transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col mt-4 pb-4 space-y-4">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;