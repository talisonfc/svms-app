import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../model/usuario'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.prod';

const urlapi = "//svms-ws.umbler.net";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  usuario: Usuario;
  
  @Output()
  autenticacao = new EventEmitter<boolean>();

  msg: String = "";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    //this.usuario.usuario = 'tfccomputation@gmail.com'
    //this.usuario.senha = '1234'
    //this.login()
  }

  // texto para resposta ao sim
  login(){
    //console.log(this.usuario)
    this.http.get(urlapi+"/usuario/"+this.usuario.usuario+"/"+this.usuario.senha).subscribe(res => {
      //console.log(res)
      if(!res){
        this.msg = "Usuário ou senha incorreto!";
        this.autenticacao.emit(false);
      }
      else{
        this.msg = ""
        this.autenticacao.emit(true);
      }
    })
    
  }

}
