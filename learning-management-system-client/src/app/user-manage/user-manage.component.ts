import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserManageDTO} from "../../model/userManageDTO";

declare var $: any;

@Component({
    selector: 'app-user-manage',
    templateUrl: './user-manage.component.html',
    styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

    userManage: UserManageDTO;

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
        this.userManage = new UserManageDTO();
    }

    ngOnInit() {
        let id = this.route.snapshot.queryParamMap.get('id');
        this.userService.getUserManageData(id).subscribe(value => {
            this.userManage.id = value.id;
            this.userManage.username = value.username;
            this.userManage.email = value.email;
            this.userManage.isAdmin = value.isAdmin;
            console.log(value);
        })
    }

    onSubmit() {
        this.userService.postUserManageData(this.userManage).subscribe(value => {
            this.showNotification(1, "Account was successfully updated")
        });
    }

    onDelete() {
        this.userService.deleteUser(this.userManage.id).subscribe(value => {
            this.showNotification(1, "Account was successfully deleted")
        });
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
