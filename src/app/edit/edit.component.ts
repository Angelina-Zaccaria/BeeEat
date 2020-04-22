import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']

})

export class EditComponent implements OnInit {

  EditId: FormGroup;
  data: any;
  type: string;
  docId: string;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.EditId = this.fb.group({
      id: ['', Validators.required]
    });
  }


  checkID() {
    this.docId = this.EditId.value.id;

    this.afs.doc(`quiz/${this.docId.trim()}`).valueChanges().subscribe(quiz => {
      console.log(quiz);
      if (quiz) {
        this.type = 'quiz';
        this.data = quiz;
      } else {
        this.afs.doc(`survey/${this.docId.trim()}`).valueChanges().subscribe(survey => {
          console.log(survey)
          this.type = 'survey';
          this.data = survey;
        });
      }
    });
    
  }
}
