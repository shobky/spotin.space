import React, { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { RiMenuAddLine } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import mandala from '../../assets/workhsops/mandala.jfif'
import { useEffect } from 'react'
import { BiCheckDouble } from 'react-icons/bi'



const MandalaWs = ({ AutoFillWorkshop,fireStoreCurrentUser }) => {
    const [workshopOpen, setWorkshopOpen] = useState(false)
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        if (fireStoreCurrentUser?.workshops) {
            fireStoreCurrentUser.workshops.map((workshop) => {
                if (workshop === 'mandala') {
                    setSigned(true)
                } else {
                }
            })
        }
    }, [fireStoreCurrentUser])

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
                <img className='workshop-container_img' src={mandala} alt="" />
                <div id='workshopInfo' className='workshop-container_basic-info'>
                    <div className='workshop_basic-info-header'>
                        <p className='workshop_workshop-level'> No specific level </p>
                        <p className='workshop_workshop-appointment'>Every Mon & Wed 4-6 PM</p>
                    </div>
                    <article className={workshopOpen ? 'workshop-container_article__active' : 'workshop-container_article'} id='workshopArticle'>
                        <div className='workshop_overflow'>
                            <p className='workshop_article-head'>
                                Facilitator: Ms. Nadeen Abdella

                            </p>

                            <p className='workshop_article-head'>Learning Mandala doesn't require a specific level or experience in drawing because the main purpose of Mandala is releasing negative energy and inner peace.</p>
                            <br />
                            <p className='workshop_article-list-title'>Topics: </p>
                            <ul className='workshop_article-topic-list '>
                                <li> Mandala Outline</li>
                                <li>Freehand Mandala</li>
                                <li> Practice drawing</li>

                            </ul>
                            <br />
                            <p> Age limit: 13+ </p>
                            <br />
                        </div>
                        {/* <p style={{ paddingBottom: "10px" }}>Phone number: 01271165428</p> */}
                        {
                            signed ?
                                <button className='workshop_join-btn-pc'><BiCheckDouble /><span>Submited</span></button>
                                :
                                <button onClick={() => AutoFillWorkshop('mandala')} className='workshop_join-btn-pc'><RiMenuAddLine /><span>AUTO FILL</span></button>

                        }

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

export default MandalaWs