export class taskDetailsModel {
Task_Id: number;
Task: string;
Parent_Id: number;
Parent_Task: string;
Priority: number;
Start_Date: Date;
End_Date: Date;

constructor(
  Task_Id: number,
  Task: string,
  Parent_Id: number,
  Parent_Task: string,
  Priority: number,
  Start_Date: Date,
End_Date: Date)
{
  this.Task_Id = Task_Id;
  this.Task = Task;
  this.Parent_Id = Parent_Id;
  this.Parent_Task = Parent_Task;
  this.Start_Date = Start_Date;
  this.End_Date = End_Date;
  this.Priority = Priority;
}
}
