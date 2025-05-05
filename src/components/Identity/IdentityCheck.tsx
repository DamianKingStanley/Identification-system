import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./IdentityCheck.css";

const IdentityCheck: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanPosition, setScanPosition] = useState(0);

  interface VerificationResult {
    match: boolean;
    confidence: number;
    identity: {
      name: string;
      [key: string]: string | number | boolean | null | undefined;
    };
    message?: string;
  }

  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Scanning animation effect
  useEffect(() => {
    if (!loading) {
      setScanPosition(0);
      return;
    }

    const interval = setInterval(() => {
      setScanPosition((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [loading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      if (cameraActive) stopCamera();
    }
  };

  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setError("Could not access the camera. Please check permissions.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        canvasRef.current.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "capture.jpg", {
                type: "image/jpeg",
              });
              setImage(file);
              setPreview(URL.createObjectURL(blob));
              setResult(null);
              setError(null);
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
    stopCamera();
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/identity/verify",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(res.data);
    } catch (err: unknown) {
      console.error("Error verifying identity:", err);
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to verify identity.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="identity-check-container">
      <div className="card">
        <h2>Identity Check</h2>
        <p className="subtitle">Upload or capture an image for verification</p>

        <div className="input-options">
          <div className="upload-section">
            <label className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="upload-button">Choose File</span>
              <span className="file-name">
                {image?.name || "No file selected"}
              </span>
            </label>
            <span className="or-text">OR</span>
            {!cameraActive ? (
              <button className="camera-button" onClick={startCamera}>
                Open Camera
              </button>
            ) : (
              <button className="capture-button" onClick={captureImage}>
                Capture Image
              </button>
            )}
          </div>
        </div>

        <div className="preview-area">
          {cameraActive ? (
            <div className="camera-preview">
              <video ref={videoRef} autoPlay playsInline muted />
              <div className="camera-overlay" />
            </div>
          ) : preview ? (
            <div className="image-preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
              {loading && (
                <div
                  className="scanning-overlay"
                  style={
                    {
                      "--scan-position": `${scanPosition}%`,
                    } as React.CSSProperties
                  }
                >
                  <div className="scan-line" />
                </div>
              )}
            </div>
          ) : (
            <div className="placeholder">
              <div className="placeholder-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
                </svg>
              </div>
              <p>No image selected</p>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <button
          className="verify-button"
          onClick={handleSubmit}
          disabled={loading || !image}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Analyzing...
            </>
          ) : (
            "Verify Identity"
          )}
        </button>

        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24">
              <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
            </svg>
            {error}
          </div>
        )}

        {result && (
          <div className={`result-box ${result.match ? "success" : "failure"}`}>
            <h3>
              {result.match ? (
                <>
                  <svg viewBox="0 0 24 24">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  </svg>
                  Verification Successful
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                  Verification Failed
                </>
              )}
            </h3>
            <div className="result-details">
              <div className="result-row">
                <span className="label">Confidence:</span>
                <span className="value">{result.confidence?.toFixed(2)}%</span>
              </div>
              <div className="result-row">
                <span className="label">Name:</span>
                <span className="value">
                  {result.identity?.name || "Unknown"}
                </span>
              </div>
              {result.message && (
                <div className="result-message">{result.message}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentityCheck;
