import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserUpdateDTO} from "../../model/userUpdateDTO";
import {TokenStorageService} from "../../auth/token.storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    form = {
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        repeatedPassword: ''
    };

    id;

    constructor(private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router) {
    }

    ngOnInit() {
        this.userService.getUserData(this.tokenStorageService.getUsername()).subscribe(value => {
            this.form.username = value.username;
            this.form.email = value.email;
            this.id = value.id;
        });
    }

    onSubmit() {
        let userRequest = new UserUpdateDTO();
        userRequest.id = this.id;
        userRequest.username = this.form.username;
        userRequest.email = this.form.email;
        userRequest.oldPassword = this.form.oldPassword;
        userRequest.newPassword = this.form.newPassword;
        this.userService.postUserData(userRequest).subscribe(value => {
            this.tokenStorageService.signOut();
            this.router.navigate([""], {queryParams: {'updated': "true"}});
        });

    }

    onDelete() {
        this.userService.deleteUser(this.id).subscribe(value => {
            this.tokenStorageService.signOut();
            this.router.navigate([""], {queryParams: {'deleted': "true"}});
        });
    }

}
