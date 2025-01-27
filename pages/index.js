import dynamic from 'next/dynamic';

// Import App with no SSR since it uses window
const App = dynamic(() => import('../src/App'), { 
  ssr: false 
});

export default function Home() {
  return (
    <div id="root">
      <App />
    </div>
  );
} 