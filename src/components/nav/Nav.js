import React, { useState } from 'react'
import "./nav.css"

import { BsCalendarEvent, BsCalendarEventFill, BsExclamationCircle, BsExclamationCircleFill, BsHouse, BsHouseFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { BiCoffeeTogo } from 'react-icons/bi'
import { IoPersonCircleOutline, IoPersonCircleSharp, IoSettingsOutline, IoSettingsSharp, IoTicketOutline, IoTicketSharp } from 'react-icons/io5'
import { VscDebugStackframeDot } from 'react-icons/vsc'

const Nav = ({ page }) => {
    const { user } = useAuth()
    const [active, setActive] = useState(page)
    return (
        <div className='nav'>
            <Link className='nav_link' onClick={() => setActive("settings")} to="/settings">{active === 'settings' ? <> <IoSettingsSharp className='nav_link-ico__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <IoSettingsOutline />}</Link>
            <Link className='nav_link' onClick={() => setActive("home")} to="/">{active === 'home' ? <> <BsHouseFill className='nav_link-ico__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <BsHouse />}</Link>
            <Link className='nav_link' onClick={() => setActive("workshops")} to="/workshops">{active === 'workshops' ? <> <BsCalendarEventFill className='nav_link-ico__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <BsCalendarEvent />}</Link>
            {/* <Link className='nav_link-pc' onClick={() => setActive("workshops")} to="/workshops">{active === 'about' ? <> <BsExclamationCircleFill className='nav_link-ico-pc__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <BsExclamationCircle />}</Link> */}
            <Link className='nav_link-pc' onClick={() => setActive("workshops")} to="/tikets">{active === 'tickets' ? <> <IoTicketSharp className='nav_link-ico-pc__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <IoTicketOutline  />}</Link>
            <Link className='nav_link-pc' onClick={() => setActive("workshops")} to="/menu">{active === 'menu' ? <> <BiCoffeeTogo className='nav_link-ico-pc__active' /><VscDebugStackframeDot className="nav-link-active-dot" /> </> : <BiCoffeeTogo />}</Link>



            <Link to="/profile" className='nav_link' onClick={() => setActive("profile")}>{active === "profile" ?
                user ?
                    <>
                        <img alt='' className='nav_user-photo__active' src={user.photoURL} />
                        <VscDebugStackframeDot className="nav-link-active-dot__photo" /></>
                    :
                    <>
                        <IoPersonCircleSharp className='nav_link-ico__active' />
                        <VscDebugStackframeDot className="nav-link-active-dot" /></>
                :
                user ?
                    <img alt='' className='nav_user-photo__inactive' src={user.photoURL} /> :
                    <IoPersonCircleOutline />}</Link>


        </div>
    )
}

export default Nav