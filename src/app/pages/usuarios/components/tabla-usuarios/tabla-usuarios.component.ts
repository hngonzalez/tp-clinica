import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {
  @Input() listaUsuarios:any ;

  constructor(private afAuth:AuthService) { }

  ngOnInit(): void {
    this.listaUsuarios = this.afAuth.loteDeUsuarios();
    //console.log(this.listaUsuarios);
  }

}
