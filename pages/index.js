import dynamic from 'next/dynamic';

// Dynamically import App with no SSR since it uses window
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function Home({ attorneyProfile }) {
  return <App initialProfile={attorneyProfile} />;
}

// This ensures the page is rendered on the client side
export const getServerSideProps = async () => {
  return {
    props: {}
  };
}; 