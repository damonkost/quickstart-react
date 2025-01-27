import React from 'react';
import App from '../src/components/App';
import { getAttorneyConfig } from '../src/config/attorneys';

const Home = ({ attorneyProfile }) => {
  return <App attorneyProfile={attorneyProfile} />;
};

export const getServerSideProps = async ({ req }) => {
  const host = req.headers.host; // e.g., 'generalcounselonline.legalscout.net'
  const subdomain = host.split('.')[0]; // Extract 'generalcounselonline'

  // Fetch the attorney configuration based on the subdomain
  const config = getAttorneyConfig();
  const attorneyData = config[subdomain] || config['default'];

  console.log('Host:', host);
  console.log('Subdomain:', subdomain);
  console.log('Attorney Data:', attorneyData);

  if (!attorneyData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      attorneyProfile: attorneyData,
    },
  };
};

export default Home; 