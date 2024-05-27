import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { SocialMedia } from '../Auth/SocialMedia';
import { Form } from '../Auth/Form';
import { Message } from '../Messages/Message';
import { messages } from '../../utils/messages';
import { Link } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [visible, setVisible] = useState(false);

  const loginUser = async (userData) => {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data;
  };

  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setMessage(messages.successlogin);
      setMessageType('success');
      setVisible(true);
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || messages.defaultError);
      setMessageType('error');
      setVisible(true);
    },
  });

  const handleLogin = (userData) => {
    mutate(userData);
  };

  return (
    <div className="bg-gray-100 w-screen h-screen sm:overflow-hidden sm:flex sm:justify-center sm:items-center">
      <div className="flex flex-col justify-center bg-white w-full h-full p-9 sm:max-w-[470px] sm:max-h-[630px] sm:rounded-2xl sm:shadow-lg ">
        
        <div className="">
          <h2 className="text-2xl font-semibold">
            Login
          </h2>
        </div>

        {message && <Message message={message} type={messageType} visible={visible} className={"mb-[-30px] mt-[20px]"} />}
        <Form onSubmit={handleLogin} BtnName={"Login"} />

        <div className="text-center mt-10 sm:mt-5">
          <p className="text-gray-400 text-sm">
            or continue with these social profiles
          </p>
          <SocialMedia />
        </div>

        <div className="text-center mt-8">
          <p className="text-base text-gray-400">
            Don't have an account yet?
            <Link to="/" className="text-blue-400">
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
