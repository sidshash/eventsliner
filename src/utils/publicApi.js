import axios from "axios"
import config from '../config.json'
export default async (method, url, data = null) => {
    try{
        const res = await axios({method : method, url : config.API + '/public' + url, data, withCredentials : true});
        return Promise.resolve(res.data);
    }catch(e){
        return Promise.reject(e.message);
    }

}