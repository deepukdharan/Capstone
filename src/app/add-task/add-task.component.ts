import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {taskDetailsModel} from '../../model/taskDetailsModel';
import {TaskManagerServiceService} from '../task-manager-service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  submitted = false;
  success = false;
  taskDetail : taskDetailsModel;
  parentTask: taskDetailsModel[];
  selectedParentTask : number;
  submitButtonText : string;
  defaultParentTask : taskDetailsModel;

  //editTask
  editedTask_id: number;
  taskName: string;
  parentTaskName: string;
  priority: number;
  startDate: Date;
  endDate: Date;
  //

  // frmatDate
  datetoConvert : Date;
  day : number;
  month : number;
  year : number;
  //
  constructor(private addTaskFormBuilder: FormBuilder,
     private data: TaskManagerServiceService,private _activeRoute:ActivatedRoute, private datePipe: DatePipe) {

   }

onSelect(obj)
{}

   getAllParentTask()
  {
    this.data.getAllParentTask().subscribe(data => {

      this.parentTask.push(this.defaultParentTask);

      data.forEach(element => {
        this.parentTask.push(element)
      });

      console.log(this.parentTask);
    })
  }

  onAddTask()
   {

        if(this.addTaskForm.invalid){
          this.submitted = true;
          alert("Please Enter the detail for all the required field");
          return;
        }
        //this.success = true;
        this.taskDetail = {
          Task_Id : this.submitButtonText == "Update" ? this.editedTask_id: 0,
          Parent_Id : this.selectedParentTask,
          Task : this.addTaskForm.get('task').value,
          End_Date : new Date(this.addTaskForm.get('endDate').value),
          Start_Date : new Date(this.addTaskForm.get('startDate').value),
          Parent_Task : '',
          Priority : this.addTaskForm.get('priority').value
        };

        if(this.editedTask_id != null)
        {
          this.data.updateTask(this.taskDetail).subscribe(data => {
            alert("Task Updated Successfully");
          });
          this.submitted = false;
        }
        else{
          this.data.addTask(this.taskDetail).subscribe(data => {
            alert("Task Added Successfully")
          });

          this.submitted = false;
        }


   }

   getDateformat(objdate)
   {
     this.datetoConvert = new Date(objdate);
     return this.datePipe.transform(this.datetoConvert,"yyyy-MM-dd");
   }

  ngOnInit() {

    this.defaultParentTask = {
      Task_Id : -1,
      Task : "",
      Parent_Id : -1,
      Parent_Task: "",
      Start_Date: new Date(),
      End_Date: new Date(),
      Priority: 0
    }

    this.parentTask = [];

    this.addTaskForm = this.addTaskFormBuilder.group({
      task_id:[''],
      task:['',[Validators.required, Validators.minLength(5)]],
      priority:['',[Validators.required]],
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]]
    });

    this.submitButtonText = "Add Task";

    this.getAllParentTask();
    this.selectedParentTask = this.defaultParentTask.Task_Id;
    this.editedTask_id = this._activeRoute.snapshot.params['editedTask_id'];
    if(this.editedTask_id!=null)
    {
      this.data.getAllTaskById(this.editedTask_id).subscribe(data => {
        if(data!= null)
        {
          this.addTaskForm.get('task_id').setValue(data[0].Task_Id);
          this.addTaskForm.controls['task'].setValue(data[0].Task);
          this.selectedParentTask = this.parentTask.filter(x=>x.Task_Id== +data[0].Parent_Id)[0].Task_Id;
          this.addTaskForm.get('priority').setValue(data[0].Priority);
          this.addTaskForm.get('startDate').setValue(this.getDateformat(data[0].Start_Date));
          this.addTaskForm.get('endDate').setValue(this.getDateformat(data[0].End_Date));
          this.addTaskForm.get('submitButton');
          this.submitButtonText = "Update";
        }
      });
    }
  }

}
