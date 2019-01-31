import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {Router} from "@angular/router";
import {CourseDTO} from "../../model/courseDTO";

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

    courses : Array<CourseDTO>;

    constructor(private courseService: CourseService, private router: Router) {
    }

    ngOnInit() {
        this.courseService.getAll().subscribe(value => {
            this.courses = value;
        })
    }

    onCourseClick(id: number) {
        this.router.navigate(["course"], {queryParams: {'id': id}});
    }
}
