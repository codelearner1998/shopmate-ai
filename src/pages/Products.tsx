import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { FilterTabs } from '@/components/FilterTabs';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/data/mockData';
import { FilterType } from '@/types';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeFilter, setActiveFilter] = useState<FilterType>('newest');
  const selectedCategory = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort by filter
    switch (activeFilter) {
      case 'newest':
        return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return result.sort((a, b) => (b.saves || 0) - (a.saves || 0));
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'random':
        return result.sort(() => Math.random() - 0.5);
      default:
        return result;
    }
  }, [searchQuery, activeFilter, selectedCategory]);

  return (
    <div className="container-main py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          {selectedCategory || 'All Products'}
        </h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter tabs */}
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => window.history.pushState({}, '', '/products')}
          className={`filter-tab ${!selectedCategory ? 'filter-tab-active' : 'filter-tab-inactive'}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => window.history.pushState({}, '', `/products?category=${encodeURIComponent(category.name)}`)}
            className={`filter-tab ${selectedCategory === category.name ? 'filter-tab-active' : 'filter-tab-inactive'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
