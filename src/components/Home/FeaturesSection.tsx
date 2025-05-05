import React, { useEffect, useRef } from "react";
import "./FeaturesSection.css";
// import scanImage from "../../assets/king.png";

const features = [
  {
    title: "AI-generated public profile summary",
    description:
      "Comprehensive digital footprint analysis distilled into actionable insights",
    icon: "📊",
  },
  {
    title: "Face recognition-based identity search",
    description:
      "Biometric matching across multiple sources with 99.8% accuracy",
    icon: "👁️",
  },
  {
    title: "Multi-platform data aggregation",
    description:
      "Unified identity verification from social, financial, and government sources",
    icon: "🔗",
  },
  {
    title: "Confidence scoring and risk indicators",
    description: "Real-time assessment of identity verification reliability",
    icon: "📈",
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="features-section" ref={sectionRef}>
      <div className="features-container">
        <div className="features-header">
          <h2 className="section-title">
            <span className="title-line">Identity Verification</span>
            <span className="title-line">Redefined</span>
          </h2>
          <p className="section-subtitle">
            Advanced technology working together to deliver unparalleled
            identity confirmation
          </p>
        </div>

        {/* <div className="identity-visualization">
          <div className="profile-circle">
            <div className="scan-line" />
            <img src={scanImage} alt="scanning" />
          </div>
        </div> */}

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item"
              ref={(el) => {
                featureRefs.current[index] = el;
              }}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="feature-icon-container">
                <span className="feature-icon">{feature.icon}</span>
                <div className="connection-line" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
