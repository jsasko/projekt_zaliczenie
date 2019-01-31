import {Component, OnInit} from '@angular/core';
import {SignUpInfo} from "../../auth/sign.up.info";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

declare var $: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form = {
        username: '',
        password: '',
        repeatedPassword: '',
        email: ''
    };

    signupInfo: SignUpInfo;
    isSignedUp = false;
    isSignUpFailed = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.isFormValid()) {

            this.signupInfo = new SignUpInfo(
                this.form.username,
                this.form.email,
                this.form.password);

            this.authService.signUp(this.signupInfo).subscribe(
                data => {
                    console.log(data);
                    this.isSignedUp = true;
                    this.isSignUpFailed = false;
                    this.router.navigate([''], {queryParams: {'signedUp': "true"}});
                },
                error => {
                    console.log(error);
                    this.isSignUpFailed = true;
                    this.showNotification(4, "Something went wrong");
                }
            );
        } else {
            this.isSignUpFailed = true;
        }
    }

    isRepeatedPasswordValid() {
        let validate = this.form.password == this.form.repeatedPassword;
        if (!validate) {
            this.showNotification(4, "Passwords must match")
        }
        return validate;
    }

    isEmailValid() {
        let validate = this.form.email.includes('@') || this.form.email == '';
        if (!validate) {
            this.showNotification(4, "Email is not valid")
        }
        return validate;
    }

    isLoginValid() {
        let validate = this.form.username == '' || this.form.username.length > 4;
        if (!validate) {
            this.showNotification(4, "Username is not valid")
        }
        return validate;
    }

    isAnyFieldEmpty() {
        let validate = this.form.password == '' || this.form.repeatedPassword === '' || this.form.email == '' || this.form.username == '';
        if (!validate) {
            this.showNotification(4, "All fields are required")
        }
        return validate;
    }

    isFormValid() {
        return this.isRepeatedPasswordValid() && this.isEmailValid() && this.isLoginValid() && !this.isAnyFieldEmpty();
    }

    showNotification(color: number, message: string) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        $.notify({
            icon: "notifications",
            message: message

        }, {
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
