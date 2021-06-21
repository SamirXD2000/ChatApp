import React, {useRef, useState, useEffect} from 'react';
import {useHistory} from'react-router-dom';
//import {auth} from '../firebase';
import axios from 'axios';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import firebase from 'firebase/app'

import {useAuth} from '../contexts/AuthContext';

const PrivateChat = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async () => {
        await firebase.app().auth().signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user)
        {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers : {
               "project-id": "53de33cd-6363-41d0-ae9c-6ee8c3c8db55",
               "user-name" :user.email,
               "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid)

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)

                axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {headers: {"private-key": "99b57bc3-7f48-4742-a0cc-3bac7230bf01"}}
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user, history]);

    function privateChat()
    {
        history.push('chats');
    }

    if (!user || loading) return 'Loading...';
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={privateChat} className="Next-tab">
                    Chat privado
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    LogOut
                </div>
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="b7bacf60-e176-4f5e-aa93-222e5fd5b43b"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default PrivateChat;