import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  listaMisTurnos!:any;

  constructor(private turnoServicio:TurnosService) { 
    this.listaMisTurnos = this.turnoServicio.obtenerMisTurnos();
  }

  ngOnInit(): void {
    
    console.log(this.listaMisTurnos);
  }


}
