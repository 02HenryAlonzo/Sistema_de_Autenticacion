import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { SocialMedia } from '../Auth/SocialMedia';
import { Form } from '../Auth/Form';
import { Message } from '../Messages/Message';
import { messages } from '../../utils/messages';
import { Link } from 'react-router-dom';


export const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [visible, setVisible] = useState(false);

  const registerUser = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  };

  const { mutate } = useMutation(registerUser, {
    onSuccess: () => {
      setMessage(messages.successregister);
      setMessageType('success');
      setVisible(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || messages.defaultError);
      setMessageType('error');
      setVisible(true);
    },
  });

  const handleRegister = (userData) => {
    mutate(userData);
  };

  return (
    <div className="bg-gray-100 w-screen h-screen sm:overflow-hidden sm:flex sm:justify-center sm:items-center">
      <div className="bg-white w-full h-full p-8 sm:max-w-[470px] sm:max-h-[670px] sm:rounded-2xl sm:shadow-lg ">
        <div className="mt-4 mb-5 sm:mt-2 sm:mb-14">
          <h2 className="text-2xl font-semibold mb-5 sm:mb-0">
            Join thousands of learners from around the world
          </h2>
          <p className="text-gray-900 mt-8 sm:mt-4">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>

        {message && <Message message={message} type={messageType} visible={visible} />}
        <Form onSubmit={handleRegister} BtnName={"Start coding now"} />

        <div className="text-center mt-10 sm:mt-3">
          <p className="text-gray-400 text-sm">
            or continue with these social profiles
          </p>
          <SocialMedia />
        </div>

        <div className="text-center mt-8">
          <p className="text-base text-gray-400">
            Already a member?
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>

        <footer className="flex justify-between mt-10 text-sm text-gray-400">
          <p>Henry A.</p>
          <p>GitHub</p>
        </footer>
      </div>
    </div>
  );
};
