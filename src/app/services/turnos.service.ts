import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private dbPath = 'especialidades';
  referenciaAlaColeccion: AngularFirestoreCollection<any>;
  

  constructor(private db:AngularFirestore,
              //private afAuth:AngularFireAuth,
              private router:Router) { 
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



  crearTurno() {
    let turnoNuevo = new Turno;

    
  }

  consultaTurnos(datito1:any,datito2:any) {
    
    const refEspecialidades = this.db.collection('disponibilidadHoraria').doc(datito2).collection(datito1);
    const collection8 = refEspecialidades.get();
    let listita = new Array();
    collection8.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
        
          console.log(userDoc.data().tomado);
          if (userDoc.data().tomado == "N") {
            listita.push({
              disponibilidad: userDoc.data()
            })  
          }
      })
    })
    
    return listita;
  }

  disponibilidadesHorarias() {
    const collection = this.db.collection('disponibilidadHoraria').get();
    let listita = new Array();
    let idDoc = localStorage.getItem('idDoc');
    collection.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
        if (userDoc.id == idDoc) {
          
        }

      })
    })

  }

  actualizoDisponibilidad(fecha:any,dispoHoraria:[], dato:any) {
    console.log(localStorage);
    let idDoc = localStorage.getItem('idDoc');
    const refDisponibilidad = this.db.collection('disponibilidadHoraria');
    const collection15 = refDisponibilidad.get();
    let listita = new Array();
    let codError = false;

    collection15.subscribe((querySnapshot) => {
      
      dispoHoraria.forEach(element => {
          
            /* Busco nombre */
            
            /* Cargo la disponibilidad */            
        
              refDisponibilidad.doc(`${idDoc}`).set({
                ALGUNAHUEVADAPORQUESINONOFUNCIONAYNOENTIENDO: 'S'
              });
  
              refDisponibilidad.doc(`${idDoc}`).collection(`${dato}`).doc().set({
                especialista: localStorage.getItem('nombre'),
                horario: element,
                fecha: fecha,
                tomado: 'N'
              });

              codError = true;
        });
    })

    return codError;
  }

  tomarTurno(fecha:string, hora:string,especialidad:string, especialista:string) {
    let refNuevoTurno = this.db.collection('turnos')
    let refActualizarDisponibilidad = this.db.collection('disponibilidadHoraria')
    let idDoc = localStorage.getItem('idDoc');

    refNuevoTurno.doc().set({
      especialidad: especialidad,
      especialista: especialista,
      horario: hora,
      fecha: fecha,
      paciente: idDoc,
      estado: 'En espera'
    });

    refActualizarDisponibilidad.doc(`${especialista}`).collection(`${especialidad}`).get().subscribe((querySnapshot) => {
      
      querySnapshot.forEach(element => {
        //console.log(element.data());
        if (element.data().fecha == fecha && element.data().horario == hora) {
          refActualizarDisponibilidad.doc(`${especialista}`).collection(`${especialidad}`).doc(element.id).update({
            tomado: 'S'
          })
        }
      })
    })
  }

  obtenerMisTurnos() {
    let idDoc = localStorage.getItem('idDoc');
    let refTurnosAsignados = this.db.collection('turnos')
    let listita = new Array();
    
    refTurnosAsignados.get().subscribe((querySnapshot) => {
      querySnapshot.forEach(elements => {
        //console.log(elements.data());
        //console.log(idDoc);
        if (idDoc == elements.get('especialista')) {
          listita.push(elements.data());
        }
      })
    })

    return listita;
  }

  misTurnos() {
    let idDoc = localStorage.getItem('idDoc');
    let refTurnosAsignados = this.db.collection('turnos')
    let listita = new Array();
    
    refTurnosAsignados.get().subscribe((querySnapshot) => {
      querySnapshot.forEach(elements => {
        //console.log(elements.data());
        if (idDoc == elements.get('paciente')) {
          listita.push(elements.data());
        }
      })
    })

    return listita;
  }

  modificarTurno(estado:string,paciente:string,especialista:string,fecha:string,horario:string) {
    let refTurnosAsignados = this.db.collection('turnos')
    
    refTurnosAsignados.get().subscribe((querySnapshot) => {
      querySnapshot.forEach(elements => {
        //console.log(elements.data());
        //console.log(idDoc);
        if (elements.get('especialista') == especialista && elements.get('paciente') == paciente && elements.get('fecha') == fecha && elements.get('horario') == horario) {
          console.log(elements.data())
          refTurnosAsignados.doc(elements.id).update({
            estado: estado
          })
        }
      })
    })

  }
}
