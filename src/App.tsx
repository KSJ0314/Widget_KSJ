import { ThemeProvider } from './theme';
import { AppRouter } from './router';

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
