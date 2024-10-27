import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-altklausuren',
  templateUrl: './altklausuren.component.html',
  styleUrl: './altklausuren.component.css'
})
export class AltklausurenComponent {
constructor(private http: HttpClient){}
ngOnInit() {
  this.http.post
}
}
