import { Component, OnInit } from '@angular/core';
import {Sensor} from '../../model/sensor'
import {HttpClient} from '@angular/common/http'
import {Socket} from 'ng-socket-io'
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  sensor: Sensor
  sensores: Array<Sensor>

  constructor(private http: HttpClient /*, private socket: Socket*/) {
    this.sensores = new Array()
    this.sensor = new Sensor()
  }

  ngOnInit() {
    this.http.get<Sensor[]>(environment.urlapi+'/sensores').subscribe(res=>{
      this.sensores = res;
    })
  }

  cadastrar(){
    this.http.post<Sensor>(environment.urlapi+"/sensor", this.sensor).subscribe(res=>{
      this.sensores.push(res)
      this.sensor = new Sensor();
    })
  }

  limpar(){
    this.sensor = new Sensor()
  }

  /*
  receive(){
    return this.socket.fromEvent("change-value").subscribe(data=>{
      console.log(data)
    })
  }
  */
}
