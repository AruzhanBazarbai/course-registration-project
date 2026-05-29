import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContainer } from './components';
import { Home } from './pages';
import "./styles/globals.scss";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

