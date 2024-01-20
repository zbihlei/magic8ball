import { useEffect } from 'react';

interface ShakeDetectionOptions {
  threshold: number;
}

const useShakeDetection = (callback: () => void, options: ShakeDetectionOptions) => {
  const { threshold } = options;

  const handleMotionEvent = (event: DeviceMotionEvent) => {
    if (
      event.accelerationIncludingGravity &&
      event.accelerationIncludingGravity.x !== null &&
      event.accelerationIncludingGravity.y !== null &&
      event.accelerationIncludingGravity.z !== null
    ) {
      const { x, y, z } = event.accelerationIncludingGravity;

      const acceleration = Math.sqrt(x * x + y * y + z * z);

      if (acceleration > threshold) {
        callback();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('devicemotion', handleMotionEvent);

    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent);
    };
  }, [callback, threshold]);
};

export default useShakeDetection;
