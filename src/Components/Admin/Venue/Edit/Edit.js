import {React, useState} from 'react'
import { Input, FormGroup, FormControl, InputLabel } from '@material-ui/core'
import Select from 'react-select';
import {Button, Switch} from '@material-ui/core';
import options from '../Create/categories';
import cuisineOptions from '../Create/cuisines';
import featureOptions from '../Create/features'
export default function Edit() {

    const [venue, setVenue] = useState({
        name : '',
        address : '',
        mobile : "",
        website : "",
        bestSeller : "",
        averageCost: '',
        description : "",
        location : ["", ""],
        menu : [],
        timeFrom : "",

    })

  return (
    <FormGroup className='p-3'>
      <h2>Add Venue</h2>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input value={venue.name} />
      </FormControl>
      <FormControl>
        <InputLabel>Address</InputLabel>
        <Input value={venue.address} />
      </FormControl>
      <FormControl>
        <InputLabel>Phone Number</InputLabel>
        <Input value={venue.mobile} />
      </FormControl>
      <FormControl>
        <InputLabel>Website</InputLabel>
        <Input value={venue.website}  />
      </FormControl>
      <FormControl>
        <InputLabel>Best Seller</InputLabel>
        <Input value={venue.bestSeller} />
      </FormControl>
      <FormControl>
        <InputLabel>Average Cost</InputLabel>
        <Input value={venue.averageCost} />
      </FormControl>
      <FormControl>
        <InputLabel>Description</InputLabel>
        <Input value={venue.description}  />
      </FormControl>
      <FormControl>
        <InputLabel>Location</InputLabel>
        <Input value={venue.location.join(', ')}/>
      </FormControl>
      <div className="categories p-3">
      <InputLabel> Categories </InputLabel>
          <Select className='m-2'  isMulti options={options}></Select>
          <Select className='m-2'  options={cuisineOptions}></Select>
          <Select className='m-2' isMulti options={featureOptions}></Select>
      </div>

      <FormControl>
        <InputLabel>Images</InputLabel>
        <Input value={venue.images}></Input>
      </FormControl>
      <FormControl>
        <InputLabel>Menu</InputLabel>
        <Input value={venue.menu}></Input>
      </FormControl>
      <FormControl>
        <InputLabel>Time From</InputLabel>
        <Input type='time' value={venue.timeFrom} />
      </FormControl>
      <FormControl>
        <InputLabel>Time To</InputLabel>
        <Input type='time' value={venue.timeTo} />
      </FormControl>
      <FormControl>
        <Switch className='m-2' checked={venue.reservationRequired} />
        <p>Reservation Required?</p>
      </FormControl>
     <Button className={'block'} variant={'contained'} color='blue'>Submit</Button>
    </FormGroup>
  )
}
