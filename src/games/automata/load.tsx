import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
       // const p = progress + 20;
        setProgress((p) => p + 2); // 2% progress every 100ms for a total of 5 seconds
            /*
        if (progress >= 100) {
          clearInterval(interval);
        } else {
          setProgress(progress + 20); // 2% progress every 100ms for a total of 5 seconds
        }
             */
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress value = {progress} max = {100}/>
  );
};

export default Loading;
