import { Component, OnInit } from '@angular/core';
import {UserDTO} from "../../model/userDTO";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users : Array<UserDTO>;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.userService.getAll().subscribe(value => {
      this.users = value;
    })
  }

  onUserClick(id : number) {
    this.router.navigate(["user-manage"], {queryParams: {'id': id}});
  }

}
