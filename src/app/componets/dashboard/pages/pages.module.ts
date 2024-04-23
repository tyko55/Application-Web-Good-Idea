import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main.component';
import { DepartementComponent } from './departement/departement.component';
import { PlantComponent } from './plant/plant.component';
import { IdeaComponent } from './idea/idea.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { FilterPipe } from '../../../filter.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import { IdeaOwnerComponent } from './idea-owner/idea-owner.component';
import { AllIdeasComponent } from './all-ideas/all-ideas.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MainDashboardComponent,
    DepartementComponent,
    PlantComponent,
    IdeaComponent,
    
    FilterPipe,
    IdeaOwnerComponent,
    AllIdeasComponent,
   

  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule, 
    PagesRoutingModule,
    MatTabsModule,MatDialogModule,ReactiveFormsModule ,  
  
  
  ],
})
export class PagesModule {}
