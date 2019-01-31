import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {AuthGuardService} from "../../../auth/auth-guard.service";
import {UserListComponent} from "../../user-list/user-list.component";
import {UserManageComponent} from "../../user-manage/user-manage.component";
import {CourseListComponent} from "../../course-list/course-list.component";
import {CourseComponent} from "../../course/course.component";

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
    {path: 'table-list', component: TableListComponent, canActivate: [AuthGuardService]},
    {path: 'user-list', component: UserListComponent , canActivate: [AuthGuardService]},
    {path: 'typography', component: TypographyComponent, canActivate: [AuthGuardService]},
    {path: 'icons', component: IconsComponent, canActivate: [AuthGuardService]},
    {path: 'maps', component: MapsComponent, canActivate: [AuthGuardService]},
    {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService]},
    {path: 'upgrade', component: UpgradeComponent, canActivate: [AuthGuardService]},
    {path: 'user-manage', component: UserManageComponent, canActivate: [AuthGuardService]},
    {path: 'course-list', component: CourseListComponent , canActivate: [AuthGuardService]},
    {path: 'course', component: CourseComponent , canActivate: [AuthGuardService]},
];

