import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  users:any[]= [];
  type:string = "students"
  constructor(private fb:FormBuilder ,private service:AuthService  , private router:Router , private toaster:ToastrService) { }

  ngOnInit(): void {
   this.userForm();
   this.getUsers();
  }

userForm(){
  this.loginForm = this.fb.group({
    email:['',Validators.required,Validators.email],
    password:['',Validators.required],
    type:[this.type]
  })
}

getUsers() {
  this.service.getUsers(this.type).subscribe((res:any) => {
    this.users = res
  })
}


getRole(event:any){
 this.type = event.value;
 this.getUsers();
}

login(){

  let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password== this.loginForm.value.password)

 if (index == -1){
  this.toaster.error("لايميل او كلمة المرور غير صحيحة " , "" , {
    disableTimeOut: false,
    titleClass: "toastr_title",
    messageClass: "toastr_message",
    timeOut:5000,
    closeButton: true,
  })
 }else{
  const model={
  role:this.type,
  username:this.users[index].username,
  userId:this.users[index].id,
  }
  this.service.login(model).subscribe(res => {
    this.service.user.next(res)
    this.toaster.success("تم تسجيل الدخول بنجاح" , "" , {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut:5000,
      closeButton: true,
    })
    this.router.navigate(['/subjects'])
  })
}
}


}
