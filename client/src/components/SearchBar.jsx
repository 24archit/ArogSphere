import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, ListItemText, MenuItem, MenuList } from "@mui/material";

const SearchBar = ({ onLocationSelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [search, setSearch] = useState(false);

    // Fetch location suggestions when button is clicked
    const handleSearch = async () => {
        if (query.length > 2) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
                );
                const data = await response.json();
                setSuggestions(data);
                setSearch(true); // Show suggestions after search
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        } else {
            setSuggestions([]);
            setSearch(false);
        }
    };

    // Handle user selection
    const handleSelectLocation = (event, newValue) => {
        if (newValue) {
            const selectedPlace = suggestions.find(
                (place) => place.display_name === newValue
            );
            if (selectedPlace) {
                const { lat, lon, display_name } = selectedPlace;
                onLocationSelect(lat, lon, display_name);
                setQuery(display_name);
                setSuggestions([]); // Clear suggestions after selection
                setSearch(false);
            }
        }
    };

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
            sx={{backgroundColor: "white",color: "black"}}
                freeSolo
                options={search ? suggestions.map((option) => option.display_name) : []}
                onChange={handleSelectLocation}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Location"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} // Only update query, do not fetch here
                    />
                )}
            />
            <Button onClick={handleSearch} variant="outlined">Search</Button>
            
            {/* Show message when no results are found after search */}
            {search && suggestions.length === 0 && (
                <div style={{ fontFamily: "Poppins" }}>No Item Matched</div>
            )}
        </Stack>
    );
};

export default SearchBar;
