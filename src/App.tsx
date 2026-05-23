import { HashRouter, useSearchParams } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, type ThemeName } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { AppRoutes } from './router';

const ThemedApp = () => {
  const [searchParams] = useSearchParams();
  const name = (searchParams.get('theme') ?? 'dark') as ThemeName;
  const theme = themes[name] ?? themes.dark;
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <HashRouter>
      <ThemedApp />
    </HashRouter>
  );
}

export default App;
