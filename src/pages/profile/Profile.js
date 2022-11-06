import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import './profile.css'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdOutlineEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDb } from '../../contexts/FireStoreContext'
import Nav from '../../components/nav/Nav'
import TimeSpent from '../../components/receipt/TimeSpent'
import { collection } from 'firebase/firestore'
import { db } from '../../firebase/Config'
import { useCollectionData } from 'react-firebase-hooks/firestore'
// import TimeSpent from '../../system/orders/TimeSpent'

const Profile = () => {
    const { user } = useAuth()
    const { fireStoreCurrentUser } = useDb()
    const page = "profile"
    const [timeSpent, setTimeSpent] = useState()
    const [orderTotal, setOrderTotal] = useState(0)
    const [openExis, setOpenExis] = useState(false)

    const userordersQ = collection(db, `Users/${user.email}/orders`)
    const [userOrders] = useCollectionData(userordersQ)

    const onSetTimeSpent = (time) => {
        setTimeSpent(time)
    }

   


    useEffect(() => {
        const onSetOrderTotal = () => {
            userOrders?.filter((filtUserORder) => {
                if (filtUserORder.status === "open") {
                    return filtUserORder
                } else {

                }
            }).map((userOrder) => {
                userOrder.status === "open" ? setOpenExis(true) : setOpenExis(false)
                setOrderTotal(
                    userOrder.status === "open" ?
                        timeSpent?.length > 0 ?
                            timeSpent[0] >= 2 || timeSpent[0] < 0 ? userOrder.total + 15 * userOrder.tickets.number : userOrder.total
                            : userOrder.total
                        : userOrder.timeSpent ?
                            userOrder.timeSpent[0] >= 2 || userOrder.timeSpent[0] < 0 ? userOrder.total + 15 * userOrder.tickets.number : userOrder.total
                            : userOrder.total
                )
            })


        }
        onSetOrderTotal()
    }, [timeSpent, userOrders])
    return (
        <div className='profile'>
            <nav>
                <Nav page={page} />
            </nav>
            <div className='profile_ico-section'>
                {/* <Link to="/"><IoArrowBackSharp className='profile_back-ico profile_ico' /></Link> */}
                <Link to="/edit-profile"><RiEdit2Fill className='profile_edit-ico profile_ico' /></Link>
            </div>
            <div className='profile_content-container'>
                <header>
                    <img className='profile_header_user-photo' src={user.photoURL} alt="" />
                    <div>
                        {
                            user.displayName.length > 12 ?
                                <div className='profile_header-user-info__long'>
                                    <h1 className='profile_heder_user-name__long'>{user.displayName}</h1>
                                    <p className='profile_heder_uid'>#{fireStoreCurrentUser?.uid}</p>
                                </div>

                                :
                                <div className='profile_header-user-info'>
                                    <h1 className='profile_heder_user-name'>{user.displayName}</h1>
                                    <p className='profile_heder_uid'>#{fireStoreCurrentUser?.uid}</p>
                                </div>}
                        {/* <p className='special-badge'><DiJsBadge className='special-badge-icon' /> Website Developer</p> */}
                    </div>


                </header>

                <div className='profile_user-contacts-section'>
                    <div>
                        <p className='profile_user-contacts'> <MdOutlineEmail style={{ position: "relative", top: "3px", marginRight: "10px" }} /> {user.email}</p>
                    </div>
                </div>

                <div className='profile_activity-section'>
                    <div>
                        <p className='profile_activity-num'>0</p>
                        <p className='profile_activity-label'>Events</p>
                    </div>
                    <div>
                        <p className='profile_activity-num'>0</p>
                        <p className='profile_activity-label'>Workshops</p>
                    </div>
                    <Link style={{ textDecoration: "none" }} to="/profile/orders">
                        <div>
                            <p className='profile_activity-num'>{userOrders?.length ?? 0}</p>
                            <p className='profile_activity-label'>Orders</p>
                        </div></Link>
                </div>

                <hr className='inbetweenline' />

                <div className='profile_open-order-container'>
                    {
                        !openExis ?
                            <p className='profile_no-open-order-msg'>No open order,  Looking to see you soon!</p>
                            : ""
                    }
                    {
                        userOrders?.filter((filtUserORder) => {
                            if (filtUserORder.status === "open") {
                                return filtUserORder
                            } else {

                            }
                        }).map((userOrder) => (
                            userOrder ?
                                <div>
                                    <p> <strong>Id: #</strong>{userOrder?.userOrderId}</p>
                                    <p> <strong>Orderd at:</strong> {userOrder?.time}</p>
                                    <p className='profile_open-order_cart-header'>Cart: </p>
                                    <div className='profile_cart-items-continaer'>
                                        {
                                            userOrder?.cart.map((cartItem) => (
                                                <li>{cartItem.qty}x{cartItem?.item.name} {cartItem.qty * cartItem.item.price} L.e</li>
                                            ))}

                                    </div>
                                    < TimeSpent order={userOrder} onSetTimeSpent={onSetTimeSpent} timeSpent={timeSpent} />
                                    {
                                        timeSpent ?

                                            <p className='profile_open-order_tkt-type'><span>
                                                {
                                                    timeSpent[0] >= 2 || timeSpent[0] < 0 ? `Full day. + ${userOrder.tickets.number * 25}L.e` : `Half Day. + ${userOrder.tickets.number * 15}L.e`
                                                }</span></p>

                                            : ""
                                    }
                                    <p className='profile_open-order_total'>{orderTotal}L.e</p>
                                </div> : ""

                        ))
                    }
                </div>


            </div>
        </div>
    )
}

export default Profile