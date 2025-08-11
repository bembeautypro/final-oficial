import React, { useState, useRef, useEffect, memo } from 'react';

interface VideoLazyProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  preload?: 'metadata' | 'auto' | 'none';
  threshold?: number;
  rootMargin?: string;
  'aria-label'?: string;
  title?: string;
  onError?: (error: Error | Event) => void;
}

export const VideoLazy = memo<VideoLazyProps>(({
  src,
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  preload = 'metadata',
  'aria-label': ariaLabel,
  title,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isLoaded]);

  const handleError = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    setHasError(true);
    // Video loading failed - handled gracefully
    onError?.(event.nativeEvent);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Erro ao carregar vídeo</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={isLoaded ? src : undefined}
        autoPlay={autoPlay && isLoaded}
        muted={muted}
        loop={loop}
        controls={controls}
        preload={preload}
        className="w-full h-full object-cover"
        aria-label={ariaLabel}
        title={title}
        onError={handleError}
      />
    </div>
  );
});