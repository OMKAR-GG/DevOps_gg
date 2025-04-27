import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Rating from '../UI/Rating';
import Button from '../UI/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Product Image with Overlay */}
      <Link to={`/product/${product.id}`} className="relative">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 flex items-center justify-center">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Heart size={18} className="text-gray-800" />
            </button>
          </div>
        </div>
        
        {/* Badge for featured products */}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Featured
          </div>
        )}
        
        {/* Stock indicator */}
        {product.stock <= 5 && (
          <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Only {product.stock} left
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/product/${product.id}`} className="block mb-1">
          <h3 className="text-base font-medium text-gray-800 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-2">
          <Rating value={product.rating} />
        </div>
        
        <span className="text-lg font-semibold text-blue-600 mb-4">
          ${product.price.toFixed(2)}
        </span>
        
        <div className="mt-auto">
          <Button
            variant="primary"
            fullWidth
            className="flex items-center justify-center"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;