import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  RefreshCw, 
  Shield, 
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Rating from '../components/UI/Rating';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const incrementQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <ChevronRight className="mx-2 text-gray-400" size={16} />
          <Link to="/products" className="text-gray-500 hover:text-blue-600">Products</Link>
          <ChevronRight className="mx-2 text-gray-400" size={16} />
          <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-blue-600">{product.category}</Link>
          <ChevronRight className="mx-2 text-gray-400" size={16} />
          <span className="text-gray-800">{product.name}</span>
        </nav>
        
        {/* Product Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Rating value={product.rating} />
                <span className="text-gray-500">|</span>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="prose prose-lg text-gray-700 mb-8">
                <p>{product.description}</p>
              </div>
            </div>
            
            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="w-10 h-10 rounded-l border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-r border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                variant="primary" 
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                className="flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                fullWidth
                className="flex items-center justify-center"
              >
                <Heart size={20} className="mr-2" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Truck className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                  <p className="text-gray-700">Free shipping on orders over $50</p>
                </div>
                <div className="flex items-start">
                  <RefreshCw className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                  <p className="text-gray-700">30-day return policy</p>
                </div>
                <div className="flex items-start">
                  <Shield className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={18} />
                  <p className="text-gray-700">1-year warranty included</p>
                </div>
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center mt-6">
              <span className="text-gray-700 mr-3">Share:</span>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;