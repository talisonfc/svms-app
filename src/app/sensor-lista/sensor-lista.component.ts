import { Component, OnInit, Input } from '@angular/core';
import {Sensor} from '../../model/sensor'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-sensor-lista',
  templateUrl: './sensor-lista.component.html',
  styleUrls: ['./sensor-lista.component.css']
})
export class SensorListaComponent implements OnInit {

  @Input()
  sensores: Array<Sensor>

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  delete(id:number, index:number){
    this.http.delete(environment.urlapi+"/sensor/"+id).subscribe(res=>{
      this.sensores.splice(index,1)
    })
  }
}
