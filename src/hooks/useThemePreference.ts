import { useEffect, useState } from 'react';
import { ThemeEnum } from 'types/enums/theme';

const useThemePreference = () => {
  const [theme, setTheme] = useState<string>(
    typeof window === 'undefined' ? ThemeEnum.Light : localStorage.theme || ThemeEnum.Light
  );

  const colorTheme = theme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light;

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