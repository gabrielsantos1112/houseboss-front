import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

interface UserRegisterPayload {
    nome: string;
    email: string;
    senha: string;
}

interface UserRegisterResponse {
    id: number
    nome: string;
    email: string;
}

export interface UserLoginPayload {
    email: string;
    senha: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
    providedIn: 'root'
})

export class User {
    private apiUrl = 'http://localhost:8080'

    constructor(private http: HttpClient) {}

    register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
        return this.http.post<UserRegisterResponse>(`${this.apiUrl}/v1/auth/register`, body)
    }

    login(body: UserLoginPayload): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/v1/auth/login`, body)
    }
}
