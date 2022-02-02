import useThemePreference from 'hooks/useThemePreference';
import { ThemeEnum } from 'types/enums/theme';
import { FunctionComponent } from 'react';

interface JsonViewer {
  src?: object;
}

const JsonViewer: FunctionComponent<JsonViewer> = ({ src }) => {
  // React hooks declaration
  const [colorTheme] = useThemePreference();

  if (!src || typeof window === 'undefined') {
    return (
      <div className="flex justify-center">
        <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-300">No data</p>
      </div>
    )
  }

  // Since this library could not render with SSR, so we need to check the document is not undefined first
  // And then initialize the component after the document has a value
  const ReactJson = require('react-json-view');

  return (
    <ReactJson src={src} theme={colorTheme === ThemeEnum.Light ? 'summerfruit:inverted' : 'summerfruit'} />
  );
};

export default JsonViewer;
