import { Card, CardContent, CardMedia, Icon, Input } from '@material-ui/core';
import { Typography } from '@mui/material';
import { maxWidth } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import {React, useState, useEffect} from 'react'
import publicApi from '../../../utils/publicApi';
import { useNavigate } from 'react-router-dom';
import logo from '../../../Assets/logo.png'

export default function Venue() {
    const [venues, setVenues] = useState([
        
    ]);

    const navigate = useNavigate()
    useEffect(() => {
        publicApi('get', '/venue' + window.location.search)
            .then(res => {
                setVenues(res.data);
            })
    }, [])
  return (
    <div className="container overflow-y-auto w-screen">
        <div className="header flex-col fixed bg-white w-screen">
            <div className='flex justify-center'>
                {/* <img src={logo} className='h-20' alt="logo" /> */}
                <p className='text-center font-bold text-xl'>Eventsliner</p>
            </div>
            <div className="search-bar flex w-full ">
                <Input className='searchbox w-full'/>
                <SearchIcon />
            </div>
        </div>
        <div className="venue-container w-screen h-screen flex-col my-16 bg-gray-200">
            <p>Venues Near You</p>
            {
                venues.map(venue => {
                    return(
                    <div onClick={() => {
                        navigate('/venue/' + venue.id)
                    }} className="bg-white rounded-lg p-1 h-fit m-2 shadow-md">
                        <div className="card-image rounded-md">
                            <img src={venue.images[0]} alt="" className="bg-cover card-image rounded-md h-56 w-screen object-cover" height={10} />
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
                                    {venue.cuisines.join(', ')}
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
