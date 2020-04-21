import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { APP_BASE_HREF } from '@angular/common';
import { UserInfo} from '../models/userinfo';
import { APPCONFIG } from '../constantes.module';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${APP_BASE_HREF}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${APP_BASE_HREF}/users/${id}`);
    }

    getxEmail(email: string){
        return this.http.get<User>(`${APP_BASE_HREF}/users/${email}`);
    }

    crear(item: UserInfo): Observable<UserInfo> {
        return this.http.post<UserInfo>(APPCONFIG.BASE_URL+"/account/crearusuario",item);
    }
}