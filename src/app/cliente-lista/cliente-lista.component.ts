import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Cliente } from '../../model/cliente'
import { Element } from '@angular/compiler';
import { element } from 'protractor';

const urlapi = "//svms-ws.umbler.net";

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  @Input()
  clientes: Cliente[];
  @Input()
  cliente: Cliente;

  constructor(private http: HttpClient) {
    this.clientes = new Array();
  }

  ngOnInit() {
  }

  delete(id: String, index: number) {
    this.http.delete(urlapi+'/cliente/' + id).subscribe(res => {
      //console.log(res);
      //console.log(index);
      this.clientes.splice(index,1);
    })
  }

  select(id:number){
    this.http.get<Cliente>(urlapi+'/cliente/' + id).subscribe(res => {
      this.cliente = res;
      //console.log(res)
    })
  }

  update(id:number, index:number){
  }
}
