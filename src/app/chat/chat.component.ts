import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  output = '';
  input = '';

  constructor(private http: HttpClient) {}

  ask() {
    // this.http
    //   .post('http://localhost:11434/api/generate', {
    //     model: 'llama3.2',
    //     prompt: 'Why is the sky blue?',
    //     stream: false,
    //   })
    //   .forEach(console.log);
    this.output = '';
    this.http
      .post(
        'http://localhost:11434/api/generate',
        {
          model: 'llama3.2',
          prompt: this.input,
          stream: true,
        },
        { observe: 'events', responseType: 'text', reportProgress: true }
      )
      .subscribe((next) => {
        const t = (next as any)['partialText'];
        if (!t) return;
        const arr = t.split('}\n');
        const current = arr[arr.length - 2] + '}';
        console.log(current);
        this.output += JSON.parse(current)['response'];
      });
  }
}
