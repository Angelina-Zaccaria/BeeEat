import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private afs: AngularFirestore, private router: Router) { }


  async submit(collection: 'quiz' | 'survey', data: any) {
    let editKey = this.afs.createId();
    await this.afs.collection<any>(collection).doc(editKey).set(data);
    this.router.navigate(['/success', editKey])


    return editKey;
  }


  deleteCollection(collection, editKey) {
    this.afs.collection(`${collection}/${editKey}/answers`).get().subscribe(result => {
      result.docs.forEach(doc => {
        this.afs.doc(`${collection}/${editKey}/answers/${doc.id}`).delete();
      })
    });

  }

  async update(collection: 'quiz' | 'survey', data: any, editKey: string) {
    console.log(editKey)
    editKey = editKey.replace(' ', '');
    await this.afs.doc(`${collection}/${editKey}`).set(data);
    if(collection == 'survey'){
      await this.afs.doc(`${collection}/${editKey}`).update({
        count: 0
      });
    }
    this.deleteCollection(collection, editKey)
    this.router.navigate(['/success', editKey])

    return editKey;
  }
}
