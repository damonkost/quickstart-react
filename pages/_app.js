import '../styles/globals.css';
import '../styles/index.css'; // If needed, ensure globals.css comes last if these rules should override.

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}