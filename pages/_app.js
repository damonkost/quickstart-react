import '../src/styles/index.css'; // Import global CSS
import ErrorBoundary from '../src/components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp; 