import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="card-product group animate-fade-in">
      {/* Image container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isSale && (
            <span className="badge-save">Save</span>
          )}
          {product.isNew && (
            <span className="badge-new">New</span>
          )}
        </div>

        {/* Wishlist button */}
        <button 
          className="absolute top-3 left-3 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to wishlist
          }}
        >
          <Heart className="h-4 w-4 text-foreground" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {product.description}
        </p>

        {/* Price and actions */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="price-old">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </div>

        {/* Saves count */}
        {product.saves && (
          <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
            <Heart className="h-3 w-3" />
            <span>{product.saves} saves</span>
          </div>
        )}
      </div>
    </article>
  );
}
