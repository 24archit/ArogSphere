import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Chip } from '@mui/material';

const SelectField = () => {
    const [location, setlocation] = React.useState('');
    const [treatment, settreatment] = React.useState('');
    const [hosptype, sethosptype] = React.useState('');

    const handleChange = (event) => {
        if (event.target.name == "location") {
            setlocation(event.target.value);
        }
        if (event.target.name == "treatment") {
            settreatment(event.target.value);
        }
        if (event.target.name == "hosptype") {
            sethosptype(event.target.value);
        }
    };

    const [locations, setlocations] = React.useState([])

    const getAllLocations = async () => {
        try {
            const response = await fetch("http://localhost:5000/estimate/fetchLocations", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            setlocations(data.locations)
        } catch (error) {
            console.error("Error fetching symptoms:", error);
        }
    };

    const [treatments, settreatments] = React.useState([])

    const getAllTreatment = async () => {
        try {
            const response = await fetch(`http://localhost:5000/estimate/fetchTreatments?location=${location}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            settreatments(data.treatments)
        } catch (error) {
            console.error("Error fetching symptoms:", error);
        }
    };

    React.useEffect(() => {
        getAllLocations();
    }, [])

    React.useEffect(() => {
        getAllTreatment();
    }, [location])

    const [estimate, setestimate] = React.useState([])
    const [loading, setloading] = React.useState(true)

    const showEstimate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/estimate/fetchEstimation?location=${location}&treatment=${treatment}&hospitalType=${hosptype}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setloading(false)
            console.log(data);
            setestimate(data.estimate)
        } catch (error) {
            console.error("Error fetching symptoms:", error);
        }
    }

    return (
        <>
            <div>
                <div>
                    <div>
                        <Box sx={{ width: "100%", marginBottom: "20px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={location}
                                    label="location"
                                    name='location'
                                    onChange={handleChange}
                                >
                                    {locations.length === 0 ? (<MenuItem value={"None"}>No Options</MenuItem>) : (
                                        locations.map((location, index) => {
                                            return (
                                                <MenuItem key={index} value={location}>{location}</MenuItem>
                                            )
                                        })
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div>
                        <Box sx={{ width: "100%", marginBottom: "20px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Treatment</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={treatment}
                                    label="treatment"
                                    name='treatment'
                                    onChange={handleChange}
                                >
                                    {treatments.length === 0 ? (<MenuItem value={"None"}>No Options</MenuItem>) : (
                                        treatments.map((treatment, index) => {
                                            return (
                                                <MenuItem key={index} value={treatment}>{treatment}</MenuItem>
                                            )
                                        })
                                    )}
                                </Select>
                            </FormControl>

                        </Box>
                    </div>

                    <div>
                        <Box sx={{ width: "100%", marginBottom: "20px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Hospital</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={hosptype}
                                    label="hospType"
                                    name='hosptype'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Private"}>Private</MenuItem>
                                    <MenuItem value={"Government"}>Government</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <Button variant="outlined" onClick={showEstimate}>Submit</Button>
                </div>
                <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "30px" }}>
                    {estimate.length === 0 ? (<h3 style={{ fontFamily: "poppins", textAlign: "center" }}>No Data To Display</h3>) : (
                        estimate.map((estimate, index) => {
                            return (
                                <Box key={index} sx={{ height: "30vh", width: "40%", border: "1px solid black", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "30px", fontFamily: "poppins" }}>
                                    <Box>Hospital Name : {estimate.hospitalName}</Box>
                                    <Box>Hospital Type : {estimate.hospitalType}</Box>
                                    <Box>Location : {estimate.location}</Box>
                                    <Box>Treatment : {estimate.treatment}</Box>
                                    <Box>
                                        <span style={{marginRight: "4px"}}>Schemes To Apply : </span> 
                                        {estimate.schemesToApply.map((scheme, index) => {
                                            return (
                                                <Chip key={index} label={scheme} variant="outlined" sx={{ marginRight: "7px", color: "green" }} />
                                            )
                                        })}
                                    </Box>
                                    <Box>Estimated Cost : {estimate.estimatedcost}</Box>
                                </Box>
                            )
                        })

                    )}

                </div>
            </div>


        </>
    )
}

export default SelectField

