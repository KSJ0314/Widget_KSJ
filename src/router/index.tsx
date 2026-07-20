import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/home';
import { DigitalClock } from '../pages/clock/digital';
import { AnalogClock } from '../pages/clock/analog';
import { FlipClock } from '../pages/clock/flip';
import { MonthlyCalendar } from '../pages/calendar/monthly';
import { MonthlyScheduler } from '../pages/scheduler/monthly';
import { WeatherCurrentPage } from '../pages/weather/current';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/clock/digital" element={<DigitalClock />} />
    <Route path="/clock/analog" element={<AnalogClock />} />
    <Route path="/clock/flip" element={<FlipClock />} />
    <Route path="/clock" element={<Navigate to="/clock/digital" replace />} />
    <Route path="/calendar/monthly" element={<MonthlyCalendar />} />
    <Route path="/scheduler/monthly" element={<MonthlyScheduler />} />
    <Route path="/weather/current" element={<WeatherCurrentPage />} />
  </Routes>
);
