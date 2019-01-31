import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {JwtResponse} from './jwt.response';
import {AuthLoginInfo} from './auth.login.info';
import {SignUpInfo} from './sign.up.info';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loginUrl = 'http://localhost:8080/api/auth/signin';
    private signUrl = 'http://localhost:8080/api/auth/signup';

    constructor(public http: HttpClient) {
    }

    attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
    }

    signUp(info: SignUpInfo): Observable<string> {
        return this.http.post<string>(this.signUrl, info, httpOptions);
    }
}
