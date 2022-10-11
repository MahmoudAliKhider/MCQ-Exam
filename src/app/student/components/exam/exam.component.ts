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
user:any;
studentInfo:any;
total:number=0;
showResult:boolean=false;
userSubject:any[]=[]
validExam:boolean=true;
  constructor(private route:ActivatedRoute , private service:DoctorService ,private auth :AuthService,
     private toaster:ToastrService) {
  this.id = route.snapshot.paramMap.get('id');
  this.getSubjects()
  //console.log(this.id)
   }


  ngOnInit(): void {
    this.getUserInfo()
  }

  getSubjects(){
    this.service.getSubject(this.id).subscribe(res=>{
      this.subject=res
    })
  }

  delete(index:any){
     this.subject.question.splice(index,1)
     const model={
       name:this.subject.name,
      question:this.subject.question
     }
    this.service.updateSubject(model,this.id).subscribe(res=>{
      this.toaster.success("تم حذف السؤال بنجاح")
    })
    }

    getUserInfo(){
      this.auth.getRole().subscribe((res)=>{
        this.user=res;
        this.getUserData();
      })
    }

    getUserData(){
      this.auth.getStudent(this.user.userId).subscribe((res:any)=>{
        this.studentInfo=res;
         this.userSubject = res?.subjects ? res?.subjects : [];
         this.checkValidExam()
      })
    }

    checkValidExam(){
      for(let x in this.userSubject){
        if(this.userSubject[x].id == this.id){

          this.total = this.userSubject[x].degree
          this.validExam = false;
          this.toaster.warning('لقد اجتزت الاختبار مسبقا')
        }
      }
      //console.log(this.validExam)

    }

    getAnswer(event:any){
      let value = event.value,
       questionIndex = event.source.name;

       //اضيف اجابة جديدة لل Array Subject
       this.subject.question[questionIndex].studentAnswer =  value;
      console.log(this.subject.question)
    }


    getResult(){
      this.total=0;
      for(let x in this.subject.question){
        if(this.subject.question[x].studentAnswer == this.subject.question[x].correctAnswer){
         ++this.total
        }
      }
      this.showResult=true;
   this.userSubject.push({
    name:this.subject.name,
    id:this.id,
    degree:this.total
  })
      const model={
        username:this.studentInfo.username,
        email:this.studentInfo.email,
        password:this.studentInfo.password,
        subjects:this.userSubject
      }
      this.auth.updateStudent(this.user.userId,model).subscribe(res=>{
        this.toaster.success('تم تسجيل النتيجة بنجاح')
      })

    }
}
