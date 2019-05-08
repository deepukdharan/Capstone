import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskManagerServiceService} from '../task-manager-service.service';
import {taskDetailsModel} from '../../model/taskDetailsModel';
import { Router,ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  viewTask: FormGroup;
  task: taskDetailsModel[];
  filteredTaskDetails: taskDetailsModel[];
  taskName: string;
  parentTaskName: string;
  priorityFrom: number;
  priorityTo: number;
  startDate: Date;
  endDate: Date;
  @Input() a: string;
  constructor(private data: TaskManagerServiceService, private _activeRoute:Router) { }

  ngOnInit() {
    this.getAllTask()
    this.filteredTaskDetails = this.task;
  }

  search()
  {
    if(this.task!=undefined)
    this.task=this.task.filter(i=>i.Task.toLowerCase().trim().includes(this.taskName.toLowerCase().trim()));
  }
  onClickEdit(taskId)
  {
    console.log("on edit");
    this._activeRoute.navigate(['editTask',taskId]);

  }

  onClickEndTask(taskId: number)
  {
    if(confirm("Do you want to end this task?"))
    {
      this.data.endTask(taskId).subscribe(data => {
        console.log(data);
        if(data == 101)
        {
          alert("This task cannot be ended as it is associated with other task. Please end the child task first");
        }
        else{
          alert("Task ended successfully");
        }
        this.getAllTask();

      })
    }
  }
  getAllTask()
  {
    this.data.getAllTask().subscribe(data => {
      this.task = data,
      this.filteredTaskDetails = this.task
    })
  }

  getFilteredData()
  {
      this.filteredTaskDetails = this.task;
      if(this.taskName == "" && this.parentTaskName == "" && this.priorityFrom == undefined && this.priorityTo ==undefined && this.startDate == undefined && this.endDate == undefined)
      {
        console.log("11");
        this.filteredTaskDetails = this.task;
      }
      else
      {
        if(this.taskName != "" && this.taskName != undefined)
        {
          this.filteredTaskDetails = this.task.filter(i=>i.Task.toLowerCase().trim().includes(this.taskName.toLowerCase().trim()));
        }
        if(this.parentTaskName !="" && this.parentTaskName != undefined)
        {
          this.filteredTaskDetails =  this.filteredTaskDetails.filter(x=>x.Parent_Task.toLowerCase().trim().includes(this.parentTaskName.toLowerCase().trim()));
        }
        if(this.priorityFrom  != undefined)
        {
          this.filteredTaskDetails =  this.filteredTaskDetails.filter(x=>x.Priority >= this.priorityFrom);
        }
        if(this.priorityTo != undefined)
        {
          this.filteredTaskDetails =  this.filteredTaskDetails.filter(x=>x.Priority <= this.priorityTo);
        }
        if(this.startDate != undefined)
        {
           this.filteredTaskDetails =  this.filteredTaskDetails.filter(x=>x.Start_Date.toString() == this.startDate.toString()+"T00:00:00");
        }
        if(this.endDate != undefined)
        {
           this.filteredTaskDetails =  this.filteredTaskDetails.filter(x=>x.End_Date.toString() == this.endDate.toString()+"T00:00:00");
        }

      }
  }

}
