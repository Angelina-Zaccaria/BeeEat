import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';

interface Question {
  type: string;
}

 @Component({
  selector: 'app-make-survey',
  templateUrl: './make-survey.component.html',
  styleUrls: ['./make-survey.component.scss']
})
export class MakeSurveyComponent implements OnInit {

  // questions: Question[] = [];
  surveyForm: FormGroup;
  questionTypes: string[] = [];
  isPreviewing: boolean = false;
  data: any;

  

  constructor(private fb: FormBuilder, private db: DbService) { 

  }

  // why are our functions outside the ngOnInit??
  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      //questions is a form array
      questions: this.fb.array([])
    })
    this.surveyForm.valueChanges.subscribe(data => this.data = data)
  }

  get questionForms() {
    return this.surveyForm.get('questions') as FormArray
  }

  addMultipleChoice() {
    // this.questions.push({ type: "Multiple Choice" });
    const multipleChoice = this.fb.group({
      question: ['', Validators.required],
      optionOne: ['', Validators.required],
      optionTwo: ['', Validators.required],
      optionThree: ['', Validators.required],
      optionFour: ['', Validators.required]
    })

    this.questionTypes.push('Multiple Choice')
    this.questionForms.push(multipleChoice)
  }

  addTrueFalse() {
    // this.questions.push({ type: "True/False" });
    const trueFalse = this.fb.group({
      question: ['', Validators.required]
    })
    this.questionTypes.push('True/False')
    this.questionForms.push(trueFalse)
  }

  
  addShortAnswer() {
    const shortAnswer = this.fb.group({
      question: ['', Validators.required]
    })
    this.questionTypes.push('Short Answer')
    this.questionForms.push(shortAnswer)
    // this.questions.push({ type: "Short Answer" });
  }

  addEssay() {
    const essay = this.fb.group({
      question: ['', Validators.required]
    })
    this.questionTypes.push('Essay')
    this.questionForms.push(essay)
    // this.questions.push({ type: "Short Answer" });
  }

  deleteQuestion(i){
    this.questionForms.removeAt(i)
    this.questionTypes.splice(i, 1)
  }

  submit() {
    // TODO
    const value = this.surveyForm.value
    value.questions.map((val, index, array) => {
      val['type'] = this.questionTypes[index]
    })
    console.log(value)
    this.db.submit('survey', value)
  }

  togglePreview() {
    this.isPreviewing = !this.isPreviewing;
  }

}
