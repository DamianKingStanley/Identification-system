import React from "react"
import "./HowItWorks.css"

const steps = [
  {
    title: "Input",
    description: "Upload a photo or enter a name to begin identity analysis.",
    stepNumber: "1",
  },
  {
    title: "Aggregation",
    description: "We search public records, social data, and digital footprints.",
    stepNumber: "2",
  },
  {
    title: "Summary",
    description: "Receive a comprehensive identity insight report in seconds.",
    stepNumber: "3",
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works-section">
      <h2 className="section-title animate-fade-in">
        How It <span className="highlight">Works</span>
      </h2>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className="step-wrapper animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="step">
              <div className="step-number-container">
                <div className="step-number">{step.stepNumber}</div>
              </div>

              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div 
                className="connector animate-scale-in"
                style={{ animationDelay: `${index * 200 + 400}ms` }}
              >
                <div className="connector-arrow">
                  <div className="arrow-right"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
