import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../auth/token.storage.service";
import {Observable} from "rxjs";
import {CourseDTO} from "../model/courseDTO";

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    private userUrl = 'http://localhost:8080/course';

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    }

    getById(id: String): Observable<CourseDTO> {
        return this.http.get<CourseDTO>(this.userUrl + "/" + id, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }

    getAll(): Observable<Array<CourseDTO>> {
        return this.http.get<Array<CourseDTO>>(this.userUrl, {
            headers: {'Authorization': this.tokenStorageService.getToken()}
        });
    }
}
