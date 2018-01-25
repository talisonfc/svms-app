import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Produto } from '../../model/produto'
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto;
  produtos: Array<Produto>;
  mensagem: string;

  constructor(private http:HttpClient) { 
    this.produto = new Produto();
    this.produto.sensor = false;
    this.produtos = new Array();
  }

  ngOnInit() {
    this.http.get<Produto[]>(environment.urlapi+'/produtos').subscribe((res)=>{
      this.produtos = res;
    })
  }

  cadastrar(){
    this.produto.print();
    this.http.post<Produto>(environment.urlapi+'/produto', this.produto).subscribe(res=>{
      //console.log(res);
      this.produtos.push(res)
      this.mensagem = "Produto cadastrado com sucesso!"
    })
  }

  limpar(){
    this.produto = new Produto();
  }

  sensor(){
    this.produto.sensor = !this.produto.sensor;
  }
}
