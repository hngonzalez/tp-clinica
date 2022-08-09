import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {
  @Input() listadoPacientes!:any;
  listadoPacientesUnicos!:any;
  formHistoriaClinica!:FormGroup;
  listaTurnosPacienteUnico!:any;
  historiaClinica!:any;
  pacienteElegido!:string;
  turnoElegido!:string;
  click!:boolean;

  constructor(
    private turnos:TurnosService,
    private auth:AuthService,
    private fb:FormBuilder
  ) { 
    this.formHistoriaClinica = fb.group({
      'altura': ['', Validators.required],
      'peso': ['', Validators.required],
      'presion': ['', new FormControl('', Validators.required)],
      'temperatura': ['', new FormControl('', Validators.required)],
      'edad': ['', new FormControl('', Validators.required)],
      'asma': ['', new FormControl('', Validators.required)],
      'fuma': ['', new FormControl('', Validators.required)],
      'operaciones': ['', new FormControl('', Validators.required)]
    });
  }

  ngOnInit(): void {
    this.click = false;
    this.listadoMisPacientes();
  }

  async listadoMisPacientes() {
    //console.log(1);
    this.listadoPacientes = await this.turnos.listadoMisPacientes();
    console.log(this.listadoPacientes);
    this.listadoPacientesUnicos = await this.turnos.listadoMisPacientesUnicos();
    console.log(this.listadoPacientesUnicos);
    
    //this.listadoPacientesUnicos = this.listadoPacientes.filter


    /*let a = this.listadoPacientes
    let b = this.turnos.listadoMisPacientes();
    let c = new Array();

    var callMethod = function()
    {
      a = b
    }

    setTimeout(function(){  
      callMethod();
      //this.listadoPacientesUnicos = this.listadoPacientes.filter
      //console.log(a)
      for(var i = 0; i < a.length; i++) {
 
        const elemento = a[i];
       
        if (!c.includes(a[i])) {
          c.push(elemento);
        }
      }

    }, 3000);*/

    
  }

  enviarHistoriaClinica() {
    //console.log('llega');
    this.auth.graboHistoriaClinica(this.formHistoriaClinica, this.pacienteElegido, this.turnoElegido);
  }

  cargoTurnosPaciente(pacienteUnico:string) {
    this.listaTurnosPacienteUnico = this.turnos.listaTurnosPacienteUnico(pacienteUnico);
    //console.log(this.listaTurnosPacienteUnico)
  }

  cargoDatosPaciente(idTurno:string, idPacienteElegido:string){
    this.click = true;
    this.pacienteElegido = idPacienteElegido;
    this.turnoElegido = idTurno;
    this.historiaClinica = this.turnos.getHistoriaClinica(idTurno);
    console.log(this.historiaClinica)
  }
}