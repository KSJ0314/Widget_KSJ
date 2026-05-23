import { useState, useEffect } from 'react';

export interface AnalogAngles {
  hourAngle: number;
  minuteAngle: number;
  secondAngle: number;
}

const getAngles = (): AnalogAngles => {
  const now = new Date();
  const ms = now.getMilliseconds();
  const s = now.getSeconds() + ms / 1000;
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;
  return {
    secondAngle: (s / 60) * 360,
    minuteAngle: (m / 60) * 360,
    hourAngle: (h / 12) * 360,
  };
};

export const useAnalogTime = (): AnalogAngles => {
  const [angles, setAngles] = useState(getAngles);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      setAngles(getAngles());
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return angles;
};
