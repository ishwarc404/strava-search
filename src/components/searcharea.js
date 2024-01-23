import './searcharea.css';
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";
import axios from 'axios';
import {Spinner} from "@nextui-org/react";

function SearchArea() {
    const [spinnerActive, setSpinnerActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function searchQueryHandler(e){
        setSearchQuery(e.target.value)
    }

    function handleSearchClick() {
        setSpinnerActive(true)
        const requestData = { query: searchQuery };
        
        axios.post('http://127.0.0.1:5000/search', requestData)
            .then(response => {
                setSearchResult(response.data.filterActivity);
                setSpinnerActive(false)
            })
            .catch(error => {
                console.error("Error during API call", error);
            });
    }

    const mapboxAccessToken = "pk.eyJ1IjoiaXNod2FyYzQwNCIsImEiOiJjbGY0czRwdTEwMDk2M3BqeGhxcmgxem55In0.es5t51shhzQiZqn7ldY9yw";

    function getMapboxImageUrl(encodedPolyline) {
        const style = "mapbox/streets-v11"; // or any other style you prefer
        const width = 300;  // Adjust the image size as needed
        const height = 250; // Adjust the image size as needed
    
        // Decode the encoded polyline
        const decodedPolyline = decodeURIComponent(encodedPolyline);
        const urlEncodedPolyline = encodeURIComponent(decodedPolyline);

        const path = `path-5+fc5200(${urlEncodedPolyline})`;
        const baseUrl = "https://api.mapbox.com/styles/v1";
        const url = `${baseUrl}/${style}/static/${path}/auto/${width}x${height}?access_token=${mapboxAccessToken}`;
        console.log(url);
        return url;
    }


    return (
        <div className="searcharea">
            <div className='search-title d-flex justify-content-center'>What would you like to search for?</div>
            <div className='search-field d-flex justify-content-center'>
                <Input
                    type=""
                    color='success'
                    variant='bordered'
                    label="Seach"
                    placeholder="Show me my trail runs which took me around an hour.."
                    defaultValue=""
                    className="max-w-[25vw]"
                    onChange={searchQueryHandler}
                />
                 <Button color="success" className='search-button' variant="bordered" size="lg" onClick={handleSearchClick} isLoading={spinnerActive}>
                    Search
                </Button>  
            </div>
            <div className="results">
                {searchResult.length > 0 ? (
                    <div className='activities d-flex justify-content-center'>
                        {searchResult.map(activity => (
                            <div className='activity-box' key={activity.id}>
                                <div>{activity.name}</div>
                                <div className='d-flex justify-content-start'>
                                    <div>{activity.distance} meters</div>
                                    <div>{(activity.elapsedTime / 3600).toFixed(1)} hours</div>
                                    <div>{(activity.totalElevationGain ).toFixed(1)} meters</div>
                                </div>
                                <div>
                                    {activity.summaryPolyline && 
                                        <img src={getMapboxImageUrl(activity.summaryPolyline)} alt="Map Route" />
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div>
            <div>
            </div>
        </div>
    );
}

export default SearchArea;
