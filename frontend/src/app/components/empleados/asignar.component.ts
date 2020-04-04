import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
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
import { Roles } from "src/app/models/roles";
import { RoleService } from "src/app/services/roles.service";
import { Role } from "src/app/models/role";
import { UserInfo } from "src/app/models/userinfo";
import { UserRoles } from "src/app/models/user_role";

@Component({
  selector: "asignar-credenciales",
  templateUrl: "asignar.component.html"
})
export class AsignarCredencialesComponent implements OnInit {
  //Aca va la declaracion de variables
  public uss: number;
  public user_rol: UserRoles = new UserRoles();
  public user: UserInfo = new UserInfo();
  public id: UserInfo = new UserInfo();
  public estado: boolean;
  public listRoles: Roles[];
  public model: Roles = new Roles();
  constructor(
    private router: Router,
    private service: EmpleadoService,
    private p: RoleService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    //Cargo los roles
    this.p.findList().subscribe(items => {
      this.listRoles = items;
    });
    this.route.params.subscribe(params => this.cargar(params.id));
  }
  /**
   * Metodo para la busqueda en tiempo real
   * El formater formatea las entradas y las sugerencias
   * Para el puesto
   */
  formatter = (result: Roles) => result.name;

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
          ? this.listRoles
          : this.listRoles.filter(
              v => v.name.toLocaleLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  guardar() {
    if (this.user.password == this.user.password_confirmar) {
      this.estado = false;
      this.user.estado_activo = 1;
      this.user.cod_empleado = this.uss;

      //Guardo los datos del usuario
      this.service.crearuser(this.user).subscribe(items => {
        //Ya guardo el usuario
        //Una vez que se haya guardado el user obtengo su id
        this.p.idUser(this.uss).subscribe(items => {
          //obteniendo el id asigno los roles
          this.id = items;
          this.user_rol.cod_usuario = this.id.id;
          this.user_rol.cod_rol.push(this.model.id);
          console.log(this.user_rol);
          this.p.rolesUser(this.user_rol).subscribe(items => {
            this.router.navigate(["/empleado"]);
          });
        });
      });
    } else {
      this.estado = true;
    }
  }

  cargar(id: number) {
    this.uss = id;
  }
}
