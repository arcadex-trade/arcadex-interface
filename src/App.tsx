import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { WalletProvider } from './wallet';
import { Home, Exchange, Cover, Portfolio, Rewards, Referral, Docs, ComingSoon } from './pages';
import { NavBar } from './components/layout';
import { colors } from './theme';
import './styles/globals.css';

// TEMPORARY: Set to true to show coming soon page, false to show normal site
const SHOW_COMING_SOON = true;

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div style={{
      height: '100vh',
      backgroundColor: colors.mainBackgroundColor,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <NavBar transparent={isHomePage} />
      
      <div style={{ 
        flex: 1, 
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/markets" element={<Exchange />} />
          <Route path="/vault" element={<Cover />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/settings" element={<div style={{ padding: 'clamp(1rem, 3vw, 2rem)', color: colors.mainTextColor, backgroundColor: colors.mainBackgroundColor, height: '100%' }}><h1>Settings Page</h1><p>Coming soon</p></div>} />
          <Route path="/support" element={<div style={{ padding: 'clamp(1rem, 3vw, 2rem)', color: colors.mainTextColor, backgroundColor: colors.mainBackgroundColor, height: '100%' }}><h1>Support Page</h1><p>Coming soon</p></div>} />
          <Route path="/about" element={<div style={{ padding: 'clamp(1rem, 3vw, 2rem)', color: colors.mainTextColor, backgroundColor: colors.mainBackgroundColor, height: '100%' }}><h1>About Page</h1><p>Coming soon</p></div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [hasAccess, setHasAccess] = useState(false);
  
  // TEMPORARY: If coming soon is enabled and no access granted, show only that page
  if (SHOW_COMING_SOON && !hasAccess) {
    return (
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="*" element={<ComingSoon onAccessGranted={() => setHasAccess(true)} />} />
          </Routes>
        </Router>
      </WalletProvider>
    );
  }

  return (
    <WalletProvider>
      <Router>
        <AppContent />
      </Router>
    </WalletProvider>
  );
}

export default App;