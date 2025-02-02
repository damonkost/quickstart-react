import React from 'react';
import Head from 'next/head';

const App = ({ attorneyProfile }) => {
  const title = attorneyProfile.firmName || 'LegalScout';
  const logo = attorneyProfile.logo || '/images/default-logo.png'; // Ensure a default logo path

  console.log('Received Attorney Profile:', attorneyProfile);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <div className="logo-container">
            <img
              className="logo"
              src={logo}
              alt={`${title} Logo`}
              style={{ maxWidth: '150px', height: 'auto' }}
              onError={(e) => {
                console.log('Logo failed to load:', e);
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="nav-links">
            <a href="https://legalscout.ai/dl/Home">Home</a>
            <a href="https://legalscout.ai/dl/Cases">My Cases</a>
            <a href="https://legalscout.ai/dl/About">About</a>
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
              src={logo}
              alt={`${title} Logo`}
              style={{ maxWidth: '30px', marginRight: '10px' }}
            />
            Talk to {title}
          </button>
        </div>
      </main>
    </>
  );
};

export default App; 