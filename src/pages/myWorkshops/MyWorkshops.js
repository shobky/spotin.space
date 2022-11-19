import React from 'react'
import { BsCalendarEventFill } from 'react-icons/bs';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useDb } from '../../contexts/FireStoreContext';
import '../myOrders/myOrders.css'
import { IoIosList } from 'react-icons/io';
import { IoRemoveCircleSharp } from 'react-icons/io5';
import './myworksops.css'
import { useState } from 'react';
import { deleteDoc, doc, FieldValue, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/Config';

const MyWorkshops = () => {
    const { fireStoreCurrentUser } = useDb()
    const [fav, setFav] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()


    const handleRemoveWorkshop = async (workhsop) => {
        let oldArr = fireStoreCurrentUser.workshops
        let NewArr = oldArr.filter(x => x !== workhsop)
        await updateDoc(doc(db, `Users/${fireStoreCurrentUser.email}`), {
            workshops: [...NewArr]
        })
        await deleteDoc(doc(db,`${workhsop}/${fireStoreCurrentUser.email}`))
    }

    return (

        <>
            {
                <div className='my-orders'>
                    <Link to="/profile"> <TbArrowNarrowLeft className="my-orders_back-ico" /> </Link>

                    <header className='my-orders_header'>
                        <p><IoIosList /></p>
                        <p>My Workshops</p>
                    </header>

                    <main>
                        {
                            fireStoreCurrentUser?.workshops ?
                                <h1 className='my-orders_main_header'>You have signed for {fireStoreCurrentUser?.workshops?.length > 1 ? fireStoreCurrentUser?.workshops?.length + " workshops" : fireStoreCurrentUser?.workshops.length + " workshop"}.</h1>
                                :
                                <h1 className='my-orders_main_header'>You haven't signed for any workshops.</h1>

                        }
                        <div className='my-orders-input-div'>
                            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='search...' className='my-orders_search-input' />
                        </div>
                        <BsCalendarEventFill onClick={() => navigate('/workshops')} className='my-orders_delete-ico' />
                        <div>
                            {
                                fireStoreCurrentUser?.workshops ?
                                    fireStoreCurrentUser?.workshops?.filter((fWorkshops) => {
                                        if (fWorkshops.toLowerCase().includes(searchTerm.toLowerCase())) {
                                            return fWorkshops
                                        } else {
                                        }
                                    }).map((workhsop, idnex) => (
                                        <div className='my-workshops-workshop-div'>
                                            <p><span>{workhsop}</span> workshop</p>
                                            <button onClick={() => handleRemoveWorkshop(workhsop)}><IoRemoveCircleSharp  className='my-workshop_remove-icon'/></button>
                                        </div>
                                    ))
                                    : ""
                            }

                        </div>

                    </main>
                </div>

            }</>

    )
}

export default MyWorkshops