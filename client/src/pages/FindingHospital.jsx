
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import SearchBar from '../components/SearchBar';
import 'leaflet/dist/leaflet.css';
const FindingHospital = () => {
    const [position, setPosition] = useState([20, 78]); // Default India center
    const [hospitals, setHospitals] = useState([]);
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        const map = L.map('map', {
            center: position,
            zoom: 13
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

        // Add marker for the selected location
        const marker = L.marker(position).addTo(map);
        marker.bindPopup(locationName || "Selected Location");

        // Add hospital markers with calculated distance
        hospitals.forEach((hospital) => {
            const distance = calculateDistance(position[0], position[1], hospital.lat, hospital.lon).toFixed(2);

            L.marker([hospital.lat, hospital.lon])
                .addTo(map)
                .bindPopup(`${hospital.tags.name || "Unnamed Hospital"}<br>Distance: ${distance} km`);
        });

        return () => map.remove();
    }, [position, hospitals, locationName]);

    const fetchNearbyHospitals = async (lat, lon) => {
        const radius = 5000; // 10 km radius
        const query = `
          [out:json];
          (
            node["amenity"="hospital"](around:${radius}, ${lat}, ${lon});
          );
          out body;
        `;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url);
            return response.data.elements;
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            return [];
        }
    };

    const handleLocationSelect = async (lat, lon, name) => {
        setPosition([lat, lon]);
        setLocationName(name);
        const results = await fetchNearbyHospitals(lat, lon);
        setHospitals(results);
    };

    // Function to calculate the distance between two coordinates using the Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        // const R = 6371; // Radius of the Earth in km
        // const dLat = (lat2 - lat1) * (Math.PI / 180);
        // const dLon = (lon2 - lon1) * (Math.PI / 180);
        // const a =
        //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        //     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        //     Math.sin(dLon / 2) * Math.sin(dLon / 2);
        // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // return R * c;
        const x1 = lon1;
        const y1 = lat1;
        const x2 = lon2;
        const y2 = lat2;

        const euclideanDistance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return euclideanDistance * 111;
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "20px" }}>
                <div style={{width: "100%",height: "300px",display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column"}}>
                    <h2 style={{ fontFamily: "poppins", textAlign: "center", padding: "20px" }}>Finding Nearby Hospitals</h2>
                    <div style={{ textAlign: "center", padding: "10px" }}>
                        <SearchBar onLocationSelect={handleLocationSelect} />
                    </div>
                </div>
                <div id="map" style={{ height: "700px", width: "100%", marginTop: "10px" }}></div>
            </div>
        </div>
    );
};

export default FindingHospital;




