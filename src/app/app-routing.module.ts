import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { TestSimulationComponent } from './test-simulation/test-simulation.component';
import { LerntypComponent } from './lerntyp/lerntyp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WissenszentraleComponent } from './wissenszentrale/wissenszentrale.component';
import { AltklausurenComponent } from './altklausuren/altklausuren.component';
import { VersicherungsprodukteComponent } from './versicherungsprodukte/versicherungsprodukte.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'test-simulation', component: TestSimulationComponent },
  { path: 'lerntyp', component: LerntypComponent },
  { path: 'wissenszentrale', component: WissenszentraleComponent },
  { path: 'altklausuren', component: AltklausurenComponent },
  { path: 'versicherungsprodukte', component: VersicherungsprodukteComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
