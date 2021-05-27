import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private dbPath = 'especialidades';
  referenciaAlaColeccion: AngularFirestoreCollection<any>;
  

  constructor(private db:AngularFirestore,
              //private afAuth:AngularFireAuth,
              /*private router:Router*/) { 
    this.referenciaAlaColeccion = db.collection(this.dbPath);
  }

  traerEspecialidades(){
    const collection = this.referenciaAlaColeccion.get();
    let listita = new Array();
    collection.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
  
          //userDoc contains all metadata of Firestore object, such as reference and id
          //console.log(userDoc)
          //If you want to get doc data
          var userDocData = userDoc.data()
          console.dir(userDocData)

          listita.push({
            especialidad: userDoc.data().especialidad
          })

      })
    })

    return listita;
  }
}
