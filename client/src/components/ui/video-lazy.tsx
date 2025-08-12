import React, { useState, useRef, useEffect, memo } from 'react';

interface VideoLazyProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  threshold?: number;
  onError?: (error: Error | Event) => void;
}

export const VideoLazy = memo<VideoLazyProps>(({
  src,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  threshold = 0.3,
  onError
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            // Video is visible - play
            video.play().catch(() => {
              // Autoplay failed - handled gracefully
            });
          } else {
            // Video is out of view - pause
            video.pause();
          }
        });
      },
      { threshold, rootMargin: '50px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold]);

  const handleError = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    setHasError(true);
    onError?.(event.nativeEvent);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Erro ao carregar vídeo</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplaybook"
        preload="metadata"
        className="w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
        onError={handleError}
      />
    </div>
  );
});