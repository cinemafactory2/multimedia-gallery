import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultimediaListComponent } from './components/multimedia-list/multimedia-list.component';
import { MultimediaAddComponent } from './components/multimedia-add/multimedia-add.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: MultimediaListComponent
  },
  {
    path: 'addMultimedia',
    canActivate: [AuthenticationGuard],
    component: MultimediaAddComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
