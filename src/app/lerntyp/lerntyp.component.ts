import { Component } from '@angular/core';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lerntyp',
  templateUrl: './lerntyp.component.html',
  styleUrl: './lerntyp.component.css',
})
export class LerntypComponent {
  question?: Question = {
    current_question: 0,
    auditiv: 0,
    bild: 0,
    lesen: 0,
    motorisch: 0,
    frage: '',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
  };
  selection: string | null = null;
  scores?: { auditiv: number; bild: number; lesen: number; motorisch: number };
  scoresTotal?: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(
        `http://localhost:5000/lerntypanalyse?current_question=${this.question?.current_question}&auditiv=${this.question?.auditiv}&bild=${this.question?.bild}&lesen=${this.question?.lesen}&motorisch=${this.question?.motorisch}`
      )
      .subscribe((value) => (this.question = value as Question));
  }

  next(event: Event) {
    this.question!.current_question += 1;
    this.http
      .post(
        `http://localhost:5000/lerntypanalyse?current_question=${this.question?.current_question}&auditiv=${this.question?.auditiv}&bild=${this.question?.bild}&lesen=${this.question?.lesen}&motorisch=${this.question?.motorisch}&button_value=${this.selection}`,
        {}
      )
      .subscribe((value: any) => {
        if (value['scores']) {
          this.scores = value['scores'];
          this.scoresTotal =
            this.scores!.auditiv +
            this.scores!.bild +
            this.scores!.lesen +
            this.scores!.motorisch;
        } else {
          this.question = value as Question;
          event.preventDefault();
          this.selection = null;
          this.selection = null;
        }
      });
  }

  round = Math.round;
}
