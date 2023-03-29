import axios from "axios"
import config from '../config.json'
export default async (method, url, data) => {
    try{
        const res = await axios.post(config.API + '/public/token/refresh', null, {headers : {Authorization : "Bearer " + window.localStorage.getItem("accessToken")}, withCredentials : true});
        const {accessToken} = (await res).data;
        window.localStorage.setItem('accessToken', accessToken)
        const res2 = await axios({method : method, url : config.API + '/private' + url, withCredentials : true, data, headers : {Authorization : "Bearer " + window.localStorage.getItem("accessToken")}})
        return Promise.resolve(res2.data);
    }catch(e){
        return Promise.reject(e.message)
    }
}