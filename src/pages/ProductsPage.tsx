import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import Layout from '../components/Layout';
import ProductGrid from '../components/Product/ProductGrid';
import Button from '../components/UI/Button';
import { products, categories } from '../data/products';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  const handleMinPriceChange = (value: number) => {
    setPriceRange([value, priceRange[1]]);
  };
  
  const handleMaxPriceChange = (value: number) => {
    setPriceRange([priceRange[0], value]);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 2000]);
    setSortOption('');
  };
  
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'price-low-to-high':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-to-low':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-a-z':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-z-a':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating-high-to-low':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortOption]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Browse our collection of premium electronics and tech gadgets</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* Filters sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Filter size={20} className="mr-2" />
                  Filters
                </h2>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset All
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Min Price: ${priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Max Price: ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="lg:w-3/4">
            {/* Sort dropdown */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing {filteredProducts.length} products</p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Featured</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                  <option value="rating-high-to-low">Rating: High to Low</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;