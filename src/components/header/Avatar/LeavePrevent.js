import React, { useEffect } from 'react';

export default function LeavePrevent() {
  const preventExist = (e) => {
    e.returnValue = 'You have unfinished changes!';
  };
  useEffect(() => {
    window.addEventListener('beforeunload', preventExist);

    return () => {
      window.removeEventListener('beforeunload', preventExist);
    };
  }, []);

  return <div style={{ display: 'none' }}></div>;
}
