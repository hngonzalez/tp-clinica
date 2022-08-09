import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-tabla-turnos-especialista',
  templateUrl: './tabla-turnos-especialista.component.html',
  styleUrls: ['./tabla-turnos-especialista.component.css']
})
export class TablaTurnosEspecialistaComponent implements OnInit {
  @Input() filtroMisTurnos!:any;
  listaMisTurnos!:any;
  formHistoriaClinica!:FormGroup;
  historiaGrabada!:boolean;
  comentariosTurno!:string;
  filter?: string;

  /* Datos elegidos */
  pacienteElegido!:string;
  estadoelegido!:string;
  especialistaElegido!:string;
  fechaElegida!:string;
  horarioElegido!:string;
  idTurno!:string;
  turnoIndex!:number;

  constructor(private turnosService:TurnosService,
              private fb:FormBuilder,
              private auth:AuthService) { 
  }

  ngOnInit(): void {
    this.formHistoriaClinica = this.fb.group({
      'comentarios': ['', Validators.required]
    });
    this.historiaGrabada = false;
    this.comentariosTurno = "";
    this.misTurnos();
    console.log(this.listaMisTurnos);
  }

  misTurnos() {
    this.listaMisTurnos = this.turnosService.obtenerMisTurnos();
  }

  modificarTurno(estado:string,paciente:string,especialista:string,fecha:string,horario:string, idTurno:string, turnoIndex:number) {
    this.estadoelegido = estado;
    this.pacienteElegido = paciente;
    this.especialistaElegido = especialista;
    this.fechaElegida = fecha;
    this.horarioElegido = horario;
    this.idTurno = idTurno;
    this.turnoIndex = turnoIndex;

    if (estado != 'Realizado') {
      this.turnosService.modificarTurno(estado, paciente, especialista, fecha, horario);
    }
  }

  verComentarios(comentarios:string){
    this.comentariosTurno = comentarios;
  }

  grabarComentariosTurno() {
    //console.log(this.auth.graboHistoriaClinica(this.formHistoriaClinica, this.pacienteElegido));
    let graboHistoria = this.auth.graboComentariosTurno(this.formHistoriaClinica, this.pacienteElegido, this.idTurno);
    
    if (graboHistoria) {
      this.historiaGrabada = graboHistoria;
      this.turnosService.modificarTurno(this.estadoelegido, this.pacienteElegido, this.especialistaElegido, this.fechaElegida, this.horarioElegido);
      (<HTMLElement>document.getElementById('btnFinalizar'+this.turnoIndex)).className = 'btn btn-light disabled';
      (<HTMLElement>document.getElementById('btnFinalizar'+this.turnoIndex)).textContent = 'Finalizado';
    }
  }

  async buscar(event: any) {
    console.log(event)
    let valSelFiltro = (<HTMLInputElement>document.getElementById('selFiltro')).value
    let valFiltro = (<HTMLInputElement>document.getElementById('search')).value
    this.listaMisTurnos = await this.turnosService.obtenerMisTurnos(valFiltro, valSelFiltro);
  }
}
