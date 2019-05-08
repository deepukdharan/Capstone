import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {taskDetailsModel} from '././../model/taskDetailsModel';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerServiceService {
  private taskDetails : taskDetailsModel[];
  apiUrl:string = 'http://localhost/TaskManager.WebApi/api/';
  addTaskUrl : string;

  constructor(private http: HttpClient) { }

  getAllTask() : Observable<taskDetailsModel[]>
  {
    return this.http.get<taskDetailsModel[]>(this.apiUrl+'GetAllTaskDetails')
  }

  getAllTaskById(taskId: number) : Observable<taskDetailsModel>
  {
    return this.http.get<taskDetailsModel>(this.apiUrl+'GetTaskByID/'+taskId)
  }

  getAllParentTask() : Observable<taskDetailsModel[]>
  {
       return this.http.get<taskDetailsModel[]>(this.apiUrl+'GetAllParentTaskDetails');

  }

  addTask(taskDetail :taskDetailsModel)
  {

     let bodyString = JSON.stringify(taskDetail);
     let headers = new Headers({ 'Content-Type': 'application/json',
     });
     let options =  { headers : new HttpHeaders({ 'Content-Type': 'application/json' })};

     this.addTaskUrl  = this.apiUrl+'AddTask';
     return this.http.post(`${this.addTaskUrl}`,bodyString,options);
  }

  updateTask(taskDetail :taskDetailsModel)
  {

     let bodyString = JSON.stringify(taskDetail);
     let headers = new Headers({ 'Content-Type': 'application/json',
     });
     let options =  { headers : new HttpHeaders({ 'Content-Type': 'application/json' })};

     this.addTaskUrl  = this.apiUrl+'EditTask';
     return this.http.post(`${this.addTaskUrl}`,bodyString,options);
  }

  endTask(taskId :number) :Observable<number>
  {
    this.addTaskUrl  = this.apiUrl+'EndTask/';

    return this.http.get<number>(this.addTaskUrl + taskId)


    return this.http.get(this.addTaskUrl + taskId  )
    .pipe(map((data:Response)=><number><unknown>data.json));

  }
}

