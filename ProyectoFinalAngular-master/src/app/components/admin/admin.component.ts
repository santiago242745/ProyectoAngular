import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CourseService, Course } from '../../services/course.service';
import { CourseFormComponent } from '../course-form/course-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  imports: [MatIconModule, MatTableModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  courses: Course[] = [];
  displayedColumns = ['name', 'description', 'level', 'duration', 'price', 'actions'];

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => this.courses = data
    });
  }

  openForm(course?: Course): void {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '400px',
      data: course ? { ...course } : null
    });

    dialogRef.afterClosed().subscribe((result: Course) => {
      if (result) {
        if (result.id) {
          this.courseService.updateCourse(result).subscribe(() => this.loadCourses());
        } else {
          this.courseService.createCourse(result).subscribe(() => this.loadCourses());
        }
      }
    });
  }

  deleteCourse(id: number): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe(() => this.loadCourses());
    }
  }
}

