import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.css']
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
        if (idDoc == element.data().paciente) {
          this.existData = true;
          this.arrayHistoriaClinica?.push(element.data());  
        }  
      });
    })
  }
}
