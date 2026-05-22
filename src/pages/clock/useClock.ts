import { useState, useEffect } from 'react';

export interface ClockTime {
  hours: string;
  minutes: string;
  seconds: string;
  ampm: 'AM' | 'PM';
  date: Date;
}

const formatTime = (now: Date): ClockTime => {
  const h = now.getHours();
  return {
    hours: String(h % 12 || 12).padStart(2, '0'),
    minutes: String(now.getMinutes()).padStart(2, '0'),
    seconds: String(now.getSeconds()).padStart(2, '0'),
    ampm: h >= 12 ? 'PM' : 'AM',
    date: now,
  };
};

export const useClock = (): ClockTime => {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const tick = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(tick);
  }, []);

  return time;
};
