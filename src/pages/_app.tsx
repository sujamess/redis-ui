import 'styles/tailwind.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('components/navbar'));


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      <Navbar />

      <div className="flex justify-center">
        <div className="w-full md:max-w-screen-xl">
          <Component {...pageProps} />
        </div>
      </div>

    </div>
  )
}

export default MyApp
