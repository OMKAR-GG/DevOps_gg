import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../Product/ProductGrid';
import { Product } from '../../types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  // Filter for featured products
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-2">Explore our handpicked selection of premium gadgets</p>
          </div>
          
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View All Products
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} columns={3} />
      </div>
    </section>
  );
};

export default FeaturedProducts;