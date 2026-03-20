import React, { useEffect, useState } from 'react';
import './ForceLandscapeWrapper.scss';

interface ForceLandscapeWrapperProps {
  children: React.ReactNode;
  showNotification?: boolean;
}

const ForceLandscapeWrapper: React.FC<ForceLandscapeWrapperProps> = ({ 
  children, 
  showNotification = true 
}) => {
  const [shouldRotate, setShouldRotate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width <= 768;
      const isPortrait = height > width;
      
      const needsRotation = isMobile && isPortrait;
      setShouldRotate(needsRotation);
      
      // Hiển thị thông báo khi rotate
      if (needsRotation && showNotification) {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    };

    // Check ngay khi mount
    checkOrientation();

    // Listen resize và orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [showNotification]);

  return (
    <>
      <div className={`landscape-wrapper ${shouldRotate ? 'landscape-wrapper--rotated' : ''}`}>
        {children}
      </div>
      
      {showMessage && shouldRotate && (
        <div className="landscape-notification">
          <svg 
            className="landscape-notification__icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          <span>Giao diện đã được tối ưu cho chế độ ngang</span>
        </div>
      )}
    </>
  );
};

export default ForceLandscapeWrapper;
