import React, { useState, useEffect, useRef } from 'react';
import { colors, fonts } from '../../theme';
import { TradingViewChart, TradingDashboard } from '../../components/features';

// Solana Icon Component
const SolIcon: React.FC<{ width?: string; height?: string; style?: React.CSSProperties }> = ({ 
  width = '1rem', 
  height = '1rem', 
  style 
}) => {
  // Generate unique ID for gradient to avoid conflicts
  const gradientIdRef = useRef(`sol-gradient-${Math.random().toString(36).substr(2, 9)}`);
  const gradientId = gradientIdRef.current;
  
  return (
    <svg 
      viewBox="0 0 101 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        width: width, 
        height: height, 
        flexShrink: 0, 
        ...style 
      }}
    >
      <path d="M100.48 69.3817L83.8068 86.8015C83.4444 87.1799 83.0058 87.4816 82.5185 87.6878C82.0312 87.894 81.5055 88.0003 80.9743 88H1.93563C1.55849 88 1.18957 87.8926 0.874202 87.6912C0.558829 87.4897 0.31074 87.2029 0.160416 86.8659C0.0100923 86.529 -0.0359181 86.1566 0.0280382 85.7945C0.0919944 85.4324 0.263131 85.0964 0.520422 84.8278L17.2061 67.408C17.5676 67.0306 18.0047 66.7295 18.4904 66.5234C18.9762 66.3172 19.5002 66.2104 20.0301 66.2095H99.0644C99.4415 66.2095 99.8104 66.3169 100.126 66.5183C100.441 66.7198 100.689 67.0067 100.84 67.3436C100.99 67.6806 101.036 68.0529 100.972 68.415C100.908 68.7771 100.737 69.1131 100.48 69.3817ZM83.8068 34.3032C83.4444 33.9248 83.0058 33.6231 82.5185 33.4169C82.0312 33.2108 81.5055 33.1045 80.9743 33.1048H1.93563C1.55849 33.1048 1.18957 33.2121 0.874202 33.4136C0.558829 33.6151 0.31074 33.9019 0.160416 34.2388C0.0100923 34.5758 -0.0359181 34.9482 0.0280382 35.3103C0.0919944 35.6723 0.263131 36.0083 0.520422 36.277L17.2061 53.6968C17.5676 54.0742 18.0047 54.3752 18.4904 54.5814C18.9762 54.7875 19.5002 54.8944 20.0301 54.8952H99.0644C99.4415 54.8952 99.8104 54.7879 100.126 54.5864C100.441 54.3849 100.689 54.0981 100.84 53.7612C100.99 53.4242 101.036 53.0518 100.972 52.6897C100.908 52.3277 100.737 51.9917 100.48 51.723L83.8068 34.3032ZM1.93563 21.7905H80.9743C81.5055 21.7907 82.0312 21.6845 82.5185 21.4783C83.0058 21.2721 83.4444 20.9704 83.8068 20.592L100.48 3.17219C100.737 2.90357 100.908 2.56758 100.972 2.2055C101.036 1.84342 100.99 1.47103 100.84 1.13408C100.689 0.79713 100.441 0.510296 100.126 0.308823C99.8104 0.107349 99.4415 1.24074e-05 99.0644 0L20.0301 0C19.5002 0.000878397 18.9762 0.107699 18.4904 0.313848C18.0047 0.519998 17.5676 0.821087 17.2061 1.19848L0.524723 18.6183C0.267681 18.8866 0.0966198 19.2223 0.0325185 19.5839C-0.0315829 19.9456 0.0140624 20.3177 0.163856 20.6545C0.31365 20.9913 0.561081 21.2781 0.875804 21.4799C1.19053 21.6817 1.55886 21.7896 1.93563 21.7905Z" fill={`url(#${gradientId})`}/>
      <defs>
        <linearGradient id={gradientId} x1="8.52558" y1="90.0973" x2="88.9933" y2="-3.01622" gradientUnits="userSpaceOnUse">
          <stop offset="0.08" stopColor="#9945FF"/>
          <stop offset="0.3" stopColor="#8752F3"/>
          <stop offset="0.5" stopColor="#5497D5"/>
          <stop offset="0.6" stopColor="#43B4CA"/>
          <stop offset="0.72" stopColor="#28E0B9"/>
          <stop offset="0.97" stopColor="#19FB9B"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

