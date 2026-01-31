import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="category-card animate-fade-in"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="category-card-overlay" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
        <span className="text-white font-semibold text-sm md:text-base leading-tight">
          {category.productCount} {category.name}
        </span>
      </div>
    </Link>
  );
}
