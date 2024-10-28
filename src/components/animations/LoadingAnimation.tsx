import React from "react"
import vibebuddies from "./vibebuddies.png" // Replace with your actual file path

const LoadingAnimation = () => {
  const shakeAnimation = {
    animation: "shake 1s ease-in-out infinite",
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Apply shakeAnimation style directly */}
      <img
        src={vibebuddies}
        alt="Loading..."
        style={{
          width: "75%",
          height: "75%",
          ...shakeAnimation,
        }}
      />

      {/* Inject keyframes directly into a <style> tag */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-5px); }
            50% { transform: translateY(5px); }
            75% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  )
}

export default LoadingAnimation
