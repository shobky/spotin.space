import React, { useState } from 'react'
import './workshop.css'
import english from '../../assets/workhsops/engllish.jpg'
import graphic from '../../assets/workhsops/graphic.jpg'


import { MdExpandMore } from 'react-icons/md'
import Nav from '../../components/nav/Nav'
import { IoClose } from 'react-icons/io5'
import { IoMdSwap } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { CgMenuRight } from 'react-icons/cg'
import HomeMore from '../../components/nav/HomeMore'
import { RiMenuAddLine } from 'react-icons/ri'
import PianoWS from './PianoWS'
import GraphicWS from './GraphicWS'

const Workshop = () => {
    const page = "workshops"

    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')

    }


    return (
        <div>
            <Nav className="workshops-nav" page={page} />

            <header className='workhsops-header'>
                <h1 className='workshop_name'>workShops</h1>
                <div style={{
                    display: "flex", alignItems: "center"
                }}>
                    <Link to='/events'><IoMdSwap className='workshop_swap-ico' /></Link>
                    <p><CgMenuRight onClick={showMoreHome} className="workshop_burger-menu-icon" /></p>
                </div>
                <HomeMore />
            </header>

            <main className='pspojfdslk'>
               <PianoWS/>
               <GraphicWS/>
               <PianoWS/>
               <GraphicWS/>
            </main>

        </div>
    )
}

export default Workshop
