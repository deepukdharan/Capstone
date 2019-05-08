import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTaskComponent} from './add-task/add-task.component';
import { ViewTaskComponent} from './view-task/view-task.component';


const routes: Routes = [
 {path: 'addTask', component:AddTaskComponent},
 {path: 'viewTask', component: ViewTaskComponent},
 {path: 'editTask/:editedTask_id', component:AddTaskComponent},
 {path: 'editTask', component:AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
