import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DigitalClock } from '../pages/clock/digital';

export const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route path="/clock/digital" element={<DigitalClock />} />
      <Route path="/clock" element={<Navigate to="/clock/digital" replace />} />
      <Route path="/" element={<Navigate to="/clock/digital" replace />} />
    </Routes>
  </HashRouter>
);
