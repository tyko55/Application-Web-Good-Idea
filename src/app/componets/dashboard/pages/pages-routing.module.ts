import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';
import { MainDashboardComponent } from './main-dashboard/main.component';
import { DepartementComponent } from './departement/departement.component';
import { PlantComponent } from './plant/plant.component';
import { IdeaComponent } from './idea/idea.component';
import { AreaModule } from './area/area.module';
import { AllIdeasComponent } from './all-ideas/all-ideas.component';
import { IdeaOwnerComponent } from './idea-owner/idea-owner.component';

const routes: Routes = [
  { path: '', component: MainDashboardComponent },
  { path: 'plant', component: PlantComponent },
  {
    path: 'area',
    loadChildren: () => AreaModule,
  },
  { path: 'idea', component: IdeaComponent },
  { path: 'allideas', component: AllIdeasComponent },
  { path: 'ideaowner', component: IdeaOwnerComponent },



  /* {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
    data: { role: ['Admin', 'Assistant'] },
  },
  {
    path: 'assistants',
    loadChildren: () =>
      import('./assistants/assistants.module').then((m) => m.AssistantsModule),
    canActivate: [AuthGuard],
    data: { role: ['Admin'] },
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
