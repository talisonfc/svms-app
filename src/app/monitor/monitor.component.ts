import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../../model/sensor';
import { MonitorService } from '../../providers/monitorService';

const urlapi = "//svms-ws.umbler.net";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  sensores: Array<Sensor>;

  constructor(private http:HttpClient,
              private monitorService: MonitorService) { }

  ngOnInit() {
    this.http.get<Sensor[]>(urlapi+'/sensores').subscribe(res=>{
      this.sensores = res;
    })

    this.monitorService.getMenssage().subscribe(data=>{
      var temp = <{id: string, valor: number}>data;
      this.sensores.forEach(s => {

        if(s._id === temp.id){
          s.valor = temp.valor;
        }
      })
    })
    
  }

}
