import { Injectable } from '@angular/core';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = 'users';
  referenciaAlaColeccion: AngularFirestoreCollection<any>;

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
        console.log("asdasdasd");
        //this.router.navigate(['loginerror']);
      })
      .then(userCredential => {
        if(userCredential) {
          localStorage.setItem('online','true');
          this.router.navigate(['/home']);          
          /*var idDoc = userCredential.user?.uid;
          this.uIdDoc = String(idDoc);
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

  /* -------------------------------------
    SECCION REGISTRO
  ------------------------------------- */ 
  registrar(nuevoUsuario:Paciente | Especialista) {

    let email = nuevoUsuario.mail;
    let password = nuevoUsuario.password;

    //console.log(email);
    this.afAuth.createUserWithEmailAndPassword(email,password)
      .then( userCredential => {
        console.log(userCredential);
        this.router.navigate(['register/regpaok']);
        //this.nUser = newUser;
        /*this.InsertDataFireAuth(userCredential)
          .then(()=> {
            //console.log('cambio pag');
            //this.InsertoEncuesta(userCredential);
            //this.router.navigate(['registerok']);
          })*/
      })
  }

 /* InsertDataFireAuth(userCredential:firebase.auth.UserCredential){

    var nusr = new User(this.nUser.name, this.nUser.password)
    return this.db.doc(`users/${userCredential.user?.uid}`).set({
      email: this.nUser.name,
      password: this.nUser.password
      ...nusr
    });
  }
  */
  
}
