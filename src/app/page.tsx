'use client'
import { useCollection } from 'react-firebase-hooks/firestore'
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore'
import app, { analytics } from '../../firebase/config'
import { Fragment, useEffect, useState } from 'react'
import { useDownloadURL, useUploadFile } from 'react-firebase-hooks/storage';
import { useCreateUserWithEmailAndPassword, useDeleteUser, useSendPasswordResetEmail, useUpdatePassword, useVerifyBeforeUpdateEmail } from 'react-firebase-hooks/auth'
import { getStorage, ref as storageRef } from 'firebase/storage'
import { logEvent } from 'firebase/analytics'
import { User, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {
  const auth = getAuth(app)

  const [createUserWithEmailPassword, user, loading, error]
    = useCreateUserWithEmailAndPassword(auth)

  const [updateBeforeEmail, loadingUBE, errorUBE]
    = useVerifyBeforeUpdateEmail(auth)

  const [updatePassword, loadingUP, errorUP] = useUpdatePassword(auth)

  const [sendEmailRemember, loadingSEM, errorSEM] = useSendPasswordResetEmail(auth)

  const [deleteCurrentUser, loadingDCU, errorDCU] = useDeleteUser(auth)

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleCorreoChange = (e: any) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e: any) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const respuesta = await signInWithEmailAndPassword(auth, correo, contrasena);
      if (respuesta.user!.emailVerified === false) {
        console.error("El usuario no esta verificado")
      } else {
        console.log("El inicio de sesion es correcto")
      }
    } catch (e) {
      console.error("El inicio de sesion es incorrecto")

    }
  };

  const crearCuenta = async () => {
    try {
      const respuesta = await createUserWithEmailPassword(correo, contrasena);
    } catch (e) {
      console.error("Creacion de cuenta incorrecta")
    }
  }

  const enviarCredenciales = async (userCreado: User) => {
    await sendEmailVerification(userCreado)
  }

  const update = async () => {
    await updateBeforeEmail('alvaro.ariel1@yopmail.com', null)
  }
  const updatePasswordfunction = async () => { 
    console.log('ingresa al metodo')
    const resultado = await updatePassword('654321')
    if(resultado){
      console.log('contrasena actualizada')
    } else {
      console.error('contrasena no actualizada')
    }
  }
  const sendEmail = async () => {
    await sendEmailRemember('alvaro.ariel1@yopmail.com')
   }

  const deleteUser = async () => { 
    await deleteCurrentUser()
  }


  useEffect(() => {
    if (!loading) {
      if (error) {
        console.error("Creacion de cuenta incorrecta ", error)
      } else {
        console.log("Creacion de cuenta correcta ", user)
        enviarCredenciales(user?.user!)
      }
    }
  }, [error, user, loading])


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Correo:</label>
          <input
            type="text"
            id="correo"
            value={correo}
            onChange={handleCorreoChange}
          />
        </div>
        <div>
          <label htmlFor="apellidos">Password:</label>
          <input
            type="text"
            id="password"
            value={contrasena}
            onChange={handleContrasenaChange}
          />
        </div>
        <div>
          <button type="submit">Iniciar Sesion</button>
          <button onClick={crearCuenta}>Crear cuenta</button>
        </div>
        <div>
          <button onClick={update}>Actualizar</button>
          <button onClick={updatePasswordfunction}>Actualizar Contrasena</button>
          <button onClick={sendEmail}>Enviar correo</button>
          <button onClick={deleteUser}>Eliminar</button>
        </div>
      </form>
    </div>
  );
}
