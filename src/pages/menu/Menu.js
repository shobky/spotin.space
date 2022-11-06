import React from 'react'
import { CgMenuRight } from 'react-icons/cg'
import MenuJPG from '../../assets/imgs/menu.jpg'
import HomeMore from '../../components/nav/HomeMore'
import Nav from '../../components/nav/Nav'
import './menu.css'

const Menu = () => {
    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')
    }

    return (
        <div className='menu-page'>
            <p><CgMenuRight onClick={showMoreHome} className="menu_burger-menu-icon" /></p>
            <HomeMore />
            <Nav page={"menu"} />

            <img alt='' src={MenuJPG} className="menu-menu-img" />
        </div>
    )
}

export default Menu