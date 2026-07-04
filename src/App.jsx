import { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import { LogoLoader } from './components/ui/LogoLoader';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Watermark } from './components/ui/Watermark';
import { Lightbox } from './components/ui/Lightbox';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { BrandIdentity } from './components/sections/BrandIdentity';
import { PhotoGallery } from './components/sections/PhotoGallery';
import { VideoSection } from './components/sections/VideoSection';
import { Services } from './components/sections/Services';
import { HowItWorks } from './components/sections/HowItWorks';
import { Contact } from './components/sections/Contact';
import { photos } from './data/photos';

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useLenis();

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  const handlePhotoClick = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleLightboxNavigate = useCallback((dir) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + dir + photos.length) % photos.length;
    });
  }, []);

  return (
    <>
      <LogoLoader onComplete={handleLoaderComplete} />
      <CustomCursor />
      <ScrollProgress />
      <Watermark />

      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />

      <main id="main">
        <Hero />
        <BrandIdentity />

        {/* Everything after Brand Identity slides over it (scroll-behind effect) */}
        <div style={{ position: 'relative', zIndex: 2, background: 'var(--black)' }}>
          <VideoSection
            id="videoReel"
            src="/images/palacio-palace-renegade.mp4"
            poster="/images/palacio-poster.jpg"
            label="PALACIO PALACE RENEGADE"
          />

          <PhotoGallery photos={photos} onPhotoClick={handlePhotoClick} />

          <Services />
          <HowItWorks />
          <Contact />
        </div>
      </main>

      <Footer />

      <Lightbox
        images={photos}
        currentIndex={lightboxIndex}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
    </>
  );
}
