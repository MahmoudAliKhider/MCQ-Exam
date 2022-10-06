import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataSource:any
  datatable:any
  displayedColumns:any
  constructor(private service:AuthService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
   }


  ngOnInit(): void {

  }



}
