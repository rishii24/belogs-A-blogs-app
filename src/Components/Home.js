import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { selectSignedIn, setSignedIn, setUserData } from '../Features/UserSlice'
import GoogleLogo from '../Images/google.png'
import BlogImg from '../Images/blog1.jpg'
import '../Styles/Home.css'

require('dotenv').config()


const Home = () => {

    const dispatch = useDispatch()

    const login = (response) => {
        // console.log(response)

        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj)) //auto-imports user data
    }

    const isSignedIn = useSelector(selectSignedIn)

    return (
        <div className="homePage" style={{ display: isSignedIn ? "none" : "" }}>
            {!isSignedIn ? (
                <div className="home">
                    <div className="homeMessage">

                        <img src={BlogImg} alt='img' style={{ height: "500px" }} />
                        <div className="homeText">
                            <h1>a reader's paradise</h1>
                            <p>
                                Welcome reader to belogs`.<br /> Here you'll get blogs, articles you've been waiting to read.
                                Just login and start reading everything you love.
                            </p>
                            <GoogleLogin
                                clientId= {process.env.REACT_APP_CLIENT_ID}
                                render={(renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="loginButton"
                                    >
                                        Login with<img className="loginLogo" src={GoogleLogo} alt="google" />
                                    </button>
                                )}

                                onSuccess={login}
                                onFailure={false}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>

                    </div>

                </div>) : ("")}
            <div className="footer">
                <p>	&#xA9;<b>belogs'</b> 2021 | All rights reserved.  </p>
            </div>
        </div>


    )
}

export default Home
