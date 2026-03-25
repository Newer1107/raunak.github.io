import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, []);
};
