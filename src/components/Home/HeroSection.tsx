import React from "react";
import "./HeroSection.css";
import scanImage from "../../assets/king.png";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onLearnMore,
}) => {
  return (
    <section className="hero" role="region" aria-labelledby="hero-heading">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title" id="hero-heading">
            <span className="hero-title-highlight">Precision Identity</span>
            Verification System
          </h1>
          <p className="hero-subtitle">
            Advanced Facial recognition and identity verification for secure,
            seamless authentication.
          </p>
          <div className="hero-actions">
            <button
              className="hero-button primary"
              onClick={onGetStarted}
              aria-label="Get started with identity verification"
            >
              Get Started
            </button>
            <button
              className="hero-button secondary"
              onClick={onLearnMore}
              aria-label="Learn more about our system"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="identity-card">
            <div className="card-face">
              <div className="card-photo" aria-hidden="true">
                <img src={scanImage} alt="image" />
              </div>
              <div className="card-details">
                <div className="card-name">KING DAMIAN</div>
                <div className="card-id">ID: 4578-2309</div>
              </div>
              <div className="card-chip" aria-hidden="true"></div>
            </div>
          </div>
          <div className="scan-animation" aria-hidden="true"></div>
        </div>
        {/* Add Video Section
         <div className="hero-video">
          <video
            src="https://ik.imagekit.io/webmanagement/id-me/idme-vid.mp4?updatedAt=1746530992182"
            autoPlay
            loop
            muted
            playsInline
            className="video-background"
          ></video>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
