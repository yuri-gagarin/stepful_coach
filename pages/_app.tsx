import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
//
import { UserLayout } from '../components/layouts/UserLayout';
import { ContextProvider } from "../context/Store";
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <UserLayout>
        <Component {...pageProps} />
      </UserLayout>
    </ContextProvider>
  )
}

export default MyApp;

