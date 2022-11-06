import React, { useEffect, useState } from 'react'
import './receipt.css'

import { ImShrink2 } from 'react-icons/im'
import TimeSpent from './TimeSpent'

import { BsFillCircleFill } from 'react-icons/bs'
import { GiPlainCircle } from 'react-icons/gi'

const Receipt = ({ order, userOpen,onSetReceipt, showreceSetter }) => {
    const [timeSpent, setTimeSpent] = useState()
    const [orderTotal, setOrderTotal] = useState(0)


    const onSetTimeSpent = (time) => {
        setTimeSpent(time)
    }
    useEffect(() => {
        const onSetOrderTotal = () => {
            setOrderTotal(
                order.status === "open" ?
                    timeSpent?.length > 0 ?
                        timeSpent[0] >= 2 || timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                        : order.total
                    : order.timeSpent ?
                        order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                        : order.total
            )
        }
        onSetOrderTotal()
    }, [order, timeSpent])

    return (
        <>

            <div className='receipt'>
                <h1
                    style={{ fontFamily: "montserrat-black", marginTop: "25px", textAlign: "center" }}
                    className='system_header_name-rece'>Spot
                    <span
                        style={{
                            fontFamily: "sans-seriref",
                            fontWeight: 'light',
                            fontSize: "28px",
                            marginLeft: "3px"
                        }}
                        className='pos_name-span'>IN
                    </span>
                </h1>
                {
                    userOpen ? <ImShrink2
                        onClick={() => showreceSetter()}
                        className="rec_shrink-ico" /> : <ImShrink2
                        onClick={() => onSetReceipt()}
                        className="rec_shrink-ico" />
                }
                {
                    order.user.url ?
                        <img className="rece_avatar" alt='' src={order.user.url} /> : ""
                }

                <div className='receipt_container'>
                    <p className='rec_order-id'><GiPlainCircle className={
                        order.status === "open" ? "rec_order-open" : order.status === "closed" ? "rec_order-closed" : "rec-order-archived"
                    } /> Order id:  <strong> #{order.id} </strong></p>
                    <p> <strong>Date: </strong> {order.date}/2022</p>
                    <p> <strong>Time: </strong> {order.time}</p>

                    <p> <strong>Username: </strong> {order.user.name}</p>
                    <p> <strong>User id: </strong> #{order.user.uid}</p>
                    {/* counting order total price with tickets */}
                    {/* {
                        <p>
                            <strong>{order.paidAmout ? `Paid: ${order.paidAmout}L.e` : ""}</strong>
                        </p>
                    } */}

                    {
                        order.status === "open" ?
                            timeSpent?.length > 0 ?
                                <p className='rece_total-price'>Subtotal: {
                                    timeSpent[0] >= 2 || timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                }L.e</p> : <p className='rece_total-price'>Subtotal: {order.total}L.e</p>
                            : order.timeSpent ?
                                <p className='rece_total-price'>Subtotal: {
                                    order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.total + 15 * order.tickets.number : order.total
                                }L.e</p> : <p className='rece_total-price'>Subtotal: {order.total}L.e</p>
                    }

                    {
                        <p className='change-in-rec'>
                            <strong>{order.paidAmout ? `Change: ${order.paidAmout - orderTotal}L.e` : ""}</strong>
                        </p>
                    }
                    <br />

                    {
                        order.tickets.number > 0 ?
                            <>

                                {/* counting tickits price and type for closed & archived orders */}
                                {
                                    order.timeSpent ?
                                        <>
                                            <p> <strong>Ticket type: </strong>{
                                                order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? "Full day" : "Half Day"
                                            }</p>
                                            <p><strong>{order.tickets.number} people checked in for: <br /> </strong>{(order.timeSpent[0] < 0 ? 24 + order.timeSpent[0] + " hours : " : order.timeSpent[0] + " hours : ") + (order.timeSpent[1] < 0 ? 60 + order.timeSpent[1] + " minutes" : order.timeSpent[1] + " minutes")}</p>
                                            <p> <strong>Total: </strong>{
                                                order.timeSpent[0] >= 2 || order.timeSpent[0] < 0 ? order.tickets.price + 15 * order.tickets.number : order.tickets.price
                                            }L.e</p>
                                        </>
                                        :
                                        <TimeSpent timeSpent={timeSpent} onSetTimeSpent={onSetTimeSpent} order={order} />

                                }
                                {/* counting tickits price and type for open orders */}

                                {
                                    timeSpent?.length > 0 ?
                                        <>
                                            <p> <strong>Ticket type: </strong>{
                                                timeSpent[0] >= 2 || timeSpent[0] < 0 ? "Full day" : "Half Day"
                                            }</p>
                                            <p> <strong>Total: </strong>{
                                                timeSpent[0] >= 2 || timeSpent[0] < 0 ? (order.tickets.price + 15 * order.tickets.number) : order.tickets.price
                                            }L.e</p>
                                        </> : ""
                                }
                            </>
                            : <strong>No Tickets Sold</strong>
                    }
                    <br />

                    {
                        order.cart.length > 0 ?

                            <div>
                                <strong>Cart:  </strong>
                                {order?.cart?.map((cartItem, index) => (
                                    <div key={index}>
                                        <div style={{ marginLeft: "10px" }}>
                                            <p> <BsFillCircleFill className='rece_circle' /> {cartItem.qty}x{cartItem.item.name} {cartItem.item.price * cartItem.qty}L.e</p>
                                            <p className='rece_cart-item-note'>{cartItem.note}</p>
                                        </div>
                                    </div>
                                ))}
                                {/* counting order total price without tickets if there is a new cart */}
                                <br />

                                {
                                    order.newCart?.newCartDoc.length > 0 ?
                                        <p className='rece_cart-total'><strong>Total:</strong> {(order.total + order.newCart.total)}L.e</p>
                                        :
                                        <p className='rece_cart-total'><strong>Total:</strong> {order.total - order.tickets.price}L.e</p>
                                }

                            </div>

                            :
                            <strong>No Items Sold</strong>
                    }
                </div>
            </div>

        </>
    )
}

export default Receipt