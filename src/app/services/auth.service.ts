import { Injectable } from '@angular/core';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from '@angular/router';
import { Administrador } from '../models/administrador';

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
  registrar(nuevoUsuario:Paciente | Especialista | Administrador, dato:string, nuevaEspecialidad:string) {

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
      tipo: this.dato
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
          console.log(userDoc.data())
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
  
}
