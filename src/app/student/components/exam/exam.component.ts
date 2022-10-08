import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

id:any;
subject:any
  constructor(private route:ActivatedRoute , private service:DoctorService ,private auth :AuthService,
     private toaster:ToastrService) {
  this.id = route.snapshot.paramMap.get('id');
  this.getSubjects()
  console.log(this.id)
   }


  ngOnInit(): void {
  }

  getSubjects(){
    this.service.getSubject(this.id).subscribe(res=>{
      this.subject=res
    })
  }

}
