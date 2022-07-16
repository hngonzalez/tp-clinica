import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from '@angular/router';
import { Administrador } from '../models/administrador';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { StorageIMGService } from './storage-img.service';
import { FormGroup } from '@angular/forms';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = 'users';
  referenciaAlaColeccion: AngularFirestoreCollection<any>;
  nUser:any;
  dato!:string;
  nuevaEspecialidad!:string;

  constructor(private db: AngularFirestore,
              private afAuth:AngularFireAuth,
              private router:Router) { 
    this.referenciaAlaColeccion = db.collection(this.dbPath);
  }

  /* -------------------------------------
    SECCION LOGIN
  ------------------------------------- */ 

  login(email:string, psw:string) {
    this.afAuth.signInWithEmailAndPassword(email, psw)
      .catch(error => {
        //console.log(error);
        //this.router.navigate(['loginerror']);
      })
      .then(userCredential => {
        if(userCredential) {
          var idDoc = userCredential.user?.uid;

          this.setLocalStorageData(userCredential, idDoc!);
          
          localStorage.setItem('online','true');
          this.router.navigate(['/home']);          
          
          /*this.uIdDoc = String(idDoc);
          this.uCred = userCredential;
          this.setLocalStorage(userCredential, String(idDoc));

          this.router.navigate(['/home']);
          */
          //console.log(userCredential.user?.uid);
          //localStorage.setItem('');
        }
    })
  }

  logout() {
    return this.afAuth.signOut();
  }

  getUserState() {
    return this.afAuth.authState;
  }

  setLocalStorageData(userCredential:firebase.auth.UserCredential, idDoc:string){
    var docRef = this.referenciaAlaColeccion.doc(idDoc);
    docRef.get().subscribe( usersData => { 
      //console.log(usersData.data())
      /* Seteo el localStorage */
      localStorage.setItem('idDoc', idDoc);
      localStorage.setItem('displayName', usersData.data().name);
      localStorage.setItem('photoURL', String(userCredential.user?.photoURL));
      localStorage.setItem('mailVerified', String(userCredential.user?.emailVerified));
      localStorage.setItem('lastSignInTime', String(userCredential.user?.metadata.lastSignInTime));
      localStorage.setItem('tipo', String(usersData.data().tipo));
      localStorage.setItem('habilitado', String(usersData.data().habilitado));
      localStorage.setItem('mail', String(usersData.data().mail));
      localStorage.setItem('nombre', String(usersData.data().nombre));
      localStorage.setItem('apellido', String(usersData.data().apellido));
      localStorage.setItem('tipo', String(usersData.data().tipo));
      localStorage.setItem('habilitado', String(usersData.data().habilitado));
    });    
  }

  /* -------------------------------------
    SECCION REGISTRO
  ------------------------------------- */ 
  registrar(nuevoUsuario:Paciente | Especialista | Administrador, dato:string, nuevaEspecialidad:string, file?:File, storage?:StorageIMGService) {
    //console.log(file)
    this.dato = dato;
    this.nuevaEspecialidad = nuevaEspecialidad;

    let email = nuevoUsuario.mail;
    let password = nuevoUsuario.password;

    //console.log(email);
    this.afAuth.createUserWithEmailAndPassword(email,password)
      .then( userCredential => {
        console.log(userCredential);
        //this.router.navigate(['register/regpaok']);
        this.nUser = nuevoUsuario;
        //console.log(typeof(this.nUser));
        this.insertDataFireAuth(userCredential)
          .then(()=> {
            //console.log('cambio pag');
            //this.InsertoEncuesta(userCredential);
            if (file && storage) {
              storage?.upload2(file, <string>userCredential.user?.uid);
            }
            this.router.navigate(['register/regpaok']);
            this.afAuth.signOut();
          })
      })
  }

  insertDataFireAuth(userCredential:firebase.auth.UserCredential){
    var nusr;

    switch (this.dato) {
      case 'P':
        nusr = new Paciente();    
        break;
      case 'E':
        nusr = new Especialista();
        break;
      case 'A':
        nusr = new Administrador();
        break;
    }

    nusr = this.nUser;

    if (this.dato == 'E' && this.nuevaEspecialidad == 'S') {
      this.db.doc(`especialidades/${nusr.especialidad}`).set({
        especialidad:nusr.especialidad
      });
    }

    return this.db.doc(`users/${userCredential.user?.uid}`).set({
      ...nusr,
      habilitado: 'N',
      administrador: this.dato == 'A' ? 'S' : 'N',
      tipo: this.dato,
      profileImg: ''
    });
  }
 
  /* -------------------------------------
    SECCION USUARIOS
  ------------------------------------- */ 
  loteDeUsuarios() {

    const collection = this.referenciaAlaColeccion.get();
    let listita = new Array();
    collection.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
  
          //userDoc contains all metadata of Firestore object, such as reference and id
          //console.log(userDoc.data())
          //If you want to get doc data
          var userDocData = userDoc.data()
          //console.dir(userDocData)

          if (userDoc.data().tipo == 'E' || userDoc.data().tipo == 'A') {
            listita.push({
              nombre: userDoc.data().nombre,
              apellido: userDoc.data().apellido,
              mail: userDoc.data().mail,
              tipo: userDoc.data().tipo,
              habilitado: userDoc.data().habilitado,
              administrador: userDoc.data().administrador,
            })  
          }
      })
    })

    return listita;
  }

  loteUsers() {
    
    const collection = this.referenciaAlaColeccion.get();
    let listita = new Array();
    collection.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
  
          //userDoc contains all metadata of Firestore object, such as reference and id
          //console.log(userDoc.data())
          //If you want to get doc data
          var userDocData = userDoc.data()
          //console.dir(userDocData)

          listita.push({
            nombre: userDoc.data().nombre,
            apellido: userDoc.data().apellido,
            mail: userDoc.data().mail,
            tipo: userDoc.data().tipo,
            habilitado: userDoc.data().habilitado,
            administrador: userDoc.data().administrador,
          })  
      })
    })

    return listita;
  }

  listaEspecialidades() {
    const refEspecialidades = this.db.collection('especialidades');
    const collection2 = refEspecialidades.get();
    let listita = new Array();
    collection2.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
  
          //userDoc contains all metadata of Firestore object, such as reference and id
          /*console.log(userDoc.id)
          //If you want to get doc data
          var userDocData = userDoc.data()
          console.dir(userDocData)*/

          listita.push({
            especialidad: userDoc.id,
          })

      })
    })

    return listita;
  }

  listaEspecialistas(dato:string) {
    const refEspecialidades = this.db.collection('users');
    const collection3 = refEspecialidades.get();
    let listita = new Array();
    collection3.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
          
          //userDoc contains all metadata of Firestore object, such as reference and id
          //console.log(userDoc.id)
          //If you want to get doc data
          var userDocData = userDoc.data()
          //console.dir(dato)

          if (userDoc.get('especialidad') == dato) {
            listita.push({
              id: userDoc.id,
              especialidad: userDoc.get('nombre') + " " + userDoc.get('apellido')
            })  
          }

      })
    })

    return listita;
  }

  habilitarUsuario(mailUser:string) {
    let refUsuarios = this.db.collection('users');
    let collectionUsers = refUsuarios.get();

    collectionUsers.subscribe((querySnapshot) => {
      querySnapshot.forEach(usuario => {
        //console.log(usuario.data())

        /* Verifico que sea el usuario */
        if (mailUser == usuario.get('mail')) {
          /* Con su ID busco y lo habilito */
          this.db.doc(`users/${usuario.id}`).update({
            habilitado: 'S'
          })
        }

      })

    })
    
  }
  
  actualizarImgProfile(urlImage:Observable<string>) {
    let a = this.afAuth.credential;
    let idDoc = localStorage.getItem('idDoc')
    let refUsuarios = this.db.collection('users');
    let collectionUsers = refUsuarios.get();

    this.afAuth.currentUser.then(element => {
      console.log(element)
      element?.updateProfile({
        photoURL: String(urlImage)
      })
      .then(function() { 
        //console.log(urlImage) 
        localStorage.setItem('photoURL', String(urlImage));
      })
      .catch(function(error) { console.log(error) });
    })
    
    this.db.doc(`users/${idDoc}`).update({
      profileImg: String(urlImage)
    })
  }
  
  actualizarDatosPerfil(nombre:string, apellido:string) {
    let a = this.afAuth.credential;
    let idDoc = localStorage.getItem('idDoc')

    this.db.doc(`users/${idDoc}`).update({
      nombre: nombre,
      apellido: apellido
    });
    
    var docRef = this.referenciaAlaColeccion.doc(`${idDoc}`);
    docRef.get().subscribe( usersData => { 
      //console.log(usersData.data())
      /* Seteo el localStorage */
      localStorage.setItem('nombre', String(usersData.data().nombre));
      localStorage.setItem('apellido', String(usersData.data().apellido));
    });
    
  }
  
  graboHistoriaClinica(fb:FormGroup, paciente:string, idTurno:string) {
    let refHistoriasClinicas = this.db.collection('historiasClinicas');
    let idDoc = localStorage.getItem('idDoc');
    /* Datos de la historia clinica */
    let fbAltura = fb.get('altura')?.value;
    let fbPeso = fb.get('peso')?.value;
    let fbTemperatura = fb.get('temperatura')?.value;
    let fbPresion = fb.get('presion')?.value;
    let fbAsma = fb.get('asma')?.value;
    let fbFuma = fb.get('fuma')?.value;
    let fbOperaciones = fb.get('operaciones')?.value;


    let documentoGrabado;

    refHistoriasClinicas.add({
      idTurno: idTurno,
      idPaciente: paciente,
      idEspecialista: idDoc,
      fechaCreacion: new Date(),
      altura: fbAltura,
      peso: fbPeso,
      temperatura: fbTemperatura,
      presion: fbPresion,
      asma: fbAsma,
      fuma: fbFuma,
      operaciones: fbOperaciones
    })

    documentoGrabado = true;

    return documentoGrabado;
  }

  graboComentariosTurno(fb:FormGroup, paciente:string, idTurno:string) {
    let refTurnos = this.db.collection('turnos');
    let fbComentarios = fb.get('comentarios')?.value;
    let documentoGrabado;

    refTurnos.doc(`${idTurno}`).update({
      comentarios: fbComentarios
    })

    documentoGrabado = true;

    return documentoGrabado;
  }

  getComentariosTurno(idTurno:string) {
    let refComentariosTurno = this.db.collection('comentariosTurno');
    let idDoc = localStorage.getItem('idDoc');
    let comentarios = "";

    refComentariosTurno.get().subscribe( (querySnapshot) => {
      querySnapshot.forEach(comentar2ios => {
        if (comentar2ios.get('idTurno') == idTurno) {
          comentarios = comentar2ios.get('comentarios')
          console.log(comentarios)
        }
      })
    })
    
    return comentarios;
  }



}
