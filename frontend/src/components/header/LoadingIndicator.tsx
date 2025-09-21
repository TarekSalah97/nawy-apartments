import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

export default function LoadingIndicator() {
  const router = useRouter();
  const loadingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleRouteChange = (url: any, { shallow }: any) => {
      if (loadingRef.current) {
        loadingRef.current.style.display = 'block';
      }
      return;
    };

    const handleRouteComplete = (url: any, { shallow }: any) => {
      if (loadingRef.current) {
        loadingRef.current.style.display = 'none';
      }
      return;
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <LinearProgress
      color="primary"
      sx={{ width: '100%', zIndex: 90, position: 'absolute', top: 0, display: 'none' }}
      ref={loadingRef}
    />
  );
}
