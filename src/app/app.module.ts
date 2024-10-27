import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatRadioButton } from '@angular/material/radio';
import { ChatComponent } from './chat/chat.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TestSimulationComponent } from './test-simulation/test-simulation.component';
import { LerntypComponent } from './lerntyp/lerntyp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WissenszentraleComponent } from './wissenszentrale/wissenszentrale.component';
import { AltklausurenComponent } from './altklausuren/altklausuren.component';
import { VersicherungsprodukteComponent } from './versicherungsprodukte/versicherungsprodukte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ChatComponent,
    TestSimulationComponent,
    LerntypComponent,
    DashboardComponent,
    WissenszentraleComponent,
    AltklausurenComponent,
    VersicherungsprodukteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioButton,
    MatProgressBarModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
