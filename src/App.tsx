import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, EventDetailsPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/evento/:id" element={<EventDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
