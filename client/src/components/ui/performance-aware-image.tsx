import React, { useState, useRef, useEffect, memo } from 'react';

interface PerformanceAwareImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

export const PerformanceAwareImage = memo<PerformanceAwareImageProps>(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [priority]);

  const handleError = () => {
    setHasError(true);
    // Image loading failed - handled gracefully
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Erro ao carregar imagem</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={priority || isLoaded ? src : undefined}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
    />
  );
});