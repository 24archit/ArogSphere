import Heading from "./Heading";
import Lottie from "lottie-react";
import priceAnimation from "../../assets/animations/price-animation.json";
import aiAnimation from "../../assets/animations/ai-animation.json";
import animation1 from "../../assets/animations/animation-1.json";
import animation2 from "../../assets/animations/animation-2.json";
import animation3 from "../../assets/animations/animation-3.json";
import animation4 from "../../assets/animations/animation-4.json";
import animation5 from "../../assets/animations/animation-5.json";
import animation6 from "../../assets/animations/animation-6.json";
import "../../assets/styles/HomeService.css";
import { 
  FaHeartbeat, FaCapsules, FaUserMd, FaCalculator, FaRegHospital, 
  FaFileMedical, FaHandsHelping, FaBookMedical 
} from "react-icons/fa";

export default function HomeService() {
  const services = [
    {
      icon: <FaHeartbeat className="service-icon" />,
      title: "AI Disease Prediction",
      text: "Get AI-driven disease predictions based on symptoms and medical data.",
      animation: aiAnimation,
    },
    {
      icon: <FaCapsules className="service-icon" />,
      title: "Medicine Price Comparison",
      text: "Compare medicine prices across platforms and find the cheapest in real time.",
      animation: priceAnimation,
    },
    {
      icon: <FaUserMd className="service-icon" />,
      title: "Book Doctor Appointment",
      text: "Find and book appointments with verified doctors in your city.",
      animation: animation1
    },
    {
      icon: <FaCalculator className="service-icon" />,
      title: "Estimated Treatment Budget",
      text: "Get a cost estimate for any disease or treatment in your city.",
      animation: animation2,
    },
    {
      icon: <FaRegHospital className="service-icon" />,
      title: "Government Health Schemes",
      text: "Access all government schemes related to healthcare and benefits.",
      animation: animation3,
    },
    {
      icon: <FaFileMedical className="service-icon" />,
      title: "Best Insurance Policies",
      text: "Find and compare the best insurance policies across different providers.",
      animation: animation4,
    },
    {
      icon: <FaHandsHelping className="service-icon" />,
      title: "Crowdsourced Requests",
      text: "Request for crowdfunding or community help for medical expenses.",
      animation: animation5,
    },
    {
      icon: <FaBookMedical className="service-icon" />,
      title: "Health Articles & Awareness",
      text: "Read the latest health-related articles and awareness guides.",
      animation: animation6,
    },
  ];

  return (
    <div className="service-section">
      <Heading text="Why use ArogSphere ?" />
      <div className="service-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            {service.icon}
            <h3 className="service-title">{service.title}</h3>
            <Lottie animationData={service.animation} loop={true} className="animation" />
            <p className="service-text">{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
