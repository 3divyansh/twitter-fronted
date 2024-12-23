import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { updateProfile } from "../redux/ProfileSlice";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfileImage, setTempProfileImage] = useState(null);
  const { profileData: profile } = useSelector((store) => store.profile);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveClick = async () => {
    try {
      const updatedProfileData = {
        name: profile.name,
        username: profile.username,
        profileImage: tempProfileImage || profile.profileImage,
        
      };
   
      console.log("Sending request with data: ", updatedProfileData); 
  
      const res = await axios.put(
        `${USER_API_END_POINT}/editprofile/${id}`,
        updatedProfileData,
        { withCredentials: true }
      );
  
      console.log("Response from server: ", res.data); 
  
      dispatch(updateProfile(res.data.updatedProfile));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error occurred during the API request: ", error); 

      if (error.response) {
     
        console.error("Server error response: ", error.response); 
        toast.error(`Failed to update profile: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
     
        console.error("No response received from server: ", error.request);
        toast.error("Failed to update profile: No response from server.");
      } else {
       
        console.error("Error message: ", error.message);
        toast.error(`Failed to update profile: ${error.message}`);
      }
    }
  };
  

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 post</p>
          </div>
        </div>
        <img
          src="https://pbs.twimg.com/profile_banners/1501755294745260034/1720419570/1500x500"
          alt="banner"
        />
        <div className="absolute top-40 ml-2 border-4 border-white rounded-full">
          <Avatar
            src={tempProfileImage || profile.profileImage}
            size="120"
            round={true}
            className="rounded-full w-24 h-24 object-cover"
          />
        </div>
        <div className="text-right m-4">
          <button
            className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400 font-medium text-gray-700"
            onClick={handleEditClick}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
        {isEditing && (
          <div className="mt-10">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-5"
            />
            <button
              onClick={handleSaveClick}
              className="text-gray-700 font-medium hover:bg-gray-200 p-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            🌐 Exploring the web's endless possibilities with MERN Stack 🚀 |
            Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me
            on this coding journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
