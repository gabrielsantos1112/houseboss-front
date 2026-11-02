import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

interface UserRegisterPayload {
    nome: string;
    email: string;
    senha: string;
}

@Injectable({
    providedIn: 'root'
})

export class User {
    private apiUrl = 'http://localhost:8080'

    constructor(private http: HttpClient) {}

    register(body: UserRegisterPayload): Observable<any> {
        return this.http.post(`${this.apiUrl}/v1/auth/register`, body)
    }

}
