import {React, useState} from 'react'
import {FormGroup, InputLabel, FormControl, Input, Button, Switch} from '@material-ui/core'
import privateApi from '../../../../utils/privateApi';
import storage from '../../../../firebaseConfig';
import Select from 'react-select';
import cuisineOptions from './cuisines'
import featureOptions from './features'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import options from './categories'
export default function Create() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [reservationRequired, setReservationRequired] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(["", ""]);
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [menu, setMenu] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [menuFiles, setMenuFiles] = useState('');
  const [percent, setPercent] = useState('0%');
  const [averageCost, setAverageCost] = useState('')
  const [bestSeller, setBestSeller] = useState('');


  const onSubmit = async () => {
    console.log(name, address, mobile, website, timeFrom, timeTo, reservationRequired, categories, cuisines, features);
    try{
      const res = await privateApi('post', '/venue/create', {
        name,
        address,
        mobile,
        website,
        opensAt : timeFrom,
        closesAt : timeTo,
        reservationRequired,
        description,
        location,
        categories,
        images,
        menu,
        categories,
        cuisines,
        features,
        bestSeller,
        averageCost
      });
      alert(res.message)
    }catch(e){
      alert(e)
    }
    
  }

  const handleImagesUpload = async () => {
    for(const file of imageFiles){
      await uploadImage('/images', file)
    }
    alert('uploaded images');
    console.log(images)
  }

  const handleMenuUpload = async () => {
    for(const file of menuFiles){
      await uploadImage('/menus', file)
    }
    alert('uploaded menus')
    setTimeout(console.log(menu), 1000)
  }

  const uploadImage = (path, file) => {
    return new Promise((res, rej) => {
      const storageRef = ref(storage, `/${path}/${name}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed', 
      (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
 
            // update progress
            setPercent(percent);
        },
        (err) => rej(err.message),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                if(path == '/images'){
                    let arr = [...images];
                    arr.push(url);
                    setImages(arr);
                    res('ok')
            }else{
              let arr = [...menu];
              arr.push(url);
              setMenu(arr);
                   res('ok')
            }
            });
        }
    )
    })
    
  }


  return (
    <FormGroup>
      <h2>Add Venue</h2>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input value={name} onChange={e => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Address</InputLabel>
        <Input value={address} onChange={e => setAddress(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Phone Number</InputLabel>
        <Input value={mobile} onChange={e => setMobile(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Website</InputLabel>
        <Input value={website} onChange={e => setWebsite(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Best Seller</InputLabel>
        <Input value={bestSeller} onChange={e => setBestSeller(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Average Cost</InputLabel>
        <Input value={averageCost} onChange={e => setAverageCost(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Description</InputLabel>
        <Input value={description} onChange={e => setDescription(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Latitude</InputLabel>
        <Input value={location[0]} onChange={e => {
          let arr = [...location];
          arr[0] = e.target.value;
          setLocation(arr);
        }} />
      </FormControl>
      <FormControl>
        <InputLabel>Longitude</InputLabel>
        <Input value={location[1]} onChange={e => {
          let arr = [...location];
          arr[1] = e.target.value;
          setLocation(arr);
        }} />
      </FormControl>
        <InputLabel> Categories </InputLabel>
          <Select onChange={e => setCategories(e.map(n => n.label))} isMulti options={options}></Select>
          <Select onChange={e => setCuisines(e.map(n => n.label))} isMulti options={cuisineOptions}></Select>
          <Select onChange={e => setFeatures(e.map(n => n.label))} isMulti options={featureOptions}></Select>
      <FormControl>
        <InputLabel>Images {percent}</InputLabel>
        <Input type='file' onChange={e => {
          let files = [...imageFiles];
          files.push(e.target.files[0]);
          setImageFiles(files);
          console.log(files);
        }} />
      </FormControl>
      <Button onClick={handleImagesUpload}>Upload Images</Button>
      <FormControl>
        <InputLabel>Menu {percent}</InputLabel>
        <Input type='file' onChange={e => {
          let files = [...menuFiles];
          files.push(e.target.files[0]);
          setMenuFiles(files);
          console.log(files);
        }} />
      </FormControl>
      <Button onClick={handleMenuUpload}>upload menu</Button>
      <FormControl>
        <InputLabel>Time From</InputLabel>
        <Input type='time' value={timeFrom} onChange={e=> setTimeFrom(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel>Time To</InputLabel>
        <Input type='time' value={timeTo} onChange={e => setTimeTo(e.target.value)}/>
      </FormControl>
      <FormControl>
        <InputLabel>Reservation Required</InputLabel>
        <Switch checked={reservationRequired} onChange={e => setReservationRequired(e.target.checked)}/>
      </FormControl>
     <Button variant='contained' onClick={onSubmit} color='blue'>Submit</Button>
    </FormGroup>
  )
}
