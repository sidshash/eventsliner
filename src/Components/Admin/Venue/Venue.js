import { Card, CardContent, CardMedia, Icon, Input } from '@material-ui/core';
import { Typography } from '@mui/material';
import { maxWidth } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import {React, useState, useEffect} from 'react'
import publicApi from '../../../utils/publicApi';

export default function Venue() {
    const [venues, setVenues] = useState([
        
    ]);
    useEffect(() => {
        publicApi('get', '/venue')
            .then(res => {
                setVenues(res.data);
            })
    }, [])
  return (
    <div className="container overflow-hidden w-full">
        <div className="search-bar flex fixed w-full bg-white">
            <Input className='searchbox w-full'/>
            <SearchIcon />
        </div>
        <div className="venue-container w-full h-screen bg-gray-200">
            {
                venues.map(venue => {
                    return(
                    <div className="venue-card bg-white flex-col rounded-lg p-1 m-1 w-fit">
                        <div className="card-image rounded-md">
                            <img src={venue.images[0]} alt="" className="bg-cover card-image rounded-md max-w-45 w-44" />
                        </div>
                        <div className="card-contents p-2">
                            <div className="card-name">
                                <p className="card-name font-bold">
                                    {venue.name}
                                </p>
                                <p className="card-address text-gray-500 text-xs">
                                    {venue.address}
                                </p>
                                <p className="card-cuisines text-black text-xs">
                                    {['Tea', 'Coffee'].join(', ')}
                                </p>
                            </div>
                            
                        </div>
                    </div>
                    )
                })
            }
            
        </div>
    </div>
    
  )
}

const Vcard = ({name, images, address, cuisines}) => {
    
}

const VenueCard = (props) => {
    const {name, menu, address, description, location, categories, cuisines, features, type, images} = props.venue 
}
