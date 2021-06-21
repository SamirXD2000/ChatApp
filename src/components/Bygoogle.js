import React, {Component} from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../firebaseConfig'
import {Redirect} from 'react-router-dom'
import 'firebase/firestore'
import 'firebase/analytics'
//import {auth, firestore, google_provider, fb_provider} from '../firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const firestore = firebase.firestore()

function Alta(){
    console.log("SE ESTA LLAMANDO ESTA MIERDA")
    const Registro = async () =>{
  
      const registro = firestore.collection('usuarios')
      const {uid, photoURL,displayName,email} = auth.currentUser
      const hora =  firebase.firestore.FieldValue.serverTimestamp()
      await registro.add({
          uid,
          photoURL,
          displayName,
          email,
          login:  hora,
          lasttime: hora
        })
    }
  
    firestore.collection('usuarios').where('email', '==', auth.currentUser.email).get().then(async (e)=>{
      console.log("SE ESTA LLAMANDO ESTA MIERDA 2")
      if (e.empty){
        Registro();
    }})
}
const signWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then((result)=>{
    Alta()
    }) 
}


const signWithFb = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider).then((result)=>{
    Alta()
    })
}


export const SignIn= () =>{
    console.log("SE ESTA LLAMANDO aunque sea sign in")
  return (<>
    <button className = "sign-in" onClick= {signWithGoogle}> Iniciar Sesion </button>
    <p>Bienvenido</p>
  </>)
}

export const SignInFb= () =>{
    console.log("SE ESTA LLAMANDO aunque sea sign in")
  return (<>
    <button className = "sign-in" onClick= {signWithFb}> Iniciar Sesion </button>
    <p>Bienvenido</p>
  </>)
}

class Bygoogle extends Component{

    

    render(){
        
        const{
            SignIn,
            user,
            signOut,
            signInWithGoogle,
            signInWithFacebook,
        } = this.props

        return(

            <div>

                {
                    user 
                    ?<Redirect to='/home' />
                    :<Redirect to='/' />

                }

                {
                    user
                    ? <Redirect to='/home' />
                    :  <style type="text/css">{`.navchat {display: none}`}</style>
                }

                {
                    user
                    ?<button className='btn btn-light' onClick = {signOut} >Sign Out</button>
                    :<button className='btn btn-light' onClick = {signWithGoogle} >Sign In With Google</button> 
                    
                }
                {
                    user
                    ?<button className='btn btn-light' onClick = {signOut} >Sign Out</button>
                    :<button className='btn btn-light' onClick = {signWithFb} >Sign In With Facebook</button>
                }

            </div>
        )
    }

}

const firebaseAppAuth = firebaseApp.auth();

const providers = {

    googleProvider: new firebase.auth.GoogleAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider(),
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
})(Bygoogle);