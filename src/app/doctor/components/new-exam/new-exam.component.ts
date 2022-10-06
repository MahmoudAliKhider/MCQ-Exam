import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

name=new FormControl("")
QuestionForm!:FormGroup
question:any[]=[]
correctNum:any
startAdd:boolean=false;
previw:boolean=false
subjectName=""
  constructor(private fb:FormBuilder , private toaster:ToastrService , private service:DoctorService) { }

  ngOnInit(): void {
  this.creatForm()
  }

creatForm(){
  this.QuestionForm = this.fb.group({
    question:['' , [Validators.required]],
    answer1:['' , [Validators.required]],
    answer2:['' , [Validators.required]],
    answer3:['' , [Validators.required]],
    answer4:['' , [Validators.required]],

  })
}

start(){
if(this.name.value == ""){
 this.toaster.error("يرجى ادخال اسم المادة")
}else{
  this.startAdd = true
  this.subjectName = this.name.value;
}
}

createQuestion(){
  //لازم يختار اجابة صح في تكوين الفورم
if(this.correctNum){
  const model ={
    question : this.QuestionForm.value.question,
    answer1 : this.QuestionForm.value.answer1,
    answer2 : this.QuestionForm.value.answer2,
    answer3 : this.QuestionForm.value.answer3,
    answer4 : this.QuestionForm.value.answer4,
    correctAnswer:this.QuestionForm.value[this.correctNum],//.valur[]=>لانو متغير
  }
  this.question.push(model);
  //بقولو فضيلي الفورم
  this.QuestionForm.reset();
}else{
  this.toaster.error("اضف اجابة صحيحة" , "" , {
    disableTimeOut: false,
    titleClass: "toastr_title",
    messageClass: "toastr_message",
    timeOut:5000,
    closeButton: true,
})
}
console.log(this.question)
}
//الي هيحصلوا تغيير خزنو عندي

getCorrect(event:any){
  this.correctNum = event.value
//console.log(event.value)
}
clearForm(){
  this.QuestionForm.reset()
}

cancle(){
  this.QuestionForm.reset()
  this.question = [];
  this.subjectName = "";
  this.name.reset();

  this.startAdd = false
}

submit(){
const model={
  name:this.subjectName,
  question:this.question
}
this.service.creatsubject(model).subscribe(res=>{
  this.previw=true;
})
}
}
