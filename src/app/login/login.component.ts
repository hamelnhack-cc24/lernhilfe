import { Component } from '@angular/core';
import { Config } from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  config = Config;
}
