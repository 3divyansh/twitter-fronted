import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { setProfile } from "../redux/ProfileSlice";

const useGetProfile = (id) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials:true
                });
                dispatch(setProfile(res.data.user)); 
            
                console.log(res);
                dispatch(getMyProfile(res.data.user));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyProfile();
    },[dispatch, id]);

    
};
export default useGetProfile;