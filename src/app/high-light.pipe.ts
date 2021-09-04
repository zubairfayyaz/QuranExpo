import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highLight'
})
export class HighLightPipe implements PipeTransform {

  item: any = [];
  join: String = '';
  vari: String = "good";
  color: String = "red";

  transform(value: String, args: any): any {
    let arg1 = args;
    this.item = value.split(" ");

    for (let i = 0; i < this.item.length; i++) {
      if (this.item[i] == arg1) {
        this.item[i] = '<span  class="highlightText text-danger "> ' + arg1 + ' </span>';
      }
    }
    for (let i = 0; i < this.item.length; i++) {
      this.join += this.item[i] + " ";
    }

    return this.join;
  }

}
