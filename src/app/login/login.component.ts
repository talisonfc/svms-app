import { Component, OnInit, EventEmitter, Input, Output, Inject } from '@angular/core';
import { Usuario } from '../../model/usuario'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.prod';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  novousuario: Usuario;
  msg: String = "";

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.novousuario = new Usuario();
  }

  ngOnInit() {
    //this.usuario.usuario = 'tfccomputation@gmail.com'
    //this.usuario.senha = '1234'
    //this.login()
  }

  // texto para resposta ao sim
  login(){
    //console.log(this.usuario)
    this.http.get(environment.urlapi+"/usuario/"+this.usuario.usuario+"/"+this.usuario.senha).subscribe(res => {
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

  
  openCadastrarUsuario(): void{
    let dialogRef = this.dialog.open(CadastrarUsuario, {
      width: '500px',
      height: 'auto',
      data: {usuario: this.novousuario}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('A caixa de dialogo foi fechada')
      console.log(result)
    })
  }
  
}

@Component({
  selector: "cadastrar-usuario",
  templateUrl: './cadastrar-usuario.html',
  styleUrls: ['./cadastrar-usuario.css']
})
export class CadastrarUsuario{

  msg: string = "";

  constructor(public dialogRef: MatDialogRef<CadastrarUsuario>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient){}

  onNoClick(): void{
    this.dialogRef.close();
  }

  fechar(){
    this.dialogRef.close();
  }

  cadastrar(){
    var newuser = {
      email: this.data.usuario.usuario,
      senha: this.data.usuario.senha
    }
    this.http.post(environment.urlapi+"/usuario",newuser).subscribe(res => {
      console.log(res);
    })

    //console.log(this.data)
    this.msg = "Cadastro realizado com sucesso!"
    this.data.usuario = new Usuario();
  }
}
