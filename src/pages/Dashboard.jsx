import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faUser, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [hotDeals, setHotDeals] = useState([]);
  const [index, setIndex] = useState(0);
  const [dressItems, setDressItems] = useState([]);
  const [watchItems, setWatchItems] = useState([]);
  const [footwearItems, setFootwearItems] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [step, setStep] = useState(1); // Step 1: ask email/phone, Step 2: OTP/Register
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [otp, setOtp] = useState("");
  const [registrationData, setRegistrationData] = useState({ name: "", email: "", phone: "", password: "" });

  const dressRowRef = useRef();
  const watchRowRef = useRef();
  const footwearRowRef = useRef();

  // Fetch API data
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => {
        setHotDeals(data.filter(p => p.hotdeal === "Y"));
        setDressItems(data.filter(p => p.category === 2));
        setWatchItems(data.filter(p => p.category === 3));
        setFootwearItems(data.filter(p => p.category === 1));
      });
  }, []);

  // Auto-slide hot deals
  useEffect(() => {
    if (hotDeals.length > 0) {
      const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % hotDeals.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hotDeals]);

  // Scroll handlers for Dress section
  const scrollNext = () => {
    if (dressRowRef.current) {
      dressRowRef.current.scrollBy({ left: dressRowRef.current.clientWidth, behavior: 'smooth' });
    }
  };
  const scrollPrev = () => {
    if (dressRowRef.current) {
      dressRowRef.current.scrollBy({ left: -dressRowRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard">
      {/* App Bar */}
      <div className="appbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="Logo" />
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faHeart} className="icon" title="Wishlist" />
          <FontAwesomeIcon icon={faCartShopping} className="icon" title="Cart" />
          <FontAwesomeIcon
            icon={faUser}
            className="icon"
            title="Profile"
            onClick={() => {
              const user = localStorage.getItem("user");
              if (user) {
                setUserDetails(JSON.parse(user));

                swal({
                  title: "Profile",
                  text: `Name: ${JSON.parse(user).name}\nEmail: ${JSON.parse(user).email}\nPhone: ${JSON.parse(user).mobile}`,
                  icon: "info",
                  buttons: {
                    cancel: "Close",
                    logout: {
                      text: "Logout",
                      value: "logout",
                    },
                  },
                }).then((value) => {
                  if (value === "logout") {
                    localStorage.removeItem("user");
                    setUserDetails(null);
                    swal("Logged Out", "You have been logged out successfully", "success");
                  }
                });
              } else {
                setShowLoginPopup(true);
              }

            }}
          />

        </div>
      </div>

      {/* Hot Deals Slider */}
      <div className="slider-wrapper">
        <div className="slider" style={{ transform: `translateX(-${index * 100}vw)` }}>
          {hotDeals.map((item, idx) => (
            <div className="slide" key={idx}>
              <img src={item.imgurl} alt={item.heading} />
              <div className="heading">{item.heading}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dress Section */}
      <div className="below-slider">
        <h2 className="section-heading">Dress</h2>
        <div className="product-container">
          <div className="product-row" ref={dressRowRef}>
            {dressItems.map((item, idx) => (
              <div
                className="product-card"
                key={idx}
                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                style={{ cursor: "pointer" }}
              >

                <img src={item.imgurl} alt={item.heading} />
                <div className="card-content">
                  <h3>{item.heading}</h3>
                  <p className="subheading">{item.subheading}</p>
                  <p><strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p className="discount">{item.discount}% off</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="below-slider">
        <h2 className="section-heading">Watch</h2>
        <div className="product-container">
          <div className="product-row" ref={watchRowRef}>
            {watchItems.map((item, idx) => (
              <div
                className="product-card"
                key={idx}
                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                style={{ cursor: "pointer" }}
              >

                <img src={item.imgurl} alt={item.heading} />
                <div className="card-content">
                  <h3>{item.heading}</h3>
                  <p className="subheading">{item.subheading}</p>
                  <p><strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p className="discount">{item.discount}% off</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="below-slider">
        <h2 className="section-heading">FootWears</h2>
        <div className="product-container">
          <div className="product-row" ref={footwearRowRef}>
            {footwearItems.map((item, idx) => (
              <div
                className="product-card"
                key={idx}
                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                style={{ cursor: "pointer" }}
              >

                <img src={item.imgurl} alt={item.heading} />
                <div className="card-content">
                  <h3>{item.heading}</h3>
                  <p className="subheading">{item.subheading}</p>
                  <p><strong>Brand:</strong> {item.brand}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p className="discount">{item.discount}% off</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      {showLoginPopup && (
        <div className="login-popup">
          <div className="login-card">
            <span className="close-btn" onClick={() => {
              setShowLoginPopup(false);
              setStep(1); setStatus(""); setContact(""); setOtp("");
            }}>&times;</span>

            {/* Step 1: Enter email/phone */}
            {step === 1 && (
              <>
                <h3>Login</h3>
                <input
                  type="text"
                  placeholder="Enter Email or Mobile"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <button onClick={async () => {
                  try {
                    const response = await fetch("http://localhost:8080/api/auth/send-otp", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ contact })
                    });

                    if (!response.ok) {
                      throw new Error("Failed to send OTP");
                    }

                    const result = await response.json();
                    if (result.status === "Y" || result.status === "N") {
                      console.log("Hlo");
                      setStatus(result.status);
                    } else {
                      setStatus("error");
                    }

                    setStep(2);
                  } catch (error) {
                    console.error("OTP send error:", error);
                    setStatus("error");
                    setStep(2);
                  }
                }}>
                  Next
                </button>
              </>
            )}

            {/* Step 2A: Show OTP input if registered */}
            {step === 2 && status === "Y" && (
              <>
                <h3>Enter OTP</h3>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {/* <button onClick={() => {
            alert("OTP entered: " + otp);
          }}>
            Verify OTP
          </button> */}

                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ contact, otp })
                      });

                      if (response.ok) {
                        const user = await response.json();
                        swal("Success", "Logged in successfully!", "success");
                        localStorage.setItem("user", JSON.stringify(user));
                        setShowLoginPopup(false);
                        setStep(1);
                        setStatus("");
                        setContact("");
                        setOtp("");
                      } else {
                        const errorData = await response.json();
                        swal("Error", errorData.message || "OTP verification failed", "error");
                      }
                    } catch (error) {
                      swal("Error", "Something went wrong!", "error");
                    }
                  }}
                >
                  Verify OTP
                </button>

              </>
            )}
            {step === 2 && status === "error" && (
              <>
                <h3>Something went wrong</h3>
                <p>Could not proceed with login. Please try again.</p>
                <button onClick={() => {
                  setStep(1);
                  setStatus("");
                  setContact("");
                }}>Retry</button>
              </>
            )}

            {/* Step 2B: Show registration form if not registered */}
            {step === 2 && status === "N" && (
              <>
                <h3>Register</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registrationData.password}
                  onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
                />
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch("http://localhost:8080/api/register", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: registrationData.name,
                          email: registrationData.email,
                          mobile: registrationData.phone,
                          password: registrationData.password,
                        }),
                      });

                      if (response.ok) {
                        swal("Success", "Registration Successful!", "success");
                        // You can also reset the form or move to another step
                      } else {
                        const errorData = await response.json();
                        swal("Error", errorData.message || "Registration failed", "error");
                      }
                    } catch (error) {
                      swal("Error", "Something went wrong!", "error");
                    }
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;