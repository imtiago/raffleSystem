import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import Home from './pages/LandingPage/Home'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
        <Home/>
          <ScrollToTop />
    {/* <div>
      ok
    </div> */}
          {/* <BaseOptionChartStyle />
          <AuthProvider>
            <Routes />
          </AuthProvider> */}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
