import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/slices/authSlice';// Ensure this imports your CSS file where you added the font import

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [values, setValues] = useState({
    name: '',
    password: '',
  });

  const dispatch = useDispatch();

  // Update values whenever username or password changes
  useEffect(() => {
    setValues({ name: username, password: password });
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (

   <div className="bg-[url('https://mybigplunge.com/wp-content/uploads/2021/05/online_shopping.jpeg')] bg-fixed bg-cover bg-center h-screen flex justify-center items-center">
       
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-lg justify-center itemsrounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <iframe
              src="https://lottie.host/embed/b6be7fd1-c216-41f1-a109-b8d838c40e8f/FiwdAa1YDM.json"
              width="200"
              height="200"
              style={{ border: 'none' }}
              allowFullScreen
            ></iframe>
          </div>
          <h1 className="text-2xl font-bold text-black mt-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Welcome Back!
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black-200 text-sm font-bold mb-2"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
              required
              style={{ fontFamily: 'Roboto, sans-serif' }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black-500 text-sm font-bold mb-2"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
              style={{ fontFamily: 'Roboto, sans-serif' }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
