import React, { useState } from 'react'
import graphic from '../../assets/workhsops/graphic.jpg'
import { IoMdSwap } from 'react-icons/io'
import { MdExpandMore } from 'react-icons/md'
import { RiMenuAddLine } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import { useEffect } from 'react'
import { BiCheckDouble } from 'react-icons/bi'


const GraphicWS = ({ AutoFillWorkshop, fireStoreCurrentUser }) => {
    const [workshopOpen, setWorkshopOpen] = useState(false)
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        if (fireStoreCurrentUser?.workshops) {
            fireStoreCurrentUser.workshops.map((workshop) => {
                if (workshop === 'graphic') {
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
                <img className='workshop-container_img' src={graphic} alt="" />
                <div id='workshopInfo' className='workshop-container_basic-info'>
                    <div className='workshop_basic-info-header'>
                        <p className='workshop_workshop-level'>Beginner level</p>
                        <p className='workshop_workshop-appointment'>Every Mon & Wed 4-6 PM</p>
                    </div>
                    <article className={workshopOpen ? 'workshop-container_article__active' : 'workshop-container_article'} id='workshopArticle'>
                        <div className='workshop_overflow'>
                            <p className='workshop_article-head'>Facilitator: Mr.Abdelrahman Baielah</p>
                            <br />
                            <p className='workshop_article-list-title'>Topics: </p>
                            <ul className='workshop_article-topic-list woktshop_arapic'>
                                <li>التعامل مع واجهة البرنامج والقوائم والأدوات</li>
                                <li> اتقان استخدام Layers مع Blending Options </li>
                                <li>استكشاف مهارات التحديد وطرق استعمال الاختصارات المختلفة</li>
                                <li>النصوص وتوظيف الخطوط والتأثيرات مع روح التصميم </li>
                                <li>اتقان انشاء تصميم جديد في نهاية الورشة مع خطوات صناعة الافكار الابداعية </li>

                            </ul>
                            <br />
                            <p>You'll need a Laptop with an average performance. </p>
                            <br />
                        </div>
                        {
                            signed ?
                                <button className='workshop_join-btn-pc'><BiCheckDouble /><span>Submited</span></button>
                                :
                                <button onClick={() => AutoFillWorkshop('graphic')} className='workshop_join-btn-pc'><RiMenuAddLine /><span>AUTO FILL</span></button>
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

export default GraphicWS