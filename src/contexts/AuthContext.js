import React, {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
//import {auth} from '../firebaseConfig';
import firebase from 'firebase/app'
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoaging] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        firebase.app().auth().onAuthStateChanged((user) => {
            setUser(user);
            setLoaging(false);
            if(user) history.push('/ChatPrivado');
        })
    }, [user, history]);

    const value = {user};

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}