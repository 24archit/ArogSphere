import React from 'react'
import SelectField from '../components/SelectField'
import { useEffect } from 'react'
const Estimation = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    return (
        <div style={{width: "100%",display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",gap: "20px"}}>
            <div>
                <h2 style={{ fontFamily: "poppins", margintop: "60px" }}>Estimate The Budget According to the Location</h2>
            </div>
            <div style={{width: "70%"}}>
                <SelectField />
            </div>

        </div>
    )
}

export default Estimation
