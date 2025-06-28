import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesTableComponent } from './components/course-table/courses-table.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'courses', component:CoursesTableComponent},
    {path:'admin', component:AdminComponent}
];
