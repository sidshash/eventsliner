import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import publicApi from '../../../../utils/publicApi';

export default function (props) {
  const params = useParams();
  const [venue, setVenue] = useState({
    name : '',
    address :'',
    location : [],
    description : '',
    categories : [],
    cuisines : [],
    type : [],
    images: [],
    menu : [],
    features : [],
    bestSeller : "",
    averageCost : ""
  })
  const {id} = params;
  useEffect(() => {
    publicApi('get', '/venue/' + id)
      .then(res => {
        setVenue(res.data);
      })
  }, [])

  return(
    <div className="container h-screen bg-gray-200">
      <div className="image-gallery flex overflow-x-auto h-96">
        {
        venue.images.map(image => {
          return(<img className='object-cover' src={image}/>)
        })
        }
      </div>
      <div className='p-3 bg-white m-2 rounded-md shadow-md'>
        <p className='font-bold text-xl'>{venue.name}</p>
        <div className=''>
        <p className='text-xs text-gray-500'>{venue.address}</p>
        <p className='my-2 text-sm text-gray-500'>₹{venue.averageCost} for 2</p>
        <p className='text-sm font-bold'>{venue.cuisines.join(', ')}</p>
        </div>
        
      </div>
      <div className='p-3 bg-white m-2 rounded-md shadow-md'>
        <p className='font-bold text-xl'>About</p>
        <div className='p-2'>
        <p className=' '>Cuisine</p>
        <p className='text-sm text-gray-500'>{venue.cuisines.join(', ')}</p>
        <p className=' '>Average Cost for 2 Person</p>
        <p className='my-2 text-sm text-gray-500'>₹{venue.averageCost}</p>
        <p className=' '>Features</p>
        <p className='text-sm text-gray-500'>{venue.features.join(', ')}</p>
        </div>
        
      </div>
    </div>
  )
  
}

const Venue = ({venue}) => {
  return (
    <div className="venuepage-container">
      <p className="name">name : {venue.name}</p>
      <p className="name">address : {venue.address}</p>
      <p className="name">location : {venue.location.join(',')}</p>
      <p className="name">description : {venue.description}</p>
        images : {venue.images.map(n => <img src={n} width={200} height={200}></img>)}
        menu : {venue.menu.map(n => <img src={n} width={200} height={200}></img>)}
      <p className="name">categories : {venue.categories.join(', ')}</p>
      <p className="name">cuisines : {venue.cuisines.join(', ')}</p>
      <p className="name">features : {venue.features.join(', ')}</p>
      <p className="name">type : {venue.type.join(', ')}</p>
      <p className="name">best Seller : {venue.bestSeller}</p>
      <p className="name">Averagge Cost : {venue.averageCost}</p>
    </div>
  )
}
