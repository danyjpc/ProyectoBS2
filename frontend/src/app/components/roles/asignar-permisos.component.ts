import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { EmpleadoService } from "src/app/services/empleado.service";
import { Persona } from "src/app/models/persona";
import { isNgTemplate } from "@angular/compiler";
import { Roles } from "src/app/models/roles";
import { RoleService } from "src/app/services/roles.service";
import { PermisosService } from "src/app/services/permisos.service";
import { Permiso } from "src/app/models/permisos";
import { NombrePermisos } from "src/app/models/nombre_permisos";
import { PermisosRol } from "src/app/models/permiso_rol";

@Component({
  selector: "asignar-permisos",
  templateUrl: "asignar-permisos.component.html"
})
export class AsignarPermisosComponent implements OnInit {
  //Aca va la declaracion de variables
  public perms: Permiso[];
  public nombre_permiso: NombrePermisos = new NombrePermisos();
  public permiso_rol: PermisosRol = new PermisosRol();
  public rol: Roles = new Roles();
  public estado: boolean;
  constructor(
    private router: Router,
    private service: PermisosService,
    private r: RoleService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => this.cargar(params.id));
  }

  guardar() {
    this.permiso_rol = new PermisosRol();
      this.permiso_rol.cod_rol = this.rol.id;
      if(this.nombre_permiso.admin_roles == true){
        this.permiso_rol.cod_permisos.push(1);
      }
      if(this.nombre_permiso.admin_empleados == true){
        this.permiso_rol.cod_permisos.push(2);
      }
      if(this.nombre_permiso.admin_categorias){
        this.permiso_rol.cod_permisos.push(3);
      }
      if(this.nombre_permiso.admin_clientes){
        this.permiso_rol.cod_permisos.push(4);
      }
      if(this.nombre_permiso.admin_dimensiones){
        this.permiso_rol.cod_permisos.push(5);
      }
      if(this.nombre_permiso.admin_facturas){
        this.permiso_rol.cod_permisos.push(6);
      }
      if(this.nombre_permiso.admin_productos){
        this.permiso_rol.cod_permisos.push(7);
      }
      if(this.nombre_permiso.admin_proveedores){
        this.permiso_rol.cod_permisos.push(8);
      }
      if(this.nombre_permiso.admin_puestos){
        this.permiso_rol.cod_permisos.push(9);
      }
      if(this.nombre_permiso.admin_unidad_medida){
        this.permiso_rol.cod_permisos.push(10);
      }
      if(this.nombre_permiso.asignar_credenciales){
        this.permiso_rol.cod_permisos.push(11);
      }
      if(this.nombre_permiso.admin_kardex){
        this.permiso_rol.cod_permisos.push(12);
      }
      this.service.permisosARol(this.permiso_rol).subscribe(
        items=>{
          this.router.navigate(['/roles'])
        }
      );
  }

  cargar(id: number) {
      //Verifico que no sea el rol super
    if (id > 1) {
      this.r.findbyId(id).subscribe(items => {
        this.rol = items;
      });

      this.service.permisosRol(id).subscribe(items => {
        this.perms = items;
        for (var x = 0; x < this.perms.length; x++) {
          if (this.perms[x].cod_permiso == 1) {
            this.nombre_permiso.admin_roles = true;
          }
          if (this.perms[x].cod_permiso == 2) {
            this.nombre_permiso.admin_empleados = true;
          }
          if (this.perms[x].cod_permiso == 3) {
            this.nombre_permiso.admin_categorias = true;
          }
          if (this.perms[x].cod_permiso == 4) {
            this.nombre_permiso.admin_clientes = true;
          }
          if (this.perms[x].cod_permiso == 5) {
            this.nombre_permiso.admin_dimensiones = true;
          }
          if (this.perms[x].cod_permiso == 6) {
            this.nombre_permiso.admin_facturas = true;
          }
          if (this.perms[x].cod_permiso == 7) {
            this.nombre_permiso.admin_productos = true;
          }
          if (this.perms[x].cod_permiso == 8) {
            this.nombre_permiso.admin_proveedores = true;
          }
          if (this.perms[x].cod_permiso == 9) {
            this.nombre_permiso.admin_puestos = true;
          }
          if (this.perms[x].cod_permiso == 10) {
            this.nombre_permiso.admin_unidad_medida = true;
          }
          if (this.perms[x].cod_permiso == 11) {
            this.nombre_permiso.asignar_credenciales = true;
          }
          if (this.perms[x].cod_permiso == 12) {
            this.nombre_permiso.admin_kardex = true;
          }
        }
      });
    }else{
        //Si es el super asmin
        this.router.navigate(['/roles']);
    }
  }
}
