import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Home/Hero';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Categories from '../components/Home/Categories';
import Newsletter from '../components/Home/Newsletter';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts products={products} />
      <Categories />
      <Newsletter />
    </Layout>
  );
};

export default HomePage;