import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-main py-16 animate-fade-in">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button className="btn-primary">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-card rounded-xl p-4 shadow-card flex gap-4">
              {/* Image */}
              <Link to={`/product/${item.product.id}`} className="shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
                    {item.product.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{item.product.category}</p>
                
                <div className="flex items-center justify-between mt-4">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Price and remove */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
            <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{totalPrice >= 50 ? 'Free' : '$5.99'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">
                  ${(totalPrice + (totalPrice >= 50 ? 0 : 5.99) + totalPrice * 0.08).toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/checkout">
              <Button className="btn-primary w-full">
                Proceed to Checkout
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
