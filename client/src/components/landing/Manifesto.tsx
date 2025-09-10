import { AnimatedSection } from "@/components/ui/animated-section";
import { ParallaxContainer } from "@/components/ui/parallax-container";
import { VideoLoader } from "./VideoLoader";


interface ManifestoProps {
  id?: string;
}

const Manifesto = ({ id }: ManifestoProps) => {
  return (
    <section id={id} className="py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12 bg-brand-black">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-10 md:space-y-14 lg:space-y-18">
          {/* Citação em Destaque - Centralizada */}
          <AnimatedSection animation="fade" delay={0.2}>
            <div className="text-center max-w-4xl lg:max-w-5xl mx-auto space-y-6 lg:space-y-8">
              <div className="space-y-6 lg:space-y-8">
                {/* Elemento decorativo centralizado */}
                <div className="w-16 lg:w-20 h-0.5 lg:h-1 bg-gradient-accent rounded-full mx-auto"></div>
                
                {/* Citação principal - Dividida em dois blocos */}
                <blockquote className="relative space-y-4 lg:space-y-6">
                  <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-montserrat italic text-brand-latte leading-relaxed tracking-wide">
                    "Acreditamos que profissionais extraordinários merecem ferramentas à altura de sua expertise.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-montserrat italic text-brand-latte/80 leading-relaxed tracking-wide">
                    NIVELA® representa uma nova era em retexturização capilar."
                  </p>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* Vídeo Institucional - Centralizado e Otimizado */}
          <ParallaxContainer speed="medium">
            <AnimatedSection animation="scale" delay={0.6}>
              <div className="relative group max-w-3xl lg:max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-lg">
                  <video
                    src="/videos/video-manifesto.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    controlsList="nodownload nofullscreen noremoteplaybook"
                    disablePictureInPicture
                    preload="none"
                    poster="/nivela-hero.webp"
                    className="w-full h-full object-cover aspect-video"
                    style={{ pointerEvents: 'none' }}
                    aria-label="NIVELA - Nova era em retexturização capilar"
                    title="NIVELA - Nova era em retexturização capilar"
                  >
                    Seu navegador não suporta reprodução de vídeos HTML5.
                  </video>
                </div>
              </div>
            </AnimatedSection>
          </ParallaxContainer>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;