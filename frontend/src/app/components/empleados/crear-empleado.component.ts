import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { EmpleadoService } from "src/app/services/empleado.service";
import { Persona } from "src/app/models/persona";
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
  selector: "crear-empleado",
  templateUrl: "crear-empleado.component.html",
})
export class CrearEmpleadoComponent implements OnInit {
  //Aca va la declaracion de variables
  public listEmpleado: Persona[];
  public emp: Persona = new Persona();
  public listPuestos: Puestos[];
  public model: Puestos = new Puestos();
  constructor(
    private router: Router,
    private service: EmpleadoService,
    private p: PuestosService
  ) {}

  ngOnInit() {
    this.p.findList().subscribe(items => {
      this.listPuestos = items;
    });
  } 
  /**
  * Metodo para la busqueda en tiempo real
  * El formater formatea las entradas y las sugerencias
  * Para el puesto
  */
 formatter3 = (result: Puestos) => result.nombre;

 @ViewChild("instance") instance: NgbTypeahead;
 focus$ = new Subject<string>();
 click$ = new Subject<string>();
 search3 = (text$: Observable<string>) => {
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
      this.emp.id_puesto=this.model.cod_puesto;
    this.emp.habilitado = true;
    this.service.guardar(this.emp).subscribe(items => {
      this.router.navigate(["/empleado"]);
    });
  }
}
