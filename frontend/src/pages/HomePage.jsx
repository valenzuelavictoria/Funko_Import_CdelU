// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { GoogleLogin } from "@react-oauth/google"; // Importar GoogleLogin
// // import * as jwtDecode from "jwt-decode";
// // import logoImage from "../assets/logo.png";
// // import "../HomePage.css"; 

// // const HomePage = () => {
// //   const navigate = useNavigate();

// //   const handleGoogleLogin = (response) => {
// //     if (response?.credential) {
// //       console.log("Token recibido de Google:", response.credential);
// //       fetch("http://localhost:8000/api/auth/google", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ token: response.credential }),
// //       })
// //         .then((res) => res.json())
// //         .then((data) => {
// //           console.log("Respuesta del backend:", data);
// //           if (data.user?.rol) {
// //             navigate("/admin");
// //           } else {
// //             navigate("/user");
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Error al autenticar:", error);
// //         });
// //     } else {
// //       console.error("No se recibió el token de Google.");
// //     }
// //   };
  
  

// //   return (
// //     <div className="home-container-HP">
// //       {/* Logo */}
// //       <div className="logo-containerHP">
// //         <img src={logoImage} alt="Logo" className="logoHP" />
// //       </div>

// //       {/* Texto "Iniciar sesión" */}
// //       <h1 className="login-textHP">Iniciar sesión</h1>

// //       {/* Botón de Google */}
// //       <GoogleLogin 
// //         onSuccess={handleGoogleLogin} 
// //         onError={() => console.log("Error en login con Google")} 
// //         useOneTap
// //       />
// //     </div>
// //   );
// // };

// // export default HomePage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import logoImage from "../assets/logo.png";
// import "../HomePage.css";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [userData, setUserData] = useState({
//     nombreCompleto: "",
//     dni: "",
//     direccion: "",
//   });

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");
//     if (userEmail) {
//       navigate("/user"); // Solo redirigir si el usuario ya ha iniciado sesión antes
//     }
//   }, [navigate]);

//   const handleGoogleLogin = (response) => {
//     if (response?.credential) {
//       console.log("Token recibido de Google:", response.credential);
//       fetch("http://localhost:8000/api/auth/google", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: response.credential }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("Respuesta del backend:", data);
//           localStorage.setItem("userEmail", data.user.email); // Guardar email en localStorage

//           if (!data.user.dni || !data.user.direccion) {
//             setShowModal(true); // Mostrar el formulario si faltan datos
//           } else {
//             data.user.rol ? navigate("/admin") : navigate("/user");
//           }
//         })
//         .catch((error) => console.error("Error al autenticar:", error));
//     } else {
//       console.error("No se recibió el token de Google.");
//     }
//   };

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     const email = localStorage.getItem("userEmail");
//     fetch("http://localhost:8000/api/auth/update-user", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...userData, email }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setShowModal(false);
//         navigate("/user");
//       })
//       .catch((error) => console.error("Error al guardar datos:", error));
//   };

//   return (
//     <div className="home-container-HP">
//       <div className="logo-containerHP">
//         <img src={logoImage} alt="Logo" className="logoHP" />
//       </div>
//       <h1 className="login-textHP">Iniciar sesión</h1>
//       <GoogleLogin 
//         onSuccess={handleGoogleLogin} 
//         onError={() => console.log("Error en login con Google")} 
//         useOneTap
//       />

//       {/* Ventana emergente para completar datos */}
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Completa tu información</h2>
//             <input type="text" name="nombreCompleto" placeholder="Nombre Completo" onChange={handleChange} />
//             <input type="text" name="dni" placeholder="DNI" onChange={handleChange} />
//             <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} />
//             <button onClick={handleSubmit}>Guardar</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logoImage from "../assets/logo.png";
// import "../HomePage.css"; // Asegúrate de que las clases en este archivo estén bien

// import { GoogleLogin } from '@react-oauth/google';

// function HomePage() {
//   const handleLoginSuccess = (response) => {
//     const token = response.credential;
//     // Hacer la petición a tu backend para autenticar el token
//     fetch('http://tu-api.com/api/google-login/', {
//       method: 'POST',
//       body: JSON.stringify({ token }),
//       headers: { 'Content-Type': 'application/json' },
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.user.profile_completed) {
//         // Redirigir a la página principal si el perfil está completo
//         window.location.href = "/home";
//       } else {
//         // Redirigir a la página de completar perfil si no está completo
//         window.location.href = "/completar-perfil";
//       }
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-6">Iniciar sesión</h1>
//         <GoogleLogin
//           onSuccess={handleLoginSuccess}
//           onError={() => console.log('Login Failed')}
//           useOneTap
//         />
//       </div>
//     </div>
//   );
// }

// export default HomePage;



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import "../HomePage.css"; 

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Si ya hay sesión, ir directamente a la vista de usuario
      navigate("/user");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center">
        <img src={logoImage} alt="Logo" className="w-40 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-6">Bienvenido</h1>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg" 
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default HomePage;
