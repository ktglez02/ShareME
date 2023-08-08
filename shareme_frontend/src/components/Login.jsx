import React from 'react'
import {GoogleLogin} from '@react-oauth/google';
import {useNavigate} from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import jwt_decode from 'jwt-decode'
import {client} from '../client'

const Login = () => {
    const navigate = useNavigate();

    const credentialResponse = async (res) => {
        const userObject = jwt_decode(res.credential)
        localStorage.setItem('user', JSON.stringify(userObject))
        const {name, jti, picture} = userObject;
        console.log({name, jti, picture});

        const doc = {
            _id: jti,
            _type: 'user',
            userName: name,
            image: picture
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', {replace: true})
        });

        console.log(client)
    }

    return (
        <div className="flex-justify-start items-center flex-col h-screen">
            <div className='relative w-full h-full'>
                <video src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"/> 
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo}
                            width='130px'
                            alt='logo'/>
                    </div>
                    <div className='shadow-2xl'>
                        <GoogleLogin buttonTet="Login"
                            onSuccess={credentialResponse}
                            onFailure={credentialResponse}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
