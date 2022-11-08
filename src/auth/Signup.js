import React, { useEffect, useRef, useState } from 'react'
import './auth.css'
import { Link } from "react-router-dom"
import { MdKeyboardBackspace, MdRemove } from "react-icons/md";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { IoSend } from 'react-icons/io5'
import { GiPlainCircle, GiCircle } from 'react-icons/gi'
import { TbEditCircle } from 'react-icons/tb'
import { IoIosMale, IoIosFemale } from 'react-icons/io'
import noUserPhoto from '../assets/avatars/Profile-PNG-File.png'
import { useAuth } from '../contexts/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/Config';


const Signup = () => {
    const { EmailAndPasswordSignup, authError } = useAuth()

    const nameRef = useRef('unkown')
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const numberRef = useRef('unkown')
    const [gender, setGender] = useState('unkown')
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState(noUserPhoto)
    const [edit, setEdit] = useState(true)
    const [msg, setMsg] = useState('')
    const [showPassword, setShowPassword] = useState("password")
    const [loading, setLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const showingthePassword = (e) => {
        e.preventDefault()
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")

        }
    }

    const handleSelectGender = (selectedGender) => {
        setGender(selectedGender)
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file != null) {
            setPhotoURL(URL.createObjectURL(file))
            setEdit(false)
            setFile(file)
            const storageRef = ref(storage, `user-photos/${file.name}`)

            uploadBytes(storageRef, file).then((snapshot) => {
                setMsg(' photo uploaded sucsessfuly ')
                setUploaded(true)
            }).catch((err) => {
                setMsg(err.message)
                setPhotoURL(noUserPhoto)
                setFile(null)
            })
        }
    }

    const handlePhotoDiscard = () => {
        setPhotoURL(noUserPhoto)
        setEdit(true)
        setFile(null)
    }


    const handleSignUpWithEmailAndPassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        const url = uploaded ?
            await getDownloadURL(ref(storage, `user-photos/${file.name}`))
            : await getDownloadURL(ref(storage, `user-photos/Profile-PNG-File.png`))

        EmailAndPasswordSignup(emailRef.current.value, passwordRef.current.value, nameRef.current.value, numberRef.current.value, url, gender)
    }

    useEffect(() => {
        if (authError) {
            setLoading(false)
        }
    }, [authError])
    return (
        <div className="auth-container">
            <div className="auth_backk-container">
                <Link to="/"> <MdKeyboardBackspace className="auth_back-arr" /><span className="auth_back-arrow-longer"></span> </Link>
            </div>
            <div className="auth_content">
                <p className="auth_header">Sign Up </p>
                <div style={{ display: "flex", justifyContent: "center" }}>

                </div>
                <div className="auth_header-contaeirn">
                    <div className="auth_hello-txt-div">
                        <p className="auth_hello-text">Hello <br /> There,</p>
                        <p className="auth_hello-sub-text">We are almost finished, just fill some information for us:</p>
                    </div>
                    <div className="auth-black-circle-container">
                        <div className="auth-black-circle"></div>
                        <img className="auth-user-image" src={photoURL} alt="avatar" />
                        <div className="auth_user-photo_actions">

                            {
                                edit ?
                                    <>
                                        <TbEditCircle className="auth_user-change-photo-ico" />
                                        <input onChange={(e) => handlePhotoChange(e)} id="auth_input_photo" className="auth_user-photo-input" type="file" />
                                    </>
                                    :
                                    <MdRemove onClick={handlePhotoDiscard} className="auth_user-discard-photo-ico" />

                            }
                            <p>profile picture</p>
                        </div>
                    </div>
                </div>
                {authError &&
                    <p className="auth_err-signUp">{authError}</p>
                }
                <form autoComplete='on' onSubmit={handleSignUpWithEmailAndPassword} className="auth_form">
                    <div className="auth-form-label-div"><label className="auth_label"> Name </label>
                        <input autoComplete="on" placeholder="Ahmed Shobky" className="sign-up_auth_input auth_input " ref={nameRef} required name="name" type="text" /></div>

                    <div className="auth-form-label-div"><label className="auth_label">Email </label>
                        <input placeholder="examble@provider.com" className="sign-up_auth_input auth_input" ref={emailRef} required name="email" type="email" /></div>
                    <div className="auth-form-label-div"><label className="auth_label">Number </label>
                        <input placeholder="phone number" className="sign-up_auth_input auth_input" ref={numberRef} required name="number" type="number" /></div>
                    <label autoComplete="on" className="auth_label"> Password </label>
                    <div className="auth-form-label-div" style={{ position: "relative" }}>
                        <input placeholder="Type your passowrd" className="sign-up_auth_input auth_input" ref={passwordRef} required name="new-password" type={showPassword} />
                        <button type="button" className="auth_show-password-btn" onClick={(e) => showingthePassword(e)}>{showPassword === 'password' ? <RiEyeCloseLine className="passIco" /> : <RiEyeLine className="passIco" />}</button>
                    </div>
                    <div className="auth-form-label-div auth-fomr-gender">
                        <IoIosMale id="auth_male-ico" onClick={() => handleSelectGender('male')} className={gender === 'male' ? "auth_gender__male" : "auth_gender-ico"} />
                        Or
                        <IoIosFemale id="auth_female-ico" onClick={() => handleSelectGender('female')} className={gender === 'female' ? "auth_gender__female" : "auth_gender-ico"} /> ?
                    </div>
                    <button className={loading ? "submit-btn-loading" : "sumbit-btn-signup"} type="submit"><IoSend /></button>
                </form>
                <div className="footer-container">
                    <p className="auth_footer">Already have an account ? </p>
                    <Link className="auth_footer-btn" to="/login">log in</Link>
                </div>
            </div>
            <GiPlainCircle className="auth_circle-fill auth_circle-fill1 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill2 " />
            <GiPlainCircle className="auth_circle-fill auth_circle-fill3 " />
            <GiCircle className="auth_circle-border auth_circle-border1" />
            <GiCircle className="auth_circle-border auth_circle-border2" />


        </div>
    )
}

export default Signup