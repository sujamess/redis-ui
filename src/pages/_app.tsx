import 'styles/tailwind.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('components/navbar'));


function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen flex flex-col items-center dark:bg-gray-900">
      <Navbar />
      <div className="w-full max-w-screen-2xl flex justify-center">
        <div className="w-full px-4">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default App;
