import { useEffect, useState } from 'react';

interface UseForceLandscapeReturn {
  shouldRotate: boolean;
  isMobile: boolean;
  isPortrait: boolean;
}

/**
 * Custom hook để detect xem có cần rotate UI không
 * @returns Object chứa thông tin về orientation và device
 */
export const useForceLandscape = (): UseForceLandscapeReturn => {
  const [shouldRotate, setShouldRotate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width <= 768;
      const portrait = height > width;
      
      setIsMobile(mobile);
      setIsPortrait(portrait);
      setShouldRotate(mobile && portrait);
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return { shouldRotate, isMobile, isPortrait };
};
