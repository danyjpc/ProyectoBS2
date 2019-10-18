import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { TareasService } from 'src/app/services/tareas.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  private items: Tarea[];
  public nuevo: Tarea = new Tarea();
  constructor(private service: TareasService, private http2: HttpClient, private servicioModal: NgbModal,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.findList().subscribe(
      items => {
        console.log(items);
        this.items = items;
      },
      err => {
        console.log(err);
      }
    );
  }

  Guardar(){
    this.service.guardar(this.nuevo).subscribe(
      items => {
        console.log(items);
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  eliminar(val){
    this.service.eliminarPorId(val.cod_tarea).subscribe(
      items => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }
}
