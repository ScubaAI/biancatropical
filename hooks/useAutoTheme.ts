import { useEffect, useState } from 'react';
import { useTenant } from '@/hooks/useTenant';

export function useAutoTheme() {
  const { theme_override } = useTenant();
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    if (theme_override !== 'auto') {
      setIsNight(theme_override === 'night');
      return;
    }

    const checkTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 18 || hour < 6);
    };
    
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [theme_override]);

  return isNight;
}
