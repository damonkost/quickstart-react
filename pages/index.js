import dynamic from 'next/dynamic';

// Dynamically import App with no SSR since it uses window
const App = dynamic(() => import('../src/App'), { 
  ssr: false 
});

export default function Home() {
  return <App />;
} 