import React, { useState } from 'react'
import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../Features/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@material-ui/core'
import { GoogleLogout } from 'react-google-login'
import '../Styles/Navbar.css'

require('dotenv').config()

const Navbar = () => {

    const [inputValue, setInputValue] = useState("")

    //to check if the user is signed in or not
    const isSignedIn = useSelector(selectSignedIn)
    const userData = useSelector(selectUserData)

    const dispatch = useDispatch()

    const logout = (response) => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    }

    const handleSubmit = (e) => {
        dispatch(setInput(inputValue))
        e.preventDefault();
    }
    return (
        <div className="navbar">
            <h4 className="navHeading">belogs`</h4>
            {isSignedIn && (

                <div>
                    <form className="blogSearch" onSubmit={handleSubmit}>
                        <input className="searchInput"
                            placeholder="Search topic or keyword..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type='submit' className="submit" onClick={handleSubmit} >
                            Search
                        </button>
                    </form>
                </div>)}

            {isSignedIn ? (
                <div className="navUserData">
                    <Avatar
                        className="userImg"
                        src={userData?.imageUrl}
                        alt={userData?.name} />
                    <h1 className="signedIn">{userData?.givenName}</h1>

                    <GoogleLogout clientId={process.env.REACT_APP_CLIENT_ID}

                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="logoutButton"
                            >
                                Signout
                            </button>
                        )}
                        onLogoutSuccess={logout}
                    />
                </div>
            ) : ("")}
        </div>
    )
}

export default Navbar
