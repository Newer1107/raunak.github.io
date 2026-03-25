import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    
    // Fallback for slower rendering/browser restoration
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTopRoute;
