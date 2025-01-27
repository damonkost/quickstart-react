import { useEffect, useState } from 'react';

export default function Home() {
  const [attorneyProfile, setAttorneyProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const subdomain = window.location.hostname.split('.')[0];
        const response = await fetch(`/api/v1/attorneys?subdomain=${subdomain}`);
        const data = await response.json();
        if (data?.data) {
          setAttorneyProfile(data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="logo-container">
            <img 
              className="logo" 
              src={attorneyProfile?.logo || "https://res.cloudinary.com/glide/image/fetch/f_auto,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png%3Falt%3Dmedia%26token%3Dcdc26513-26ae-48f6-b085-85b8bb806c4c"} 
              alt={`${attorneyProfile?.firmName || 'LegalScout'} Logo`}
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
          <div id="root"></div>
        </div>
      </main>
    </>
  );
} 