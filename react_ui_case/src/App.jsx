import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/page-three" element={<PageThree />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
