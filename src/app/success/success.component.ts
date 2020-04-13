import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  public id: string = ''

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.id = params.id)
   }

  ngOnInit(): void {
  }

}
