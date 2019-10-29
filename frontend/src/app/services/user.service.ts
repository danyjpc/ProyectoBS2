import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { APP_BASE_HREF } from '@angular/common';

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
}