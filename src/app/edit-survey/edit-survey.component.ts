import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {

  @Input() data: any;
  @Input() id: string;
  editSurveyForm: FormGroup;
  questionTypes: string[] = []
  title: string
  isPreviewing: boolean = false;

  constructor(private fb: FormBuilder, private db: DbService) {
   }

  ngOnInit(): void {
    this.editSurveyForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: this.data.description,
      questions: this.fb.array([])
    })
    this.addQuestions()
    this.editSurveyForm.valueChanges.subscribe(data => this.data = data)
  }

  get questionForms() {
    return this.editSurveyForm.get('questions') as FormArray
  }

  addQuestions() {
    for(var i = 0; i < this.data.questions.length; i++){
      if(this.data.questions[i].type == 'Multiple Choice'){
        const multipleChoice = this.fb.group({
          question: [this.data.questions[i].question, Validators.required],
          optionOne: [this.data.questions[i].optionOne, Validators.required],
          optionTwo: [this.data.questions[i].optionTwo, Validators.required],
          optionThree: [this.data.questions[i].optionThree, Validators.required],
          optionFour: [this.data.questions[i].optionFour, Validators.required]
        })
        this.questionTypes.push('Multiple Choice')
        this.questionForms.push(multipleChoice)
      }
      else if(this.data.questions[i].type == 'True/False'){
        const trueFalse = this.fb.group({
          question: [this.data.questions[i].question, Validators.required]
        })
        this.questionTypes.push('True/False')
        this.questionForms.push(trueFalse)
      }
      else if(this.data.questions[i].type == 'Short Answer'){
        const shortAnswer = this.fb.group({
          question: [this.data.questions[i].question, Validators.required]
        })
        this.questionTypes.push('Short Answer')
        this.questionForms.push(shortAnswer)
      }
      else if(this.data.questions[i].type == 'Essay'){
        const essay = this.fb.group({
          question: [this.data.questions[i].question, Validators.required]
        })
        this.questionTypes.push('Essay')
        this.questionForms.push(essay)
      }
    }
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
    const value = this.editSurveyForm.value
    value.questions.map((val, index, array) => {
      val['type'] = this.questionTypes[index]
    })
    console.log(value)
    this.db.update('survey', value, this.id)
  }

  togglePreview() {
    this.isPreviewing = !this.isPreviewing;
  }

}
