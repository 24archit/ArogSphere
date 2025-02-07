import React from 'react'
import MultiValue from '../components/MultiValue'

const DiseasePrediction = () => {
  return (
    <>
      {/* <div>
        <div style={{ display: 'flex', alignItems: "center", height: '90vh', fontFamily: "poppins", padding: "30px", flexDirection: "column" }}>
          <div style={{ width: "70%", }}>
            <h1 style={{ textAlign: "center" }}>Disease Prediction System</h1>
            <p>A disease prediction system leverages machine learning and data analytics to assess health risks based on patient data. It analyzes symptoms, medical history, and lifestyle factors to predict potential illnesses early. This helps in timely intervention, reducing complications and improving treatment outcomes. Such systems enhance healthcare efficiency by enabling preventive care and personalized treatments.</p>
          </div>
          <div style={{ width: "70%" }}>
            <MultiValue />
          </div>
        </div>
      </div> */}
      <div style={{
        width: "100vw",
        height: "90vh",
        fontFamily: "poppins",
        display: "flex",
        flexDirection: "column",
        position: "relative" // Ensure positioning works
      }}>
        {/* Background Image Container */}
        <div style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "100%",
          height: "278px",
          backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/055/204/608/large_2x/colorful-assortment-of-various-pills-and-capsules-on-soft-blue-background-for-health-medicine-and-wellness-themes-in-stockgraphy-free-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: "-1"
        }}>
          {/* Overlay for Opacity Effect */}
          <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.6)", // White transparent overlay
            position: "absolute",
            top: "0",
            left: "0"
          }}></div>
        </div>

        {/* Content Above the Background */}
        <div style={{ position: "relative", zIndex: "2", padding: "30px", color: "black",display: "flex",alignItems: "center",flexDirection: "column"}}>
          <h1 style={{ textAlign: "center",fontFamily: "poppins",color: "black" }}>Disease Prediction System</h1>
          <div style={{ width: "70%", }}>
            <MultiValue />
          </div>
        </div>
      </div>


    </>
  )
}

export default DiseasePrediction
