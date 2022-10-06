import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  students:any[]= []
  constructor(private fb:FormBuilder ,private service:AuthService  , private router:Router , private toaster:ToastrService) { }
  ngOnInit(): void {

  }

 
}
