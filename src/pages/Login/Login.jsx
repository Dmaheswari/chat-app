// import React, { useState } from 'react';
// import './Login.css';
// import assets from '../../assets/assets';
// import { signup } from '../../config/firebase';

// const Login = () => {
//   const [currState, setCurrState] = useState("Sign up");
  
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//     if (currState === "Sign up") {
//       signup(userName, email, password);
//     } else {
//       // Add login logic here if required in the future
//     }
//   };

//   return (
//     <div className='login'>
//       <img src={assets.logo_big} alt="" className='logo' />
//       <form className='login-form' onSubmit={onSubmitHandler}>
//         <h2>{currState}</h2>
//         {currState === "Sign up" ? (
//           <input
//             onChange={(e) => setUserName(e.target.value)}
//             value={userName}
//             type='text'
//             placeholder='Username'
//             className='form-input'
//             required
//           />
//         ) : null}
//         <input
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           type='email'
//           placeholder='Email address'
//           className='form-input'
//           required
//         />
//         <input
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//           type='password'
//           placeholder='Password'
//           className='form-input'
//           required
//         />
//         <button type='submit'>{currState === "Sign up" ? "Create account" : "Login now"}</button>
//         <div className='login-term'>
//           <input type="checkbox" required />
//           <p>Agree to the terms of use & privacy policy.</p>
//         </div>
//         <div className='login-forgot'>
//           {currState === "Sign up" ? (
//             <p className='login-toggle'>
//               Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
//             </p>
//           ) : (
//             <p className='login-toggle'>
//               Create an account? <span onClick={() => setCurrState("Sign up")}>Click here</span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import './Login.css';
import assets from '../../assets/assets';
import { signup } from '../../config/firebase';

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // state for the success/error message
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const navigate = useNavigate();  // Initialize the navigate function

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign up") {
      // Sign up logic
      signup(userName, email, password)
        .then(() => {
          // On successful sign-up, show success message
          setMessage("Account created successfully!");
          setMessageType("success"); // success type
          setTimeout(() => {
            // Switch to Login after 2 seconds
            setCurrState("Login");
            setMessage("");  // Clear the success message when switching to Login
            setMessageType(""); // Clear message type
            // Clear the input fields after successful sign-up
            setUserName(""); 
            setEmail(""); 
            setPassword(""); 
          }, 2000);
        })
        .catch((error) => {
          // If there's an error, show error message
          setMessage(`Error: ${error.message}`);
          setMessageType("error"); // error type
        });
    } else {
      // Login logic (For now, showing success message without real login logic)
      setMessage("Login successful!"); // Add login success message
      setMessageType("success"); // success type
      setTimeout(() => {
        // After login success, redirect to Chat page
        navigate('/chat');  // This will redirect to the Chat page
      }, 2000);  // Wait for 2 seconds before redirecting
    }
  };

  // Reset the message when switching to Login
  const handleStateChange = (newState) => {
    setCurrState(newState);
    if (newState === "Login") {
      setMessage(""); // Clear message when switching to login
      setMessageType(""); // Clear message type
    }
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="Logo" className='logo' />
      <form className='login-form' onSubmit={onSubmitHandler}>
        <h2>{currState}</h2>

        {/* Show the success or error message */}
        {message && (
          <div className={`login-message ${messageType}`}>
            {message}
          </div>
        )}

        {/* Show username input only when in 'Sign up' state */}
        {currState === "Sign up" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />

        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login now"}
        </button>

        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => handleStateChange("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account?{" "}
              <span onClick={() => handleStateChange("Sign up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
