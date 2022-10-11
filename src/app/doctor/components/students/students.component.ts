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
  this.getStudents()
  }

getStudents(){
  this.service.getUsers('students').subscribe((res:any)=>{

   this.dataSource= res?.map((student:any)=>{
    //if عشان لو الطالب لسه ممتحنش
    if(student?.subjects){
      return student?.subjects?.map((sub:any)=>{
        return {
          name:student.username,
          subjectName:sub.name,
          degree:sub.degree
        }
       })
    }else {
      return [{
        name:student.username,
        subjectName:"-",
        degree:"-"
      }]
    }

   })
   this.datatable=[];
   this.dataSource.forEach((item:any) => {
    item.forEach((subIt:any)=>{
      this.datatable.push({
        name:subIt.name,
        subjectName:subIt.subjectName,
        degree:subIt.degree
      }

      )
    })

   });
   console.log(this.datatable)
  })
}

}
