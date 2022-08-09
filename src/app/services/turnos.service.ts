import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { element } from 'protractor';
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

  actualizoDisponibilidad(fecha:string,dispoHoraria:[], dato:any) {
    //console.log(fecha);
    let idDoc = localStorage.getItem('idDoc');
    const refDisponibilidad = this.db.collection('disponibilidadHoraria');
    const collection15 = refDisponibilidad.get();
    let listita = new Array();
    let codError = false;

    collection15.subscribe((querySnapshot) => {
      //console.log(idDoc)
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
    let refNuevoTurno = this.db.collection('turnos');
    let refActualizarDisponibilidad = this.db.collection('disponibilidadHoraria');
    let refUsers = this.db.collection('users');
    let collecUsers = refUsers.get();
    let idDoc = localStorage.getItem('idDoc');
    let listita = new Array();
    let pacienteNombre = "";
    let pacienteApellido = "";

    //console.log(fecha + hora + especialidad + especialista)
    refNuevoTurno.doc().set({
      especialidad: especialidad,
      especialista: especialista,
      nombreEspecialista: '',
      pacienteNombre: '',
      pacienteApellido: '',
      horario: hora,
      fecha: fecha,
      paciente: idDoc,
      estado: 'En espera'
    });

    refUsers.doc(`${idDoc}`).get().forEach(element => {
      //console.log(element.get('nombre'))
      //console.log(element.get('apellido'))
      pacienteNombre = element.get('nombre');
      pacienteApellido = element.get('apellido');
    })

    collecUsers.subscribe((querySnapshot) => {
      querySnapshot.forEach((userDoc) => {
        //console.log(userDoc.data());
        if (userDoc.id == especialista) {
          
          let nombreCompleto = "";
          refUsers.doc(`${userDoc.id}`).get().forEach(element => {
            //console.log(element.get('nombre'))
            //console.log(element.get('apellido'))
            nombreCompleto = element.get('apellido') + ' ' + element.get('nombre');
          })

          refNuevoTurno.get().subscribe((querySnap)=>{
            querySnap.forEach((turno)=>{
              console.log(turno.data())
              //console.log(turno.id + ' ' + turno.get('fecha') +' ' + turno.get('horario') +' ' + turno.get('especialista')  + ' ' + turno.get('paciente'))
              //console.log(turno.id + ' ' + fecha +' ' + hora +' ' + especialista + ' ' + idDoc)
              if (turno.get('paciente') == idDoc && turno.get('especialista') == especialista && turno.get('fecha') == fecha && turno.get('horario') == hora) {
                refNuevoTurno.doc(`${turno.id}`).update({
                  nombreEspecialista: nombreCompleto,
                  pacienteNombre: pacienteNombre,
                  pacienteApellido: pacienteApellido
                })
              }
            })
          })
        }
      })
    })

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

  obtenerMisTurnos(filtroValue?:string, valSelFiltro?:any) {
    let idDoc = localStorage.getItem('idDoc');
    let refTurnosAsignados = this.db.collection('turnos')
    let listita = new Array();
    if (filtroValue) {
      
      refTurnosAsignados.ref.where(valSelFiltro,"==", filtroValue).get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (idDoc == doc.get('especialista')) {
              listita.push({
                idTurno: doc.id,
                especialidad: doc.get('especialidad'),
                especialista: doc.get('especialista'),
                nombreEspecialista: doc.get('nombreEspecialista'),
                pacienteNombre: doc.get('pacienteNombre'),
                pacienteApellido: doc.get('pacienteApellido'),
                estado: doc.get('estado'),
                paciente: doc.get('paciente'),
                fecha: doc.get('fecha'),
                horario: doc.get('horario'),
                comentarios: doc.get('comentarios')
              });
            }
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    } else {
      console.log(3)
      refTurnosAsignados.ref.orderBy("fecha","desc").get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (idDoc == doc.get('especialista')) {
              listita.push({
                idTurno: doc.id,
                especialidad: doc.get('especialidad'),
                especialista: doc.get('especialista'),
                nombreEspecialista: doc.get('nombreEspecialista'),
                pacienteNombre: doc.get('pacienteNombre'),
                pacienteApellido: doc.get('pacienteApellido'),
                estado: doc.get('estado'),
                paciente: doc.get('paciente'),
                fecha: doc.get('fecha'),
                horario: doc.get('horario'),
                comentarios: doc.get('comentarios')
              });
            }
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }

    return listita;
  }

  misTurnos() {
    let idDoc = localStorage.getItem('idDoc');
    let refTurnosAsignados = this.db.collection('turnos')
    let listita = new Array();
    
    refTurnosAsignados.get().subscribe((querySnapshot) => {
      querySnapshot.forEach(elements => {
        console.log(elements.data());
        if (idDoc == elements.get('paciente')) {
          listita.push(elements.data());
        }
      })
    })

    return listita;
  }

  modificarTurno(estado:string, paciente:string,especialista:string,fecha:string,horario:string) {
    let refTurnosAsignados = this.db.collection('turnos')
    
    refTurnosAsignados.get().subscribe((querySnapshot) => {
      querySnapshot.forEach(elements => {
        console.log(estado + paciente + ' ' + especialista + ' ' + fecha + horario);
        
        if (elements.get('especialista') == especialista && elements.get('paciente') == paciente && elements.get('fecha') == fecha && elements.get('horario') == horario) {
          console.log(elements.data())
          refTurnosAsignados.doc(elements.id).update({
            estado: estado
          })
        }
      })
    })
  }

  consultaTurnosRapidos(especialidad:string) {
    let refNuevoTurno = this.db.collection('turnos')
    let refActualizarDisponibilidad = this.db.collection('disponibilidadHoraria')
    let idDoc = localStorage.getItem('idDoc');
    let listita = new Array();

    //console.log(especialidad)
    refActualizarDisponibilidad.get().subscribe((elemento) => {
      
      elemento.forEach(especi => {
        //console.log(especi.id)
        refActualizarDisponibilidad.doc(`${especi.id}`).collection(`${especialidad}`).get().subscribe((querySnapshot) => {
          querySnapshot.forEach(element => {
            
            //console.log(element.data());
            if (element.get('tomado') != 'S') {
              listita.push({
                idEspe: especi.id,
                especialista: element.get('especialista'),
                fecha: element.get('fecha'),
                horario: element.get('horario'),
                tomado: element.get('tomado')
              });  
            }
          })
        })
      })
    })
    
    //console.log("yo: ",listita);
    

    /*listita = listita.sort(function (o1,o2) {
      if (o1.horario > o2.horario) { //comparación lexicogŕafica
        return 1;
      } else if (o1.horario < o2.horario) {
        return -1;
      } 
      return 0;
    });*/

    //console.log(listita)
    return listita;
  }
  
  consultaEspecialistas(especialidad:string) {
    const refEspecialidades = this.db.collection('users');
    const collection3 = refEspecialidades.get();
    let listita = new Array();
    collection3.subscribe((querySnapshot) => {

      //querySnapshot is "iteratable" itself
      querySnapshot.forEach((userDoc) => {
          
          //userDoc contains all metadata of Firestore object, such as reference and id
          //console.log(userDoc.id)
          //If you want to get doc data
          /*var userDocData = userDoc.data()
          console.dir(userDoc.data())*/

          if (userDoc.get('especialidad') == especialidad) {
            listita.push({
              id: userDoc.id,
              profileImg: userDoc.get('profileImg'),
              especialista: userDoc.get('nombre') + " " + userDoc.get('apellido')
            })  
          }

      })
    })

    //console.log(listita)
    return listita;
  }

  async listadoMisPacientes() {
    let idDoc = localStorage.getItem('idDoc');
    let refTurnosAsignados = this.db.collection('turnos')
    let listita = new Array();
    
    refTurnosAsignados.get().subscribe((querySnapshot) => {
      querySnapshot.forEach(elements => {
        //console.log(elements.data());
        if (idDoc == elements.get('especialista')) {
          listita.push(elements.data());
        }
      })
    })

    return listita;
  }

  async listadoMisPacientesUnicos() {
    let idDoc = localStorage.getItem('idDoc');
    let refTurnosAsignados = this.db.collection('turnos')
    let listita = new Array();
    
    refTurnosAsignados.get().subscribe((querySnapshot) => {
      querySnapshot.forEach(elements => {
        //console.log(elements.data());
        if (idDoc == elements.get('especialista') && elements.get('estado') == 'Realizado') {
          if (!listita.includes(elements.get('paciente'))) {
            listita.push({
              idTurno: elements.id,
              idDocPaciente: elements.get('paciente'),
              pacienteNombre: elements.get('pacienteNombre'),
              pacienteApellido: elements.get('pacienteApellido')
            })
          }
        }
      })
    })
    return listita;
  }


  listaTurnosPacienteUnico(pacienteUnico:string){
    let refTurnosAsignados = this.db.collection('turnos')
    let listita = new Array();
    
    refTurnosAsignados.ref.orderBy("fecha","desc").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(pacienteUnico);
          if (pacienteUnico == doc.get('paciente') && doc.get('estado') == "Realizado") {
            listita.push({
              idTurno: doc.id,
              especialista: doc.get('especialista'),
              nombreEspecialista: doc.get('nombreEspecialista'),
              nombrePaciente: doc.get('nombrePaciente'),
              paciente: doc.get('paciente'),
              fecha: doc.get('fecha'),
              horario: doc.get('horario'),
              estado: doc.get('estado')
            })
          }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    return listita;
  }

  getHistoriaClinica(idTurno:string) {
    let idDoc = localStorage.getItem('idDoc');
    let refTurnos = this.db.collection('historiasClinicas');
    //let fbComentarios = fb.get('comentarios')?.value;
    let listita = new Array();
    

    refTurnos.ref.where("idPaciente","==", idDoc).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(pacienteUnico);
          listita.push(doc.data())
      });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    return listita;
  }






}
