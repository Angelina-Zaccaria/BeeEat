import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, } from 'rxjs/internal/Observable';
import { QuestionsComponent } from '../questions/questions.component';
// class Quiz {
//   constructor(public title) { }
// }

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {

  userInput: FormGroup;
  public quizList$: Observable<any[]>;
  selected: any;
  submitClicked: boolean = false;
  totalWorth = 0;
  pointsScored = 0;
  totalScore = 0;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore) {
    this.quizList$ = this.afs.collection('/quiz').valueChanges({ idField: 'id' });
  }


  ngOnInit(): void {
  }

  // select(quiz) {
  //   this.selected = quiz;
  // }

  select(quiz) {
    let groupData = {}
    for (let i = 0; i < quiz.questions.length; i++) {
      // groupData[`${i}`] = ['', Validators.required];
      groupData[`${i}`] = '';
    }
    this.userInput = this.fb.group(groupData);
    this.userInput.valueChanges.subscribe(console.log);
    this.selected = quiz; 
    console.log(groupData);
  }

  clear() {
    this.selected = null;
  }

  submit() {
    const response = this.userInput.value;
    this.afs.doc(`quiz/${this.selected.id}`).collection('answers').add(response).then(() => {
      // TODO: navigate to new page
    })
    this.submitClicked = !this.submitClicked;
    this.checkAnswers();
  }

  checkAnswers(){

    for(var i = 0; i < this.selected.questions.length; i++){
        this.totalWorth += Number(this.selected.questions[i].value);
        console.log(this.selected.questions[i].answer);
        console.log(this.userInput.value[`${i}`]);
        if(this.selected.questions[i].answer === this.userInput.value[`${i}`]){
          this.pointsScored += Number(this.selected.questions[i].value);
        }
    }
    this.totalScore = this.pointsScored/this.totalWorth*100;
  }


}
