import useThemePreference from 'hooks/useThemePreference';
import { NextComponentType } from "next";
import { Dispatch, SetStateAction } from "react";

const Navbar: NextComponentType = () => {
  const [colorTheme, setTheme] = useThemePreference();

  const toggleTheme = (theme: string) => {
    (setTheme as Dispatch<SetStateAction<string>>)(theme);
  }

  return (
    <div className="flex justify-center sticky top-0 z-40 flex-none py-3 mx-auto w-full bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="flex flex-row w-full sm:max-w-screen-xl items-center justify-between">
        <div className="cursor-pointer">
          <span translate="no" className="self-center text-xl font-semibold whitespace-nowrap text-red-600">R</span>
          <span translate="no" className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">edis UI</span>
        </div>
        <button id="theme-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
          {colorTheme === 'dark' && (<svg id="theme-toggle-dark-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={() => toggleTheme('dark')}><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>)}
          {colorTheme === 'light' && (<svg id="theme-toggle-light-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={() => toggleTheme('light')}><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>)}
        </button>
      </div>
    </div>
  )
};

export default Navbar;