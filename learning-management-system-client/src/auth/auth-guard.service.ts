import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {TokenStorageService} from "./token.storage.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public tokenStorageSevice : TokenStorageService, public router: Router) {}

    canActivate(): boolean {
        if (this.tokenStorageSevice.getToken() == null) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}
