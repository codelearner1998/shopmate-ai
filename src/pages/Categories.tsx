import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/data/mockData';

export default function Categories() {
  return (
    <div className="container-main py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Shop by Category
        </h1>
        <p className="text-muted-foreground">
          Browse our curated collection of unique products
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
