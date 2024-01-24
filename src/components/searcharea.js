import './searcharea.css';
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import axios from 'axios';
import {Spinner} from "@nextui-org/react";

function SearchArea({athleteId}) {
    const [spinnerActive, setSpinnerActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function searchQueryHandler(e){
        setSearchQuery(e.target.value)
    }

    function handleSearchClick() {
        setSpinnerActive(true)
        const requestData = { athleteId: athleteId, query: searchQuery };
        
        axios.post('https://strava-chat-backend-little-frost-1318.fly.dev/search', requestData)
            .then(response => {
                setSearchResult(response.data.filterActivity);
                setSpinnerActive(false)
            })
            .catch(error => {
                console.error("Error during API call", error);
                setSpinnerActive(false)

            });
    }

    const mapboxAccessToken = "pk.eyJ1IjoiaXNod2FyYzQwNCIsImEiOiJjbGY0czRwdTEwMDk2M3BqeGhxcmgxem55In0.es5t51shhzQiZqn7ldY9yw";

    function getMapboxImageUrl(encodedPolyline) {
        const style = "mapbox/streets-v11"; 

        // Calculate width and height based on the viewport width
        const viewportWidth = window.innerWidth;
        let width, height;

        // Adjust these values according to your layout needs
        if (viewportWidth > 800) { // for larger screens
            width = 330;
            height = 200;
        } else if (viewportWidth > 500) { // for medium screens
            width = 230;
            height = 100;
        } else { // for smaller screens
            width = 130;
            height = 50;
        }

        // Decode the encoded polyline
        const decodedPolyline = decodeURIComponent(encodedPolyline);
        const urlEncodedPolyline = encodeURIComponent(decodedPolyline);

        const path = `path-3+fc5200(${urlEncodedPolyline})`;
        const baseUrl = "https://api.mapbox.com/styles/v1";
        const url = `${baseUrl}/${style}/static/${path}/auto/${width}x${height}?access_token=${mapboxAccessToken}`;
        return url;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
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
                    defaultValue="show me my trail runs from 2023"
                    className="max-w-[25vw]"
                    onChange={searchQueryHandler}
                />
                 <Button color="success" className='search-button' variant="bordered" size="lg" onClick={handleSearchClick} isLoading={spinnerActive}>
                    Search
                </Button>  
            </div>
            <div className='activities-found'>{searchResult.length > 0 ? searchResult.length + ' activities found.' : 'No results found, try again please.'}</div>
            <div className="results  d-flex justify-content-center">
                {searchResult.length > 0 ? (
                    <div className='activities d-flex justify-content-center'>
                        {searchResult.map(activity => (
                            <div className='activity-box' key={activity.id}>
                                <div className='activity-name d-flex justify-content-start'>{activity.name}</div>
                                <div className='activity-date d-flex justify-content-start'>{activity.sportType} : {formatDate(activity.startDate)}</div>
                                <div className='activity-details d-flex justify-content-start'>
                                    <div>
                                        <div className='metric-title'>Distance</div>
                                        <div className='activity-distance'>{(activity.distance / 1000).toFixed(1)} km</div> 
                                    </div>
                                    <div className='metric-divider'/>
                                    <div>
                                        <div className='metric-title'>Time</div>
                                        <div className='activity-time'>
                                            {Math.floor(activity.elapsedTime / 3600)}h {Math.floor((activity.elapsedTime % 3600) / 60)}m
                                        </div>
                                    </div>
                                    <div className='metric-divider'/>
                                    <div>
                                        <div className='metric-title'>Elev Gain</div>
                                        <div className='activity-elevation-gain'>{(activity.totalElevationGain ).toFixed(1)} m</div>
                                    </div>
                                </div>
                                <div className='activity-map'>
                                    {activity.summaryPolyline && 
                                        <img src={getMapboxImageUrl(activity.summaryPolyline)} alt="Map Route" />
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
            <div>
            </div>
        </div>
    );
}

export default SearchArea;
