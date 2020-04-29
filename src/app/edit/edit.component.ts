import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

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

    forkJoin([
      this.afs.doc(`quiz/${this.docId.trim()}`).valueChanges().pipe(take(1)),
      this.afs.doc(`survey/${this.docId.trim()}`).valueChanges().pipe(take(1))
    ]).subscribe(([quiz, survey]) => {
      if (quiz) {
        this.type = 'quiz';
        this.data = quiz;
      } else if (survey) {
        this.type = 'survey';
        this.data = survey;
      } else {
        this.type = 'not_found';
      }
    })      
  }
}
