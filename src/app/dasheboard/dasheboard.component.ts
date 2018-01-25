import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../model/usuario'

@Component({
  selector: 'app-dasheboard',
  templateUrl: './dasheboard.component.html',
  styleUrls: ['./dasheboard.component.css']
})
export class DasheboardComponent implements OnInit {
  
  @Input()
  usuario: Usuario;

  @Output()
  autenticacao = new EventEmitter<boolean>();

  opcao: String = "app-monitor";
  status_menu: boolean = true;

  constructor() { }

  ngOnInit() {

  }

  setOpcao(op:String):void{
    this.opcao = op;
    //console.log(this.opcao)
  }

  teste(event){
    console.log(event);
  }

  sair(){
    this.usuario = null;
    this.autenticacao.emit(false);
  }

  statusMenu(){
    this.status_menu = !this.status_menu;
  }
}
