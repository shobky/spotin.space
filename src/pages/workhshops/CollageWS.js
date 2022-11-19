import React, { useState } from 'react'
import collage from '../../assets/workhsops/collage.jfif'
import { IoMdSwap } from 'react-icons/io'
import { MdExpandMore } from 'react-icons/md'
import { RiMenuAddLine } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import { useEffect } from 'react'
import { BiCheckDouble } from 'react-icons/bi'


const CollageWs = ({ AutoFillWorkshop, fireStoreCurrentUser }) => {
    const [workshopOpen, setWorkshopOpen] = useState(false)
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        if (fireStoreCurrentUser?.workshops) {
            fireStoreCurrentUser.workshops.map((workshop) => {
                if (workshop === 'collage') {
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
                <img className='workshop-container_img' src={collage} alt="" />
                <div id='workshopInfo' className='workshop-container_basic-info'>
                    <div className='workshop_basic-info-header'>
                        <p className='workshop_workshop-level'>Beginner Level</p>
                        <p className='workshop_workshop-appointment'>With  Dina AbuElkher</p>
                    </div>
                    <article className={workshopOpen ? 'workshop-container_article__active' : 'workshop-container_article'} id='workshopArticle'>
                        <div className='workshop_overflow'>

                            <p className='workshop_article-head woktshop_arapic'>
                                What is collage? ايه هو الكولاج؟
                                - الكولاج فن ممتع جدا من فنون ال Mixed Media مفيش فيه صح و غلط بيتعمد على نظرتك و احساسك و تعبيرك عن نفسك تقدر تستخدم فيه حاجات كتير من قصاصات ورق او جرايد او صور او تقدر تستعين بأي عمل فني
                            </p>
                            <br />
                            <p className='workshop_article-list-title'>Topics: </p>
                            <ul className='workshop_article-topic-list woktshop_arapic'>
                                <li>
                                    هنعرف اكتر عن فن الكولاج و انواعه
                                </li>
                                <li> هنتعلم ازاى نعمل ارضيات مختلفة نشتغل عليها</li>
                                <li>
                                    هنعرف ايه المواد اللى ممكن نستخدمها و ممكن تفيدنا و تطلع الشكل اللى احنا عايزينه

                                </li>
                                <li>
                                    هنتعلم techniques نستخدمها فى شغلنا
                                </li>
                                <li>
                                    هنعمل مع بعض final project يطبق كل اللى اتعلمناه

                                </li>
                            </ul>
                            <br />
                            <p ><span className='woktshop_arapic'>الأدوات اللي هنحتاجها\:
                                - فرشة، ائ نوع الوان (يفضل الوان ماية او جواش) ، مقص،</span> glue , {`(any old magazine/paper will be bonus )`} </p>
                            <br />
                            {/* <p style={{ paddingBottom: "10px" }}>Phone number: 01271165428</p> */}
                        </div>
                        {
                            signed ?
                                <button className='workshop_join-btn-pc'><BiCheckDouble /><span>Submited</span></button>
                                :
                                <button onClick={() => AutoFillWorkshop('collage')} className='workshop_join-btn-pc'><RiMenuAddLine /><span>AUTO FILL</span></button>

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

export default CollageWs