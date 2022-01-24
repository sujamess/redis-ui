import { useEffect, useState } from 'react';

const useThemePreference = () => {
  const [theme, setTheme] = useState<string>(
    typeof window === 'undefined' ? 'light' : localStorage.theme || 'light'
  );

  const colorTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
      const root = window.document.documentElement;

      root.classList.remove(colorTheme);
      root.classList.add(theme);

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
      }
  }, [theme]);

  return [colorTheme, setTheme];
}

export default useThemePreference;