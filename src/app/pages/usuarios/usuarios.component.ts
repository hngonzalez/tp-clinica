import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listaUsuarios:any;

  constructor(private afAuth:AuthService) { }

  ngOnInit(): void {
    this.listaUsuarios = this.afAuth.loteDeUsuarios();
  }

}
