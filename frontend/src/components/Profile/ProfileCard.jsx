import React from "react";
import { ProfileField } from "./ProfileField";
import { Link } from "react-router-dom";

export const ProfileCard = ({ profile }) => {
  return (
    <div className="sm:border-[1px] sm:border-gray-300 sm:rounded-2xl sm:shadow-lg sm:px-8 sm:py-5 sm:w-[800px] sm:h-[520px]">
      <div className="flex justify-between items-center mb-4 sm:mb-0 sm:border-b-2 sm:border-gray-300 sm:pb-6">
        <div>
          <h2 className="text-2xl font-normal">Profile</h2>
          <p className="text-[13px] text-gray-500 font-medium w-44 sm:w-80">
            Some info may be visible to other people
          </p>
        </div>
        <Link to="/update">
          <button className="w-24 h-9 border-2 border-gray-300 rounded-xl font-medium text-gray-400 hover:border-gray-900 hover:text-gray-900">
            Edit
          </button>
        </Link>
      </div>
      <div>
        <ProfileField
          label="photo"
          value={
            <img
              src={`http://localhost:3000/${profile.profile_picture}`}
              alt="Profile"
              className="w-16 h-16 rounded-lg"
            />
          }
        />
        <ProfileField label="name" value={profile.username} />
        <ProfileField label="email" value={profile.email} />
        <ProfileField label="password" value="************" />
        <ProfileField label="birth date" value={profile.birth_date} />
        <ProfileField label="bio" value={profile.bio} />
        <ProfileField label="location" value={profile.location} />
        <ProfileField label="social media" value={profile.social_media} />
      </div>
    </div>
  );
};
