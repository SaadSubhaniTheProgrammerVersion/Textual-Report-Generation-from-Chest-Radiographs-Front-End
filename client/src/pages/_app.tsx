import { AppProps } from 'next/app';
import Context from "../context/context"
import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Context>
  <Component {...pageProps} />
  </Context>
);

export default MyApp;
