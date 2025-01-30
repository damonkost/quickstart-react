import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const DEFAULT_LOGO_PATH = '/images/default-logo.png';

/**
 * App component that displays the attorney profile information.
 * 
 * @param {Object} props - The component props. {Object}
 * @param {Object} props.attorneyProfile - The attorney profile object.
 * @param {string} props.attorneyProfile.firmName - The name of the firm.
 * @param {string} props.attorneyProfile.logo - The URL of the firm's logo.
 */
const App = ({ attorneyProfile }) => {
  const title = attorneyProfile.firmName || 'LegalScout';
  // console.log('Received Attorney Profile:', attorneyProfile);

  const handleLogoError = (e) => {
    console.log('Logo failed to load:', e);
    e.target.style.display = 'none';
  };

  // console.log('Received Attorney Profile:', attorneyProfile);

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <Head>
        <title>{title}</title> {/* Dynamic Title */}
      </Head>
      <header>
        <nav>
          <div className="logo-container">
            <img
              className="logo"
              src={attorneyProfile.logo || DEFAULT_LOGO_PATH}
              onError={handleLogoError}
              alt={`${title} Logo`}
            />
            <Link href="/dl/Home">Home</Link>
            <Link href="/dl/Cases">My Cases</Link>
            <Link href="/dl/About">About</Link>
          </div>
        </nav>
      </header>
      <main className="hero">
        <div className="statement">
          <p>
            <span>Use our free AI to be matched</span>
            <span>with an ideal human lawyer,</span>
            <span>knowledgeable about your case and eager to help.</span>
          </p>
          <button>
            <img
              src={attorneyProfile.logo || DEFAULT_LOGO_PATH}
              alt={`${title} Logo`}
              style={{ maxWidth: '30px', marginRight: '10px' }}
            />
            Talk to {title}
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;