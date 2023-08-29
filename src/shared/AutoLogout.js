import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AutoLogout = () => {
  const [logoutTimer, setLogoutTimer] = useState(null);
  const router = useRouter();

  const logout = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    router.push('/login');
  };

  const resetTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    const newLogoutTimer = setTimeout(logout, 60* 60 * 1000); // 2 minutes in milliseconds
    setLogoutTimer(newLogoutTimer);
  };

  useEffect(() => {
    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return null;
};

export default AutoLogout;
