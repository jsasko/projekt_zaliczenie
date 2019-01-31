import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../auth/token.storage.service";
import {UserDTO} from "../model/userDTO";
import {UserUpdateDTO} from "../model/userUpdateDTO";
import {UserManageDTO} from "../model/userManageDTO";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userUrl = 'http://localhost:8080/user';

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    }

    getUserData(username: string): Observable<UserManageDTO> {
        return this.http.get<UserManageDTO>(this.userUrl + "/" + username, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }

    getUserManageData(id: String): Observable<UserManageDTO> {
        return this.http.get<UserManageDTO>(this.userUrl + "/manage/" + id, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }

    postUserManageData(userManageObject : UserManageDTO): Observable<UserManageDTO> {
        return this.http.post<UserManageDTO>(this.userUrl + "/" + userManageObject.id, userManageObject, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }

    postUserData(userRequest: UserUpdateDTO): Observable<UserManageDTO> {
        return this.http.post<UserManageDTO>(this.userUrl + "/" + userRequest.id, userRequest, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }

    deleteUser(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.userUrl + "/" + id, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }

    getAll(): Observable<Array<UserManageDTO>> {
        return this.http.get<Array<UserManageDTO>>(this.userUrl, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }
}
