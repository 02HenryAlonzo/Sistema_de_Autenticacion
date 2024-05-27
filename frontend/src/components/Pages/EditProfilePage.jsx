import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { ProfileFormField } from "../Profile/ProfileFormField";
import { Navbar } from "../Profile/Navbar";
import { useNavigate } from "react-router-dom";
import { Message } from "../Messages/Message";

export const EditProfilePage = () => {
  const [profile, setProfile] = useState({
    profile_picture: "",
    username: "",
    email: "",
    password: "",
    birth_date: "",
    bio: "",
    location: "",
    social_media: "",
  });

  const [showMessage, setShowMessage] = useState({
    visible: false,
    type: "",
    message: "",
  });
  const [timeoutId, setTimeoutId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", profile.username);
      formData.append("email", profile.email);
      formData.append("password", profile.password || "");
      formData.append("birthDate", profile.birth_date);
      formData.append("bio", profile.bio);
      formData.append("location", profile.location);
      formData.append("socialMedia", profile.social_media);
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      console.log("Datos enviados:", Object.fromEntries(formData));
      const token = localStorage.getItem("token");
      await axiosInstance.put("/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Mostrar mensaje de éxito
      setShowMessage({
        visible: true,
        type: "success",
        message: "Perfil actualizado con éxito",
      });
      const timeoutIdSuccess = setTimeout(() => {
        setShowMessage({ visible: false, type: "", message: "" });
        navigate("/profile");
      }, 1500);
      setTimeoutId(timeoutIdSuccess);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      // Mostrar mensaje de error
      setShowMessage({
        visible: true,
        type: "error",
        message: "Error al actualizar el perfil",
      });
      const timeoutIdError = setTimeout(() => {
        setShowMessage({ visible: false, type: "", message: "" });
      }, 3000);
      setTimeoutId(timeoutIdError);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="bg-[#fafafb] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center px-5 pb-2 sm:p-0">
        <div className="w-full sm:flex sm:flex-col sm:items-center sm:mb-14 mb-3">
          <div className="sm:w-[800px] mt-10 mb-6">
            <button
              className="text-[#2d9cdb] hover:text-[#155c86] text-lg font-normal text-left"
              onClick={() => window.history.back()}
            >
              <i className="fa-solid fa-less-than text-sm mr-2"></i>
              Back
            </button>
          </div>

          <div className="sm:border-[1px] sm:border-gray-300 sm:rounded-2xl sm:shadow-lg sm:px-8 sm:py-5 sm:w-[800px] sm:h-[990px]">
            <h2 className="text-2xl font-normal mt-5">Change Info</h2>
            <p className="text-[13px] font-medium text-[#828282] mb-6">
              Changes will be reflected to every service
            </p>

            <div className="flex items-center gap-6 mb-5 sm:mb-8 cursor-pointer">
              <div className="relative">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : `http://localhost:3000/${profile.profile_picture}`
                  }
                  alt="Profile"
                  className="w-[82px] h-[82px] rounded-lg"
                />
                <div className="absolute top-[35px] right-[28px]">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <i className="fa-solid fa-camera-retro text-white text-2xl"></i>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <button className="uppercase text-[13px] text-[#828282] font-medium">
                change photo
              </button>
            </div>

            <ProfileFormField
              label="Name"
              type="text"
              value={profile.username}
              onChange={handleChange}
              name="username"
            />
            <ProfileFormField
              label="Email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              name="email"
            />
            <ProfileFormField
              label="Password"
              type="password"
              value={profile.password}
              onChange={handleChange}
              name="password"
            />
            <ProfileFormField
              label="Birth Date"
              type="date"
              value={profile.birth_date}
              onChange={handleChange}
              name="birth_date"
              className="pr-5 text-gray-400"
            />
            <ProfileFormField
              label="Bio"
              type="text"
              value={profile.bio}
              onChange={handleChange}
              name="bio"
              className="h-[90px]"
            />
            <ProfileFormField
              label="Location"
              type="text"
              value={profile.location}
              onChange={handleChange}
              name="location"
            />
            <ProfileFormField
              label="Social Media"
              type="text"
              value={profile.social_media}
              onChange={handleChange}
              name="social_media"
            />
            <Message
              message={showMessage.message}
              type={showMessage.type}
              visible={showMessage.visible}
              className="container mx-auto mb-[-30px] mt-[-10px]"
            />
            <button
              onClick={handleSave}
              className="text-white font-medium text-base w-20 h-10 bg-[#2f80ed] hover:bg-[#2f80ed]/75 rounded-lg mt-10"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
