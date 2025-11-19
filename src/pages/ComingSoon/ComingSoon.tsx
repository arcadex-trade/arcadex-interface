import React, { useState, useRef, useEffect } from 'react';
import { colors, fonts } from '../../theme';
import { API_URL } from '../../../config';

interface ComingSoonProps {
  onAccessGranted: () => void;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ onAccessGranted }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [dots, setDots] = useState<Array<{ x: number; y: number; opacity: number }>>([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Rotating text messages
  const rotatingTexts = [
    'developing smart contracts',
    'building interface',
    'creating escrow logic',
    'fetching real-time data',
    'implementing risk management',
    'optimizing gas efficiency',
    'integrating oracles',
    'designing trading algorithms',
    'securing user funds',
    'testing protocol stability'
  ];
  
  // Rotate text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  // Generate random dots on mount
  useEffect(() => {
    const generatedDots = [];
    const spacing = 12; // Grid spacing in pixels
    const cols = Math.ceil(window.innerWidth / spacing);
    const rows = Math.ceil(window.innerHeight / spacing);
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing;
        const y = j * spacing;
        
        // Calculate distance from bottom right corner
        const distanceX = screenWidth - x;
        const distanceY = screenHeight - y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Calculate base opacity based on distance (fades out with distance)
        const maxDistance = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight) * 0.7;
        let baseOpacity = Math.max(0, 1 - (distance / maxDistance));
        
        // Apply random factor to the base opacity
        const randomFactor = Math.random() * 0.6; // Random multiplier
        const finalOpacity = baseOpacity * randomFactor;
        
        if (finalOpacity > 0.02) { // Only add dots that will be visible
          generatedDots.push({
            x,
            y,
            opacity: finalOpacity
          });
        }
      }
    }
    
    setDots(generatedDots);
  }, []);
  
  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0a0a0e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '0.25rem',
    background: `
      radial-gradient(circle at 100% 100%, 
        rgba(248, 113, 113, 0.25) 0%, 
        rgba(248, 113, 113, 0.15) 20%, 
        rgba(248, 113, 113, 0.08) 40%, 
        #0a0a0e 70%
      ),
      #0a0a0e
    `,
  };

  const lockIconStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: '2rem',
    left: '2rem',
    width: '48px',
    height: '48px',
    borderRadius: '0',
    backgroundColor: '#0a0a0e',
    border: '1px solid rgba(136, 136, 136, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.secondaryTextColor,
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    zIndex: 10,
  };

  const popupOverlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isPopupOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const popupContentStyles: React.CSSProperties = {
    backgroundColor: '#0a0a0e',
    border: `1px solid rgba(248, 150, 150, 0.5)`,
    borderRadius: '0',
    padding: '2.5rem',
    minWidth: '350px',
    maxWidth: '450px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const popupTitleStyles: React.CSSProperties = {
    fontFamily: '"Inter", "Helvetica Neue", "Roboto", system-ui, sans-serif',
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    color: '#FFFFFF',
    margin: 0,
  };

  const popupTextStyles: React.CSSProperties = {
    fontFamily: '"Inter", "Helvetica Neue", "Roboto", system-ui, sans-serif',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    fontWeight: 400,
    letterSpacing: '0.01em',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0,
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0',
    color: '#FFFFFF',
    fontFamily: '"Inter", "Helvetica Neue", "Roboto", system-ui, sans-serif',
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 400,
    letterSpacing: '0.02em',
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const handleLockClick = () => {
    setIsPopupOpen(true);
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      setError('Please enter a password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/api/validate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Grant access without caching
        onAccessGranted();
        setIsPopupOpen(false);
      } else {
        setError(data.message || 'Incorrect password');
        setPassword('');
      }
    } catch (err) {
      setError('Error connecting to server. Make sure the backend is running.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopupOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const textStyles: React.CSSProperties = {
    ...fonts.bodyText,
    color: 'rgba(255, 255, 255, 0.8)',
  };

  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '1.25rem 3rem',
    background: '#0a0a0e',
    color: '#FFFFFF',
    ...fonts.buttonLarge,
    borderRadius: '0',
    border: '1px solid transparent',
    backgroundImage: `linear-gradient(#0a0a0e, #0a0a0e), linear-gradient(90deg, rgba(248, 150, 150, 1) 0%, ${colors.mainAccentColor} 75%)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const descriptionStyles: React.CSSProperties = {
    fontFamily: '"Inter", "Helvetica Neue", "Roboto", system-ui, sans-serif',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: 1.4,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: '1.5rem',
  };

  const handleXClick = () => {
    window.open('https://x.com/arcadextrade', '_blank');
  };

  return (
    <div style={containerStyles}>
      {/* Random dot overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        {dots.map((dot, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: '1px',
              height: '1px',
              backgroundColor: 'white',
              opacity: dot.opacity,
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* Header with logo banner */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 3vh, 2.5rem) clamp(2rem, 4vw, 3rem)',
        zIndex: 100,
      }}>
        <img 
          src="/icons/Alogo.png" 
          alt="Arcadex Logo" 
          style={{
            width: 'clamp(200px, 30vw, 500px)',
            height: 'auto',
          }}
        />
      </div>

      {/* Left side content - Follow button and description */}
      <div style={{
        position: 'fixed',
        left: 'clamp(2rem, 5vw, 4rem)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <p style={descriptionStyles}>
          track protocol development // pre-launch updates
        </p>
        <button
          onClick={handleXClick}
          style={buttonStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <span>Follow us</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>
      </div>

      {/* Bottom Right - Rotating text animation */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        height: '3rem',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxWidth: '400px',
        zIndex: 10,
      }}>
        <style>{`
          @keyframes slideIn {
            0% {
              transform: translateY(100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .rotating-text {
            animation: slideIn 0.5s ease-out;
          }
        `}</style>
        <p 
          key={currentTextIndex}
          className="rotating-text"
          style={{
            ...textStyles,
            margin: 0,
            whiteSpace: 'nowrap',
            textAlign: 'right',
          }}
        >
          {rotatingTexts[currentTextIndex]}
        </p>
      </div>
      
      <div 
        ref={buttonRef}
        onClick={handleLockClick}
        style={lockIconStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(136, 136, 136, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(136, 136, 136, 0.6)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 11H6C4.89543 11 4 11.8954 4 13V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V13C20 11.8954 19.1046 11 18 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Popup Modal */}
      {isPopupOpen && (
        <div style={popupOverlayStyles}>
          <div ref={popupRef} style={popupContentStyles}>
            <h2 style={popupTitleStyles}>Access Required</h2>
            <p style={popupTextStyles}>Enter the password to access Arcadex</p>
            <input
              type="password"
              placeholder="Enter access password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              style={inputStyles}
            />
            {error && (
              <p style={{ 
                color: colors.errorColor, 
                fontFamily: '"Inter", "Helvetica Neue", "Roboto", system-ui, sans-serif',
                fontSize: '0.875rem', 
                fontWeight: 500,
                margin: 0 
              }}>
                {error}
              </p>
            )}
            <button
              onClick={handlePasswordSubmit}
              disabled={isLoading}
              style={{
                padding: '1rem 2rem',
                background: isLoading ? 'rgba(255, 255, 255, 0.1)' : '#0a0a0e',
                color: '#FFFFFF',
                border: '1px solid transparent',
                backgroundImage: isLoading ? 'none' : `linear-gradient(#0a0a0e, #0a0a0e), linear-gradient(90deg, rgba(248, 150, 150, 1) 0%, ${colors.mainAccentColor} 75%)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                borderRadius: '0',
                fontFamily: '"Inter", "Helvetica Neue", "Roboto", system-ui, sans-serif',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? 'Validating...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

