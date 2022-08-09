import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.css'],
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(300,style({
          transform:'translatex(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class MisTurnosPacienteComponent implements OnInit {
  filtroMisTurnos!:any;
  arrayHistoriaClinica?: any[] = [];
  existData: boolean = false;  

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  getClinicalHistory() {
    const idDoc = localStorage.getItem('idDoc');
    this._authService.getHistoriaClinica()
    .subscribe( resp =>{
      resp.forEach((element:any) => {
        if (idDoc == element.data().idPaciente) {
          this.existData = true;
          this.arrayHistoriaClinica?.push(element.data());  
        }  
      });
    })
  }
}
