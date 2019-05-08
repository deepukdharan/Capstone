import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filter:any, defaultFilter: boolean): any {

    console.log(filter);
    console.log("inFilter");
    if(!filter) return items;

    console.log("2ndFilter");
    if (!Array.isArray(items)){
      return items;
    }

    console.log("3rdFilter");
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

    if (defaultFilter) {
      console.log("4thFilter");

      return items.filter(item =>
          filterKeys.reduce((x, keyName) =>
              (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));

    }
    else {
      console.log("5thFilter");
      console.log(filterKeys);
      //return
      let x = items.filter(item => {
        return filterKeys.some((keyName) => {
          console.log(keyName);
          console.log(RegExp(filter[keyName], 'gi').test(item[keyName]));
          return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
        });
      });
      console.log(x);
      return x;
    }
   }
  }
}
