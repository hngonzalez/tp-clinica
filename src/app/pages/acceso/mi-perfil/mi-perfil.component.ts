import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StorageIMGService } from 'src/app/services/storage-img.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { Workbook } from "exceljs";
//import * as fs from 'file-saver';
const fs = require('file-saver');



@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  disponibilidadHoraria!:any;
  dispoHoraria!:any;
  listaEspecialidades!:any;
  graboDatos!:boolean;
  graboPhotoProfile!:boolean;
  urlImg!:Observable<string>;
  diasMes!:any;
  xlsGenerado!:boolean;

  /* Para datos del usuario */
  dataUserNombre:string;
  dataUserApellido:string;
  dataUserMail:string;
  dataUserUltimaInicioSesion:string;
  dataUserHabilitado:string;
  dataUserTipo!:string;
  dataUserPhotoProfile!:string;

  constructor(private turnosService:TurnosService,
              private auth:AuthService,
              private storageImg:StorageIMGService) { 
    this.disponibilidadHoraria = [
      '8:00','9:00','10:00','11:00'
    ]
    this.diasMes = [
      '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'
    ]
    this.graboDatos = false; 
    this.graboPhotoProfile = false;
    this.xlsGenerado = false;
    this.dispoHoraria = new Array();
    this.dataUserNombre = String(localStorage.getItem('nombre'));
    this.dataUserApellido = String(localStorage.getItem('apellido'));
    this.dataUserMail = String(localStorage.getItem('mail'));
    this.dataUserUltimaInicioSesion = String(localStorage.getItem('lastSignInTime'));
    this.dataUserHabilitado = String(localStorage.getItem('habilitado'));
    this.dataUserPhotoProfile = String(localStorage.getItem('photoURL'));
    
    switch (String(localStorage.getItem('tipo'))) {
      case 'P':
        this.dataUserTipo = 'Paciente'
        break;
      case 'E':
        this.dataUserTipo = 'Especialista'
        break;
      case 'A':
        this.dataUserTipo = 'Administrador'
        break;
      default:
        break;
    }

  }

  ngOnInit(): void {
    this.listaEspecialidades = this.auth.listaEspecialidades();
    //console.log(localStorage);
  }

  actualizarInfo() {
    let dato = (<HTMLSelectElement>document.getElementById('selEspecialidad')).value;
    //let fecha = (<HTMLInputElement>document.getElementById('dateInput')).value;
    let dias = (document.getElementsByName('btnradioDia'));
    let meses = (document.getElementsByName('btnradioMes'));
    let diaelegido = "";
    let meselegido = "";

    dias.forEach(radioBtnDia => {
      if ((<HTMLInputElement>radioBtnDia).checked) {
        //console.log((<HTMLInputElement>radioBtnDia))
        diaelegido = (<HTMLInputElement>radioBtnDia).value
      }
    })

    meses.forEach(radioBtnMes => {
      if ((<HTMLInputElement>radioBtnMes).checked) {
        //console.log((<HTMLInputElement>radioBtnMes))
        meselegido = (<HTMLInputElement>radioBtnMes).value
      }
    })

    if (diaelegido.length != 2) {
      diaelegido = '0' + diaelegido
    }

    if (meselegido.length != 2) {
      meselegido = '0' + meselegido
    }

    let fecha = new Date().getFullYear() + "-" + meselegido + "-" + diaelegido

    //console.log(fecha)
    
    for (let i = 0; i < this.disponibilidadHoraria.length; i++) {
      //const element = this.disponibilidadHoraria[i];
      let stateChk = (<HTMLInputElement>document.getElementById('chk'+i)).checked;

      if (stateChk) {
        let valChk = (<HTMLInputElement>document.getElementById('chk'+i)).value;

        //console.log(valChk);
        this.dispoHoraria.push(valChk);
        //console.log(this.dispoHoraria)
      }
      
    }

    this.turnosService.actualizoDisponibilidad(fecha,this.dispoHoraria,dato)
    this.graboDatos = true;
  }

  actualizarInfoUsuario() {
    let nombre = (<HTMLSelectElement>document.getElementById('nombre')).value;
    let apellido = (<HTMLInputElement>document.getElementById('apellido')).value;

    this.auth.actualizarDatosPerfil(nombre, apellido);
    this.graboDatos = true
  }

  habilitoAlgo() {
    
  }

  async onUpload(e:any) {
    this.graboPhotoProfile = await this.storageImg.upload(e);
  }

  generarXls(){
        
    //Excel Title, Header, Data
    const title = 'Car Sell Report';
    const header = ["Nombre", "Apellido", "Mail", "Tipo", "Habilitado"]
    let data = this.auth.loteUsers();
    let renglon = new Array();
    setTimeout(function(){

      //Create workbook and worksheet
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Car Data');
      
      //Blank Row 
      worksheet.addRow([]);
      //Add Header Row
      let headerRow = worksheet.addRow(header);

      // Add Data and Conditional Formatting
      for (let i = 0; i < data.length; i++) {
        let element = data[i];
        //console.log(element.nombre)
        let a = new Array<string>();
        a.push(element.nombre)
        a.push(element.apellido)
        a.push(element.mail)
        a.push(element.tipo)
        a.push(element.habilitado)

        //console.log(a)
        worksheet.addRow(a);
      }

      //Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'Usuarios.xlsx');
      })
   }, 5000); // 2 seconds timeout
    
    

    
  }
}