interface MemecoinPair {
  name: string;
  symbol: string;
  display: string;
  logo: string;
}

const MEMECOIN_PAIRS: MemecoinPair[] = [
  { name: "WIF", symbol: "BINANCE:WIFUSDT", display: "WIFUSDT", logo: "https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg" },
  { name: "BONK", symbol: "BINANCE:BONKUSDT", display: "BONKUSDT", logo: "https://assets.coingecko.com/coins/images/28600/small/bonk.jpg" },
  { name: "POPCAT", symbol: "BYBIT:POPCATUSDT", display: "POPCATUSDT", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/28782.png" },
  { name: "PNUT", symbol: "BINANCE:PNUTUSDT", display: "PNUTUSDT", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/33788.png" },
  { name: "MOODENG", symbol: "OKX:MOODENGUSDT", display: "MOODENGUSDT", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/33093.png" },
  { name: "FARTCOIN", symbol: "GATEIO:FARTCOINUSDT", display: "FARTCOINUSDT", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/33597.png" },
  { name: "TROLL", symbol: "MEXC:TROLLUSDT", display: "TROLLUSDT", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/36313.png" }
];

interface TickerItem {
  symbol: string; // Unique identifier for backend mapping (e.g., "WIF", "BONK")
  name: string;
  price: number;
  change24h: number;
}

interface OpenPosition {
  id: string;
  token: MemecoinPair;
  strikePrice: number;
  contractType: 'CALL' | 'PUT';
  expiryDate: Date;
  premiumPaid: number; // in SOL
  currentValue: number; // in SOL
  isITM: boolean; // In The Money
}

export const Exchange: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<MemecoinPair>(MEMECOIN_PAIRS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(2.45); // Mock WIF price ~$2.45 - should come from API/oracle
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isMobileView = windowWidth <= 800; // Hide chart/positions below 800px
  
  // Ticker data - structured by symbol for easy backend mapping
  const [tickerData, setTickerData] = useState<Record<string, TickerItem>>({});

  // Mock open positions data
  // Note: For CALL options, ITM means current price > strike price
  // ITM positions should have currentValue > premiumPaid (positive P&L)
  // OTM positions can have currentValue < premiumPaid (negative P&L) due to time decay
  const [openPositions] = useState<OpenPosition[]>([
    {
      id: '1',
      token: MEMECOIN_PAIRS[0], // WIF
      strikePrice: 2.20, // Strike price $2.20, current WIF ~$2.45 (ITM)
      contractType: 'CALL',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      premiumPaid: 0.35, // Premium paid in SOL (~$0.35)
      currentValue: 0.52, // Current value in SOL (~$0.52) - ITM with positive P&L
      isITM: true
    },
    {
      id: '2',
      token: MEMECOIN_PAIRS[1], // BONK
      strikePrice: 0.001,
      contractType: 'CALL',
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000), // 1.5 days from now
      premiumPaid: 2.6805,
      currentValue: 2.5298, // OTM position with negative P&L (time decay)
      isITM: false
    },
    {
      id: '3',
      token: MEMECOIN_PAIRS[2], // POPCAT
      strikePrice: 0.8,
      contractType: 'CALL',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      premiumPaid: 0.5234,
      currentValue: 0.6789, // ITM position with positive P&L
      isITM: true
    },
    {
      id: '4',
      token: MEMECOIN_PAIRS[3], // PNUT
      strikePrice: 0.003,
      contractType: 'CALL',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 3.25 days from now
      premiumPaid: 0.8234,
      currentValue: 0.9123, // ITM position with positive P&L
      isITM: true
    }
  ]);

  // Helper function to format contract name
  const formatContractName = (position: OpenPosition): string => {
    const month = position.expiryDate.getMonth() + 1;
    const day = position.expiryDate.getDate();
    return `${position.token.name} $${position.strikePrice.toFixed(2)} ${position.contractType} ${month}/${day}`;
  };

  // Countdown timer function
  const getTimeUntilExpiry = (expiryDate: Date): string => {
    const diff = expiryDate.getTime() - currentTime.getTime();
    
    if (diff <= 0) {
      return 'Expired';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  // Helper function to calculate PnL
  const calculatePnL = (position: OpenPosition): { value: number; percentage: number } => {
    const pnl = position.currentValue - position.premiumPaid;
    const percentage = ((pnl / position.premiumPaid) * 100);
    return { value: pnl, percentage };
  };

  // State for countdown timer
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize ticker data with mock prices - structured by symbol
  // In production, this would be: setTickerData(await fetchMarketData())
  useEffect(() => {
    const initialData: Record<string, TickerItem> = {};
    
    MEMECOIN_PAIRS.forEach(pair => {
      // Set realistic prices for each token
      let basePrice = 1.0;
      let baseChange = 0;
      
      if (pair.name === 'WIF') {
        basePrice = 2.45; // WIF current price ~$2.45
        baseChange = 3.2; // +3.2% 24h change
      } else if (pair.name === 'BONK') {
        basePrice = 0.000012; // BONK price
        baseChange = -1.5;
      } else if (pair.name === 'POPCAT') {
        basePrice = 1.85;
        baseChange = 5.8;
      } else if (pair.name === 'PNUT') {
        basePrice = 0.0045;
        baseChange = -2.3;
      } else if (pair.name === 'MOODENG') {
        basePrice = 0.0008;
        baseChange = 4.1;
      } else if (pair.name === 'FARTCOIN') {
        basePrice = 0.00015;
        baseChange = -0.8;
      } else if (pair.name === 'TROLL') {
        basePrice = 0.00025;
        baseChange = 2.7;
      }
      
      initialData[pair.name] = {
        symbol: pair.name, // Use as key for easy backend mapping
        name: pair.name,
        price: basePrice * (0.99 + Math.random() * 0.02), // Small variation around base price
        change24h: baseChange + (Math.random() * 2 - 1), // Small variation around base change
      };
    });
    
    setTickerData(initialData);
    
    // Update ticker prices periodically
    // In production: fetchMarketData() would update this
    const interval = setInterval(() => {
      setTickerData(prev => {
        const updated: Record<string, TickerItem> = {};
        MEMECOIN_PAIRS.forEach(pair => {
          updated[pair.name] = {
            ...prev[pair.name],
            price: (prev[pair.name]?.price || 1) * (0.98 + Math.random() * 0.04),
            change24h: (Math.random() * 20) - 10,
          };
        });
        return updated;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Example function structure for backend integration:
  // const updateTickerData = async () => {
  //   const marketData = await fetch('/api/market-data'); // Backend endpoint
  //   const updated: Record<string, TickerItem> = {};
  //   marketData.forEach((item: { symbol: string; price: number; change24h: number }) => {
  //     updated[item.symbol] = {
  //       symbol: item.symbol,
  //       name: item.symbol,
  //       price: item.price,
  //       change24h: item.change24h,
  //     };
  //   });
  //   setTickerData(updated);
  // };

  // Mock price fetching - replace with actual API call
  useEffect(() => {
    // In production, fetch real price from oracle/API
    // Set realistic price based on selected token
    let basePrice = 2.45; // Default to WIF price
    
    if (selectedToken.name === 'WIF') {
      basePrice = 2.45;
    } else if (selectedToken.name === 'BONK') {
      basePrice = 0.000012;
    } else if (selectedToken.name === 'POPCAT') {
      basePrice = 1.85;
    } else if (selectedToken.name === 'PNUT') {
      basePrice = 0.0045;
    } else if (selectedToken.name === 'MOODENG') {
      basePrice = 0.0008;
    } else if (selectedToken.name === 'FARTCOIN') {
      basePrice = 0.00015;
    } else if (selectedToken.name === 'TROLL') {
      basePrice = 0.00025;
    }
    
    setCurrentPrice(basePrice);
    
    // Simulate price updates every 5 seconds with realistic small variations
    const interval = setInterval(() => {
      const variation = 0.98 + Math.random() * 0.04; // ±2% variation
      setCurrentPrice(prev => prev * variation);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [selectedToken]);

  const handleBuyContract = (contractId: string) => {
    // This will be called when user clicks buy
    // In production, this would:
    // 1. Check wallet connection
    // 2. Show transaction details
    // 3. Sign transaction on Solana
    // 4. Send contract ID to backend/Solana program
    console.log('Buying contract:', contractId);
    // TODO: Implement wallet integration and Solana transaction
  };

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  return (
    <div style={{
      color: colors.mainTextColor,
      height: '100%',
      backgroundColor: colors.mainBackgroundColor,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Ticker Tape Strip - Hidden on mobile */}
      {!isMobileView && (
        <div style={{
          height: 'clamp(1.5rem, 4vh, 2rem)',
          backgroundColor: colors.mainSectionColor,
          borderTop: `1px solid ${colors.mainBorderColor}`,
          borderBottom: `1px solid ${colors.mainBorderColor}`,
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0
        }}>
          <style>{`
            @keyframes ticker-scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .ticker-content {
              display: inline-flex;
              animation: ticker-scroll 60s linear infinite;
              white-space: nowrap;
            }
            .ticker-content:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            overflow: 'hidden'
          }}>
            <div className="ticker-content" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}>
              {/* Duplicate content for seamless loop - iterate through pairs in order */}
              {[...MEMECOIN_PAIRS, ...MEMECOIN_PAIRS].map((pair, index) => {
                const tickerItem = tickerData[pair.name];
                if (!tickerItem) return null; // Skip if data not loaded yet
                
                return (
                  <div
                    key={`${pair.name}-${index}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      ...fonts.smallText,
                    }}
                  >
                    <span style={{
                      color: colors.mainTextColor,
                    }}>
                      ${tickerItem.name}
                    </span>
                    <span style={{
                      color: colors.secondaryTextColor,
                    }}>
                      ${tickerItem.price.toFixed(4)}
                    </span>
                    <span style={{
                      color: tickerItem.change24h >= 0 ? colors.successColor : colors.mainAccentColor,
                    }}>
                      {tickerItem.change24h >= 0 ? '+' : ''}{tickerItem.change24h.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        minHeight: 0,
        flexWrap: isMobileView ? 'wrap' : 'nowrap', // Allow wrapping on mobile
        flexDirection: isMobileView ? 'column' : 'row' // Stack vertically on mobile
      }}>
        {/* Left Side - Asset Info Bar (always visible), Chart and Bottom Panel (hidden on mobile) */}
        <div style={{
          flex: isMobileView ? '0 0 auto' : '1 1 400px',
          minWidth: isMobileView ? '100%' : '320px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          width: isMobileView ? '100%' : 'auto'
        }}>
          {/* Top Asset Info Bar - Always visible */}
          <div style={{
            height: 'clamp(3.5rem, 9vh, 4.5rem)',
            backgroundColor: colors.mainSectionColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
            flexShrink: 0,
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            flexWrap: 'wrap'
          }}>
            {/* Left Section: Icon + Asset Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              flexShrink: 0,
              minWidth: 0
            }}>
              {/* Token Logo */}
              <img 
                src={selectedToken.logo} 
                alt={selectedToken.name}
                style={{
                  width: 'clamp(2rem, 5vw, 2.5rem)',
                  height: 'clamp(2rem, 5vw, 2.5rem)',
                  borderRadius: '50%',
                  border: `0.5px solid ${colors.mainBorderColor}`,
                  flexShrink: 0,
                  objectFit: 'cover'
                }}
              />

              {/* Asset Dropdown */}
              <div 
                ref={dropdownRef}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: 0
                }}>
                {/* Clickable Asset Name */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    ...fonts.dataDisplay,
                    backgroundColor: 'transparent',
                    color: colors.mainTextColor,
                    border: 'none',
                    padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(1.5rem, 3vw, 2rem) clamp(0.25rem, 1vw, 0.5rem) 0',
                    cursor: 'pointer',
                    outline: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.5rem, 1vw, 0.75rem)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.mainAccentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.mainTextColor;
                  }}
                >
                  {selectedToken.display}
                  <svg 
                    style={{ 
                      width: 'clamp(0.6rem, 1.5vw, 0.75rem)', 
                      height: 'clamp(0.6rem, 1.5vw, 0.75rem)', 
                      color: colors.secondaryTextColor,
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                    viewBox="0 0 24 24" 
                    fill="none"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Custom Dropdown Panel */}
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    left: '-1rem',
                    backgroundColor: colors.mainSectionColor,
                    border: `1px solid ${colors.mainBorderColor}`,
                    borderRadius: 0,
                    padding: 'clamp(0.4rem, 0.8vw, 0.5rem)',
                    minWidth: 'clamp(280px, 32vw, 400px)',
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                  }}>
                    {MEMECOIN_PAIRS.map((pair) => (
                      <div
                        key={pair.symbol}
                        onClick={() => {
                          setSelectedToken(pair);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 'clamp(0.4rem, 1vw, 0.55rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                          cursor: 'pointer',
                          borderRadius: 0,
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.2s ease',
                          gap: 'clamp(0.6rem, 1.5vw, 0.8rem)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.inputBackground;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {/* Left: Icon + Name */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                          flex: 1,
                          minWidth: 0
                        }}>
                          {/* Token Logo */}
                          <img 
                            src={pair.logo} 
                            alt={pair.name}
                            style={{
                              width: 'clamp(1.25rem, 3vw, 1.5rem)',
                              height: 'clamp(1.25rem, 3vw, 1.5rem)',
                              borderRadius: '50%',
                              border: `0.5px solid ${colors.mainBorderColor}`,
                              flexShrink: 0,
                              objectFit: 'cover'
                            }}
                          />
                          
                          <span style={{
                            ...fonts.dropdown,
                            color: colors.mainTextColor
                          }}>
                            {pair.display}
                          </span>
                        </div>

                        {/* Right: 24h Change Placeholder */}
                        <div style={{
                          ...fonts.smallText,
                          color: colors.secondaryTextColor,
                          flexShrink: 0
                        }}>
                          {/* Will add 24h change data here */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Market Data Section: Mark, 24h Change, 24h Volume, Market Cap */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
              flexShrink: 0,
              flexWrap: 'wrap'
            }}>
              {/* Mark */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.1rem, 0.3vh, 0.2rem)'
              }}>
                <span style={{
                  fontSize: 'clamp(0.6rem, 1.35vw, 0.7rem)',
                  fontWeight: 500,
                  color: colors.secondaryTextColor,
                }}>
                  Mark
                </span>
                <span style={{
                  fontSize: 'clamp(0.775rem, 1.8vw, 0.925rem)',
                  fontWeight: 600,
                  color: colors.mainTextColor
                }}>
                  0.003959
                </span>
              </div>

              {/* 24h Change */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.1rem, 0.3vh, 0.2rem)'
              }}>
                <span style={{
                  fontSize: 'clamp(0.6rem, 1.35vw, 0.7rem)',
                  fontWeight: 500,
                  color: colors.secondaryTextColor,
                }}>
                  24h Change
                </span>
                <span style={{
                  fontSize: 'clamp(0.775rem, 1.8vw, 0.925rem)',
                  fontWeight: 600,
                  color: colors.mainAccentColor
                }}>
                  -0.000279 / -6.58%
                </span>
              </div>

              {/* 24h Volume */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.1rem, 0.3vh, 0.2rem)'
            }}>
                <span style={{
                  fontSize: 'clamp(0.6rem, 1.35vw, 0.7rem)',
                  fontWeight: 500,
                  color: colors.secondaryTextColor,
                }}>
                  24h Volume
                </span>
                <span style={{
                  fontSize: 'clamp(0.775rem, 1.8vw, 0.925rem)',
                  fontWeight: 600,
                  color: colors.mainTextColor
                }}>
                  $105,166,165.76
                </span>
              </div>

              {/* Market Cap */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.1rem, 0.3vh, 0.2rem)'
              }}>
                <span style={{
                  fontSize: 'clamp(0.6rem, 1.35vw, 0.7rem)',
                  fontWeight: 500,
                  color: colors.secondaryTextColor,
                }}>
                  Market Cap
                </span>
                <span style={{
                  fontSize: 'clamp(0.775rem, 1.8vw, 0.925rem)',
                  fontWeight: 600,
                  color: colors.mainTextColor
                }}>
                  $425,728,391.42
                </span>
              </div>
            </div>
          </div>

          {/* Chart Area - Hidden on mobile */}
          {!isMobileView && (
            <div style={{
              flex: 1,
              minHeight: 0,
              backgroundColor: colors.mainSectionColor,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <TradingViewChart 
                symbol={selectedToken.symbol}
                interval="15"
                theme="dark"
                containerId="exchange-chart"
              />
            </div>
          )}

          {/* Bottom Positions/Info Panel - Hidden on mobile */}
          {!isMobileView && (
            <div style={{
              height: 'clamp(10rem, 25vh, 14rem)',
              backgroundColor: colors.mainSectionColor,
              borderTop: `1px solid ${colors.mainBorderColor}`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              flexShrink: 0,
              gap: 0
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.2fr',
                gap: 'clamp(0.4rem, 1.2vw, 0.75rem)',
                padding: 'clamp(0.5rem, 1.5vh, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
                backgroundColor: colors.mainSectionColor,
                alignItems: 'center',
                flexShrink: 0,
                margin: 0,
                border: 0
              }}>
                <div style={{
                  fontSize: 'clamp(0.55rem, 1.1vw, 0.65rem)',
                  fontWeight: 600,
                  color: colors.secondaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}>
                  Contract
                </div>
                <div style={{
                  fontSize: 'clamp(0.55rem, 1.1vw, 0.65rem)',
                  fontWeight: 600,
                  color: colors.secondaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Bought
                </div>
                <div style={{
                  fontSize: 'clamp(0.55rem, 1.1vw, 0.65rem)',
                  fontWeight: 600,
                  color: colors.secondaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Status
                </div>
                <div style={{
                  fontSize: 'clamp(0.55rem, 1.1vw, 0.65rem)',
                  fontWeight: 600,
                  color: colors.secondaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Expiry
                </div>
                <div style={{
                  fontSize: 'clamp(0.55rem, 1.1vw, 0.65rem)',
                  fontWeight: 600,
                  color: colors.secondaryTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  PnL
                </div>
              </div>

              {/* Table Body - Scrollable */}
              <div 
                className="positions-table-body"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  margin: 0,
                  padding: 0
                }}
              >
                <style>{`
                  .positions-table-body {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                  .positions-table-body::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                    background: transparent;
                  }
                `}</style>
                {openPositions.length === 0 ? (
                  <div style={{
                    padding: 'clamp(1rem, 3vh, 1.5rem)',
                    textAlign: 'center',
                    color: colors.secondaryTextColor,
                    ...fonts.smallText
                  }}>
                    No open positions
                  </div>
                ) : (
                  openPositions.map((position) => {
                    const pnl = calculatePnL(position);
                    return (
                      <div
                        key={position.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.2fr',
                          gap: 'clamp(0.4rem, 1.2vw, 0.75rem)',
                          padding: 'clamp(0.5rem, 1.5vh, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
                          alignItems: 'center',
                          transition: 'background-color 0.2s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.inputBackground;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {/* Contract */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          gap: 'clamp(0.4rem, 1vw, 0.6rem)'
                        }}>
                          <img
                            src={position.token.logo}
                            alt={position.token.name}
                            style={{
                              width: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                              height: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                              borderRadius: '50%',
                              border: `0.5px solid ${colors.mainBorderColor}`,
                              flexShrink: 0,
                              objectFit: 'cover'
                            }}
                          />
                          <span style={{
                            fontSize: 'clamp(0.6rem, 1.3vw, 0.7rem)',
                            fontWeight: 500,
                            color: colors.mainTextColor
                          }}>
                            {formatContractName(position)}
                          </span>
                        </div>

                        {/* Bought */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 'clamp(0.2rem, 0.6vw, 0.4rem)'
                        }}>
                          <SolIcon 
                            width="clamp(0.7rem, 1.5vw, 0.85rem)"
                            height="clamp(0.7rem, 1.5vw, 0.85rem)"
                          />
                          <span style={{
                            fontSize: 'clamp(0.6rem, 1.3vw, 0.7rem)',
                            fontWeight: 500,
                            color: colors.successColor
                          }}>
                            {position.premiumPaid.toFixed(4)}
                          </span>
                        </div>

                        {/* Status */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{
                            fontSize: 'clamp(0.6rem, 1.3vw, 0.7rem)',
                            fontWeight: 600,
                            color: position.isITM ? colors.successColor : colors.mainAccentColor
                          }}>
                            {position.isITM ? 'ITM' : 'OTM'}
                          </span>
                        </div>

                        {/* Expiry */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{
                            fontSize: 'clamp(0.6rem, 1.3vw, 0.7rem)',
                            fontWeight: 500,
                            fontFamily: 'monospace',
                            color: colors.mainTextColor,
                          }}>
                            {getTimeUntilExpiry(position.expiryDate)}
                          </span>
                        </div>

                        {/* PnL */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.05rem'
                        }}>
                          <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
                            gap: 'clamp(0.2rem, 0.6vw, 0.4rem)'
                          }}>
                            <SolIcon 
                              width="clamp(0.7rem, 1.5vw, 0.85rem)"
                              height="clamp(0.7rem, 1.5vw, 0.85rem)"
                            />
                            <span style={{
                              fontSize: 'clamp(0.6rem, 1.3vw, 0.7rem)',
                              fontWeight: 600,
                              color: pnl.value >= 0 ? colors.successColor : colors.mainAccentColor
                            }}>
                              {pnl.value >= 0 ? '+' : ''}{pnl.value.toFixed(4)}
                            </span>
                          </div>
                          <span style={{
                            fontSize: 'clamp(0.55rem, 1.1vw, 0.65rem)',
                            fontWeight: 500,
                            color: pnl.value >= 0 ? colors.successColor : colors.mainAccentColor,
                            textAlign: 'center'
                          }}>
                            ({pnl.percentage >= 0 ? '+' : ''}{pnl.percentage.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

         {/* Dashboard Panel (Right on desktop, Below asset info on mobile) */}
         <div style={{
           width: isMobileView ? '100%' : 'clamp(320px, 28vw, 450px)',
           minWidth: isMobileView ? '100%' : '320px',
           flex: isMobileView ? '1 1 100%' : '0 0 auto',
           backgroundColor: colors.mainSectionColor,
           borderLeft: isMobileView ? 'none' : `1px solid ${colors.mainBorderColor}`,
           borderTop: isMobileView ? `1px solid ${colors.mainBorderColor}` : 'none',
           display: 'flex',
           flexDirection: 'column',
           overflow: 'hidden',
           minHeight: 0, // Important for flex children
           height: '100%', // Ensure it respects parent height
         }}>
          <TradingDashboard
            selectedAsset={selectedToken.name}
            currentPrice={currentPrice}
            priceChange24h={-5.5} // TODO: Get from actual API/oracle
            onBuyContract={handleBuyContract}
          />
        </div>
      </div>
    </div>
  );
};

