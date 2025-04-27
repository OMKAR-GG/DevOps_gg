import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  const incrementQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
        <div className="text-blue-600 font-semibold mt-1">${product.price.toFixed(2)}</div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center">
        <button 
          onClick={decrementQuantity}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-10 text-center">{quantity}</span>
        
        <button 
          onClick={incrementQuantity}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Plus size={16} />
        </button>
      </div>
      
      {/* Subtotal */}
      <div className="ml-6 text-right w-24">
        <div className="font-semibold">
          ${(product.price * quantity).toFixed(2)}
        </div>
      </div>
      
      {/* Remove Button */}
      <button 
        onClick={() => removeFromCart(product.id)}
        className="ml-4 text-gray-500 hover:text-red-600 focus:outline-none"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default CartItem;