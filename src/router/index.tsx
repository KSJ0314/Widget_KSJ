import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/home';
import { DigitalClock } from '@clock/digital';
import { AnalogClock } from '@clock/analog';
import { FlipClock } from '@clock/flip';
import { MonthlyCalendar } from '@calendar/monthly';
import { MonthlyScheduler } from '@scheduler/monthly';
import { DailyScheduler } from '@scheduler/daily';
import { WeatherCurrentPage } from '@weather/current';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/clock/digital" element={<DigitalClock />} />
    <Route path="/clock/analog" element={<AnalogClock />} />
    <Route path="/clock/flip" element={<FlipClock />} />
    <Route path="/clock" element={<Navigate to="/clock/digital" replace />} />
    <Route path="/calendar/monthly" element={<MonthlyCalendar />} />
    <Route path="/scheduler/monthly" element={<MonthlyScheduler />} />
    <Route path="/scheduler/daily" element={<DailyScheduler />} />
    <Route path="/weather/current" element={<WeatherCurrentPage />} />
  </Routes>
);
