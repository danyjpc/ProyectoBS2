import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { EmpleadoService } from "src/app/services/empleado.service";
import { Empleado } from "src/app/models/empleado";
import { Puestos } from "src/app/models/puesto";
import { PuestosService } from "src/app/services/puestos.service";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Subject, Observable, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map
} from "rxjs/operators";

@Component({
  selector: "editar-empleado",
  templateUrl: "editar-empleado.component.html"
})
export class EditarEmpleadoComponent implements OnInit {
  //Aca va la declaracion de variables
  public listEmpleado: Empleado[];
  public emp: Empleado = new Empleado();
  public estado: boolean;
  public listPuestos: Puestos[];
  public model: Puestos = new Puestos();
  constructor(
    private router: Router,
    private service: EmpleadoService,
    private p: PuestosService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.p.findList().subscribe(items => {
        this.listPuestos = items;
      });
    this.route.params.subscribe(params => this.cargar(params.id));
  }
  /**
  * Metodo para la busqueda en tiempo real
  * El formater formatea las entradas y las sugerencias
  * Para el puesto
  */
 formatter = (result: Puestos) => result.nombre;

 @ViewChild("instance") instance: NgbTypeahead;
 focus$ = new Subject<string>();
 click$ = new Subject<string>();
 search = (text$: Observable<string>) => {
   const debouncedText$ = text$.pipe(
     debounceTime(200),
     distinctUntilChanged()
   );
   const clicksWithClosedPopup$ = this.click$.pipe(
     filter(() => !this.instance.isPopupOpen())
   );
   const inputFocus$ = this.focus$;

   return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
     map(term =>
       (term === ""
         ? this.listPuestos
         : this.listPuestos.filter(
             v =>
               v.nombre
                 .toLocaleLowerCase()
                 .indexOf(term.toLowerCase()) > -1
           )
       ).slice(0, 10)
     )
   );
 };

  guardar() {
    if (this.estado) {
      this.emp.estado_activo = 1;
    } else {
      this.emp.estado_activo = 0;
    }
    this.emp.cod_puesto= this.model.cod_puesto;
    this.service.editar(this.emp).subscribe(items => {
      this.router.navigate(["/empleado"]);
    });
  }

  cargar(id: number) {
    this.service.findbyId(id).subscribe(items => {
      this.emp = items;
      if (this.emp.estado_activo == 1) {
        this.estado = true;
      } else {
        this.estado = false;
      }
      this.p.findbyId(this.emp.cod_puesto).subscribe(items => {
        this.model = items;
      });
    });
  }
}
