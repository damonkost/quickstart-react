import React from 'react';
import Head from 'next/head';

const App = ({ attorneyProfile }) => {
  const title = attorneyProfile?.firmName || 'LegalScout';
  const logo = attorneyProfile?.logo || '/images/default-logo.png';

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
              onError={(e) => {
                console.error('Logo failed to load', e);
                e.target.style.display = 'none';
              }}
            />
            <h1>{title}</h1>
          </div>
          <div className="nav-links">
            <a href="/Home">Home</a>
            <a href="/Cases">My Cases</a>
            <a href="/About">About</a>
          </div>
        </nav>
      </header>
      <main className="hero" style={{ paddingTop: '80px' }}>
        <div className="button-container">
          <button style={{ backgroundColor: 'transparent', border: 'none', padding: '0', display: 'block', margin: '0 auto', cursor: 'pointer' }}>
            <div
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: `url("https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FZf7Uh2x67Yz3nEftEH2i%2Fpub%2FipEv2VSSLIL0o0e2ostK.png") center center / cover`,
                boxShadow: 'rgba(0, 0, 100, 0.7) 0px 0px 40px 10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'relative',
                animation: 'pulse 1.1s ease infinite, morph 3s ease-in-out infinite alternate'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
                  animation: 'emanate 2s ease infinite alternate'
                }}
              ></span>
              <p
                style={{
                  margin: 0,
                  padding: '0 10px',
                  fontFamily: 'Courier, monospace',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  background: 'linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #ff7f00, #0000ff, #ff7f00, #ff7f00)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 2s linear infinite'
                }}
              >
                Start Call
              </p>
            </div>
          </button>
        </div>
      </main>
    </>
  );
};

export default App; 