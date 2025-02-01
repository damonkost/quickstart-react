import React from 'react';
import Head from 'next/head';

const App = ({ attorneyProfile, children }) => {
  const title = attorneyProfile?.firmName || 'LegalScout';
  const logo =
    attorneyProfile?.logo ||
    'https://res.cloudinary.com/glide/image/fetch/f_auto,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png';

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
              alt="LegalScout Logo"
              onError={(e) => {
                console.error('Logo failed to load', e);
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="nav-links">
            <a href="/Home">Home</a>
            <a href="/Cases">My Cases</a>
            <a href="/About">About</a>
          </div>
        </nav>
      </header>
      <main className="hero" style={{ paddingTop: '80px' }}>
        {children}
      </main>
    </>
  );
};

export default App; 