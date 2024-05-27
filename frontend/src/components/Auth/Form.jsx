import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/validation';
import { messages } from '../../utils/messages';
import { Message } from '../Messages/Message';

export const Form = ({ BtnName, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!validateEmail(email)) {
      formErrors.email = messages.emailInvalid;
    }
    if (!validatePassword(password)) {
      formErrors.password = messages.passwordInvalid;
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setVisible(true);
    } else {
      setErrors({});
      setVisible(false);
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-9">
      {errors.email && (
        <Message message={errors.email} type="error" visible={visible} className='mt-[-20px]'  />
      )}
      <div className="mb-8 flex h-12 sm:h-11 border-2 rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
        <span className="inline-flex items-center pl-3 text-gray-400 text-2xl">
          <i className="fa-solid fa-envelope"></i>
        </span>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="flex-1 border-0 py-2 px-4 text-base focus:outline-none rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-14 sm:mb-14 flex h-12 sm:h-11 border-2 rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
        <span className="inline-flex items-center pl-3 text-gray-400 text-2xl">
          <i className="fa-solid fa-unlock-keyhole"></i>
        </span>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="flex-1 border-0 py-2 px-4 text-base focus:outline-none rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors.password && (
        <Message message={errors.password} type="error" visible={visible} className="mt-[-55px]" />
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold text-base py-3 sm:py-2 rounded-lg hover:bg-blue-500/75"
      >
        {BtnName}
      </button>
    </form>
  );
};
