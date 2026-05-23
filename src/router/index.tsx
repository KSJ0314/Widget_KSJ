import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/home';
import { DigitalClock } from '../pages/clock/digital';
import { AnalogClock } from '../pages/clock/analog';
import { FlipClock } from '../pages/clock/flip';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/clock/digital" element={<DigitalClock />} />
    <Route path="/clock/analog" element={<AnalogClock />} />
    <Route path="/clock/flip" element={<FlipClock />} />
    <Route path="/clock" element={<Navigate to="/clock/digital" replace />} />
  </Routes>
);
