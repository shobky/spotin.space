import React, { useState } from 'react'
import './workshop.css'

import Nav from '../../components/nav/Nav'
import { IoMdSwap } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { CgMenuRight } from 'react-icons/cg'
import HomeMore from '../../components/nav/HomeMore'
import PianoWS from './PianoWS'
import GraphicWS from './GraphicWS'
import CollageWs from './CollageWS'
import { useDb } from '../../contexts/FireStoreContext'
import { doc, setDoc, updateDoc, } from 'firebase/firestore'
import { db } from '../../firebase/Config'
import MandalaWs from './MadalaWS'

const Workshop = () => {
    const page = "workshops"
    const { fireStoreCurrentUser } = useDb()
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState("")


    const showMoreHome = () => {
        const moreHome = document.getElementById('homeMore')
        moreHome.classList.remove('home_showMore__inactive')
        moreHome.classList.add('home_showMore__active')

    }

    const AutoFillWorkshop = (workshop) => {
        setDoc(doc(db, `${workshop}/${fireStoreCurrentUser.email}`), {
            fireStoreCurrentUser
        }).then(() => {
            updateDoc(doc(db, `Users/${fireStoreCurrentUser.email}`), {
                workshops: fireStoreCurrentUser.workshops ? [...fireStoreCurrentUser.workshops, workshop] : [workshop]
            }).then(() => {
                setMsg(`you are now in the ${workshop} list, we'll be in touch.`)
                setTimeout(() => {
                    setMsg('')
                }, 3000);
            }).catch(() => {
                setErr(`Failed to fill your information.`)
                setTimeout(() => {
                    setErr('')
                }, 3000);
            })
        })
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
            {msg ? <p onClick={() => setMsg('')} className='workshop_msg'>{msg}</p> : err ? <p onClick={() => setErr('')} className='workshop_err'>{err}</p> : ""}

            <main className='pspojfdslk'>
                <PianoWS AutoFillWorkshop={AutoFillWorkshop} fireStoreCurrentUser={fireStoreCurrentUser} />
                <GraphicWS AutoFillWorkshop={AutoFillWorkshop} fireStoreCurrentUser={fireStoreCurrentUser} />
                <CollageWs AutoFillWorkshop={AutoFillWorkshop} fireStoreCurrentUser={fireStoreCurrentUser} />
                <MandalaWs AutoFillWorkshop={AutoFillWorkshop} fireStoreCurrentUser={fireStoreCurrentUser} />

            </main>
        </div>
    )
}

export default Workshop
