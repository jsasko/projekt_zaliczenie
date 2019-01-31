import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {CourseDTO} from "../../model/courseDTO";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

    course: CourseDTO;

    levels = [
        "NOVICE",
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED",
        "PROFESSIONAL"
    ];

    constructor(private courseService: CourseService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        let id = this.route.snapshot.queryParamMap.get('id');
        this.courseService.getById(id).subscribe(value => {
            this.course = value;
        })
    }

}
