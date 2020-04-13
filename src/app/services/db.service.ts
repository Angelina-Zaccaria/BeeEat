import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private afs : AngularFirestore, private router: Router) { }


  async submit(collection: 'quiz' | 'survey', data: any) {
    let editKey = this.afs.createId()
    await this.afs.collection<any>(collection).doc(editKey).set(data);
    this.router.navigate(['/success', editKey])


    return editKey;
  }
}
