import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { FilterTabs } from '@/components/FilterTabs';
import { Button } from '@/components/ui/button';
import { categories, products } from '@/data/mockData';
import { FilterType } from '@/types';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('newest');

  const filteredProducts = useMemo(() => {
    const sorted = [...products];
    switch (activeFilter) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return sorted.sort((a, b) => (b.saves || 0) - (a.saves || 0));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'random':
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted;
    }
  }, [activeFilter]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Discover Something Unique
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Find Products You'll{' '}
              <span className="text-primary">Actually Love</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Curated collection of unique gadgets, gifts, and must-haves. From tech treasures to lifestyle essentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="btn-primary w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" className="btn-outline w-full sm:w-auto">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container-main py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Popular Categories
          </h2>
          <Link to="/categories" className="text-primary font-medium text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="container-main py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Trending Products
          </h2>
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products">
            <Button variant="outline" className="btn-outline">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary/5 py-16 mt-12">
        <div className="container-main">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground mb-6">
              Get notified about new arrivals, exclusive deals, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-search flex-1"
              />
              <Button className="btn-primary whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
