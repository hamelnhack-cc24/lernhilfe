import { Component } from '@angular/core';
import { Config } from '../config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  config = Config;
}
