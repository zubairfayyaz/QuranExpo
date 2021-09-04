import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OverallService } from 'src/Services/overall.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() Array?: any;
  @Input() formBuilderValue?: any;
  @Output() newItemEvent = new EventEmitter<any>();
  NewArray: any = [];
  getPageBySura: any = [];
  value: boolean = false;
  checkAllByOneClick: String = '';
  againSearchResult: any = [];

  //spinner
  loading: boolean = false;
  addNewItem() {
    this.newItemEvent.emit(this.getPageBySura);
  }
  againSearchForm = this.fb.group({
    againSearchResult: this.fb.array([])
  })
  constructor(private fb: FormBuilder,
    private overall: OverallService) { }

  ngOnInit(): void {
  }
  done(item: any) {
    this.overall.done(item).subscribe(
      res => {
        this.getPageBySura = res;
        console.log(this.getPageBySura);
        this.addNewItem();
      }
    );

  }
  EliminateResult(item: any) {
    this.Array.listDtoQuranText.splice(item, 1);
  }
  onCheckboxChange(e: any) {
    // var againSearchResult: FormArray = this.againSearchForm.get('againSearchResult') as FormArray;
    if (e.target.checked) {
      console.log(e.target.value);
      this.againSearchResult.push(e.target.value);
    } else {
      let i: number = 0;
      this.againSearchResult.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.againSearchResult.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log();
    this.NewArray = this.againSearchResult;
    console.log(this.NewArray);
  }
  againSearchFormClick() {
    //console.log(this.formBuilderValue.value);
    // this.formBuilderValue.addControl('listWordsToExclude', this.NewArray);
    this.loading = true;
    this.formBuilderValue.controls['listWordsToExclude'].setValue(this.NewArray);
    const body = this.formBuilderValue.value;
    this.overall.getSearchedData(body).subscribe(res => {
      this.Array = res;
      this.loading = false;
    });
  }
  onChangeNew() {
    if (this.checkAllByOneClick == "checked") {
      this.checkAllByOneClick = '';
      this.NewArray = [];
    } else {
      this.checkAllByOneClick = "checked";
      this.NewArray = this.Array.listUniqueWords;
    }
  }
}
