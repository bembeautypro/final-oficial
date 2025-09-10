// Advanced image loading optimization
export class ImageOptimizer {
  private static intersectionObserver?: IntersectionObserver;
  private static imageCache = new Set<string>();

  static init() {
    if (typeof window === 'undefined') return;
    
    // Initialize Intersection Observer for lazy loading
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.loadImage(img);
            this.intersectionObserver?.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before image is visible
        threshold: 0.01
      }
    );
  }

  static optimizeImage(src: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  } = {}) {
    const { width, height, quality = 80, format = 'webp' } = options;
    
    // Supabase image transformation
    if (src.includes('supabase.co')) {
      const url = new URL(src);
      const params = new URLSearchParams();
      
      if (width) params.set('width', width.toString());
      if (height) params.set('height', height.toString());
      params.set('quality', quality.toString());
      
      if (format !== 'auto') {
        params.set('format', format);
      }
      
      url.search = params.toString();
      return url.toString();
    }
    
    return src;
  }

  static lazyLoad(img: HTMLImageElement) {
    if (!this.intersectionObserver) this.init();
    this.intersectionObserver?.observe(img);
  }

  private static loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (!src || this.imageCache.has(src)) return;

    this.imageCache.add(src);
    
    // Create new image to preload
    const newImg = new Image();
    newImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
    };
    newImg.onerror = () => {
      img.classList.add('error');
    };
    newImg.src = src;
  }

  static preloadCriticalImages(urls: string[]) {
    urls.forEach(url => {
      if (this.imageCache.has(url)) return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.fetchpriority = 'high';
      document.head.appendChild(link);
      
      this.imageCache.add(url);
    });
  }
}

// Initialize on module load
if (typeof window !== 'undefined') {
  ImageOptimizer.init();
}