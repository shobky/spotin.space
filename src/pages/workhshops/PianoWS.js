import React, { useState } from 'react'
import piano from '../../assets/workhsops/piano.jpg'
import { IoMdSwap } from 'react-icons/io'
import { MdExpandMore } from 'react-icons/md'
import { RiMenuAddLine } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'


const PianoWS = () => {
    const [workshopOpen, setWorkshopOpen] = useState(false)


    const openWorkShop = () => {
        setWorkshopOpen(true)
    }

    const closeWorkshop = () => {
        setWorkshopOpen(false)
    }

    return (
        <div className='workshop-container'>
            <div className='workshop_workshop__inactive'>
                {
                    workshopOpen ?
                        <IoClose onClick={closeWorkshop} className="workshop_close-ico" />
                        : ""
                }
                <img className='workshop-container_img' src={piano} alt="" />
                <div id='workshopInfo' className='workshop-container_basic-info'>
                    <div className='workshop_basic-info-header'>
                        <p className='workshop_workshop-level'>Beginner to advanced</p>
                        <p className='workshop_workshop-appointment'>Every Friday 1-3 PM</p>
                    </div>
                    <article className={workshopOpen ? 'workshop-container_article__active' : 'workshop-container_article'} id='workshopArticle'>
                        <p className='workshop_article-head'>Each workshop is divided into pracitcal and theroratical parts {`( learn how to read notes )`}</p>
                        <br />
                        <p className='workshop_article-list-title'>Topics: </p>
                        <ul className='workshop_article-topic-list'>
                            <li>Piano Basics</li>
                            <li>Techniques</li>
                            <li>Musical notes</li>
                            <li>Play your first musical piese</li>
                        </ul>
                        <br />
                        <p>You'll need a Music notebook and a pencil. </p>
                        <br />
                        <p style={{ paddingBottom: "10px" }}>Phone number: 01271165428</p>
                        <button className='workshop_join-btn-pc'><RiMenuAddLine /><span>FILL FORM</span></button>

                    </article>
                </div>
                {
                    workshopOpen ? "" :
                        <button onClick={openWorkShop} className='workshop_expand-ico'><MdExpandMore /></button>
                }

            </div>
        </div>
    )
}

export default PianoWS