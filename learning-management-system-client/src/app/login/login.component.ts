import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from "../../auth/auth.login.info";
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token.storage.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form = {
        username: '',
        password: ''
    };
    private loginInfo: AuthLoginInfo;
    private isLoggedIn = false;
    private isLoginFailed = false;

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        if (this.tokenStorage.getToken() != null) {
            this.router.navigateByUrl("/dashboard")
        }

        if (this.isSignedUp()) {
            this.showNotification(2, "Account successfully registered");
        }

        if (this.isAccountDeleted()) {
            this.showNotification(2, "Account successfully deleted");
        }

        if (this.isAccountUpdated()) {
            this.showNotification(2, "Account successfully updated");
        }
    }

    onSubmit() {
        console.log(this.form);

        this.loginInfo = new AuthLoginInfo(
            this.form.username,
            this.form.password);


        this.authService.attemptAuth(this.loginInfo).subscribe(
            data => {
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.authorities);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                console.log(data.token);
                this.router.navigateByUrl("/user-profile")
            },
            error => {
                this.showNotification(4, "Bad credentials");
                console.log(error);
                this.isLoginFailed = true;
            }
        );
    }

    isSignedUp() {
        let signedUp = this.route.snapshot.queryParamMap.get('signedUp');
        return signedUp != null && signedUp == 'true';
    }

    isAccountDeleted() {
        let signedUp = this.route.snapshot.queryParamMap.get('deleted');
        return signedUp != null && signedUp == 'true';
    }

    isAccountUpdated() {
        let signedUp = this.route.snapshot.queryParamMap.get('updated');
        return signedUp != null && signedUp == 'true';
    }

    showNotification(color : number, message : string){
        const type = ['','info','success','warning','danger'];

        $.notify({
            icon: "notifications",
            message: message

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: "top",
                align: "center"
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" isAdmin="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" isAdmin="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }

}
