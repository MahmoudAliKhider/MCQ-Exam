import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjects:any[]=[]
  constructor(private service:DoctorService , private auth:AuthService , private toaster:ToastrService) { }

  ngOnInit(): void {
  this.getSubject();
  }
  getSubject(){
    this.service.getAllSubject().subscribe((res:any)=>{
      this.subjects = res;
    })
  }


}
