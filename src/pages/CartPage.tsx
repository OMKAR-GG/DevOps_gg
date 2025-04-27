import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import CartItem from '../components/Cart/CartItem';
import Button from '../components/UI/Button';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex flex-col items-center justify-center">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
                <button 
                  onClick={clearCart}
                  className="text-red-600 flex items-center hover:text-red-800 transition-colors"
                >
                  <Trash2 size={18} className="mr-1" />
                  Clear All
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/products">
                <Button variant="outline" className="flex items-center">
                  <ArrowRight size={18} className="mr-2 rotate-180" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button variant="primary" fullWidth size="lg" className="flex items-center justify-center">
                  Proceed to Checkout
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              
              {/* Payment methods */}
              <div className="mt-6">
                <p className="text-gray-600 text-sm mb-2">Secure Checkout</p>
                <div className="flex justify-between">
                  <div className="flex space-x-2 text-gray-500 text-sm">
                    <span>Visa</span>
                    <span>Mastercard</span>
                    <span>PayPal</span>
                    <span>Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;