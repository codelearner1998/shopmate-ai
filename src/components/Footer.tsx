import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <>
      {/* Floating contact button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 px-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg z-40"
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        Contact Us
      </Button>

      <footer className="bg-card border-t border-border mt-16">
        <div className="container-main py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-xl font-display font-bold text-primary mb-4">DropShop</h2>
              <p className="text-sm text-muted-foreground">
                Discover unique products at unbeatable prices. Your one-stop shop for everything cool.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
                <li><Link to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
                <li><Link to="/products?filter=deals" className="text-sm text-muted-foreground hover:text-primary transition-colors">Deals</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
                <li><Link to="/signup" className="text-sm text-muted-foreground hover:text-primary transition-colors">Register</Link></li>
                <li><Link to="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">Track Order</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 DropShop. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
