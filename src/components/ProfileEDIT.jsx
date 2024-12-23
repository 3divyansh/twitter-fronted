import React, { useState } from 'react';

function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user.avatarUrl);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="flex flex-col ">
        <img
          src={profileImage}
          alt={user.name}
          className="rounded-full w-24 h-24 object-cover"
        />
        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
        <p className="mt-2 text-gray-500">@{user.username}</p>
        <button
          className="w-56 mt-4 text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleEditClick}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      {isEditing && (
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
          <button
            onClick={handleSaveClick}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
