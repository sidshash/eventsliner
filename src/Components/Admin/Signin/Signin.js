import {React, useState} from 'react'
import { Button, FormGroup } from '@mui/material'
import publicApi from '../../../utils/publicApi'
import { useNavigate } from 'react-router-dom'
import { FormControl, Input } from '@material-ui/core'

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  return (
    <div>
        <FormGroup>
            <FormControl>
            <h1>Login</h1>
            <Input type="text" placeholder='email' value={email}
            onChange={e => setEmail(e.target.value)}
            />
            </FormControl>
            <FormControl>
                <Input type="password" placeholder='password' value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </FormControl>
            <Button onClick={async () => {
            try{
                const res = await publicApi('post', '/admin/signin', {email, password});
                const {accessToken, refreshToken} = res.data
                document.cookie="refreshToken=" + refreshToken;
                localStorage.setItem('accessToken', accessToken);
                navigate('/venue/create')
            }catch(e){
                alert(e);
            }
        }} >Login</Button>
        </FormGroup>
    </div>
  )
}
