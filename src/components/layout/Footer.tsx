import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {currentYear} Artisan Baking Dashboard. All rights reserved.
        </p>
        <nav className="relative flex gap-4 sm:gap-6">
          <Link to="/#" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
          <Link to="/#" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;