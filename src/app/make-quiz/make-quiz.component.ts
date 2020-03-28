import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

interface Question {
  type: string;
}

@Component({
  selector: 'app-make-quiz',
  templateUrl: './make-quiz.component.html',
  styleUrls: ['./make-quiz.component.scss']
})
export class MakeQuizComponent implements OnInit {

  // questions: Question[] = [];
  quizForm: FormGroup;
  questionTypes: string[] = [];


  // why has nothing been done to the constructor

  constructor(private fb: FormBuilder) { 

  }

  // why are our functions outside the ngOnInit??
  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: '',
      description:'',
      //questions is a f
      questions: this.fb.array([])
    })
    this.quizForm.valueChanges.subscribe(console.log)
  }

  get questionForms() {
    return this.quizForm.get('questions') as FormArray
  }

  addMultipleChoice() {
    // TODO: create multiple choice form group
    // TODO: push form group to main quiz group field

    // this.questions.push({ type: "Multiple Choice" });
    const multipleChoice = this.fb.group({
      question: '',
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
      answer: '',
      value: ''
    })

    this.questionTypes.push('Multiple Choice')
    this.questionForms.push(multipleChoice)
  }

  addTrueFalse() {
    // TODO: create true/false form group ng 
    // TODO: push form group to main quiz group field
    // this.questions.push({ type: "True/False" });
    const trueFalse = this.fb.group({
      question: '',
      // may want to change to boolean, may affect form validation (all filled out)
      answer: 'false',
      value: ''
    })
    this.questionTypes.push('True/False')
    this.questionForms.push(trueFalse)
  }

  
  addShortAnswer() {
    // TODO: create short answer form group 
    // TODO: push form group to main quiz group field
    const shortAnswer = this.fb.group({
      question: '',
      answer: '',
      value: ''
    })
    this.questionTypes.push('Short Answer')
    this.questionForms.push(shortAnswer)
    // this.questions.push({ type: "Short Answer" });
  }

  addEssay() {
    // TODO: create short answer form group 
    // TODO: push form group to main quiz group field
    const essay = this.fb.group({
      question: '',
      answer: '',
      value: ''
    })
    this.questionTypes.push('Essay')
    this.questionForms.push(essay)
    // this.questions.push({ type: "Short Answer" });
  }

  //circle back to delete questions
  deleteQuestion(i){
    this.questionForms.removeAt(i)
  }

  submit() {
    // TODO
  }

}
