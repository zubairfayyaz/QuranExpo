import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { OverallService } from 'src/Services/overall.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [FormBuilder]

})
export class SearchComponent implements OnInit {
  CityDropDown: IDropdownSettings = {};
  ParaDropDown: IDropdownSettings = {};

  selectedItems1: any;
  selectedItems: any;

  selectPara: any = [];
  SelectCity: any = [];
  newOne: any = [];
  helper: any = [];
  NewArray: any = [];
  getFilterArrayOfCity: any = [];
  getData: any = [];
  model: String = "COMPLETE_WORD";
  JustCheck: boolean = false;
  name: string = "";
  showSpinner: boolean = false;
  builderForm = this.fb.group({
    searchKeyWord: ['', Validators.required],
    searchCriteria: ['', Validators.required],
    makkiMadniSuraFlag: ['', Validators.required],
    suraList: ['', Validators.required],
    listWordsToExclude: ['', Validators.required]
  })
  constructor(private fb: FormBuilder,
    private overall: OverallService) { }
  ngOnInit(): void {
    this.SelectCity = [
      { index: 1, selectcity: 'Medinan' },
      { index: 2, selectcity: 'Meccan' }
    ];
    this.CityDropDown = {
      singleSelection: true,
      idField: 'index',
      textField: 'selectcity',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: false
    };
    this.ParaDropDown = {
      singleSelection: false,
      idField: 'index',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.getAllSuraName();
  }
  getAllSuraName() {
    this.overall.getAllSuraName().subscribe(
      res => {
        this.helper = res;
        this.selectPara = this.helper.listSura;

      }
    );

  }
  onCitySelect(item: any) {
    if (item.selectcity == "Medinan") {
      this.getFilterArrayOfCity = [];
      for (var i = 0; i < this.helper.listSura.length; i++) {
        if (item.selectcity == this.helper.listSura[i].type) {
          this.getFilterArrayOfCity.push(this.helper.listSura[i]);
        }
      }

    } else if (item.selectcity == "Meccan") {
      this.getFilterArrayOfCity = [];
      for (var i = 0; i < this.helper.listSura.length; i++) {
        if (item.selectcity == this.helper.listSura[i].type) {
          this.getFilterArrayOfCity.push(this.helper.listSura[i]);
        }
      }
    }
    this.selectPara = this.getFilterArrayOfCity;
  }
  onItemSelect(item: any) {

  }

  General() {

  }
  onSelectAll(items: any) {
    this.selectPara = this.helper.listSura;
  }
  onSubmit() {
    this.name = "yes";
    this.showSpinner = true;
    if (this.NewArray.length == 0) {
      if (this.builderForm.controls['makkiMadniSuraFlag'].value == undefined) {
        this.builderForm.controls['makkiMadniSuraFlag'].setValue("ALL");
        const body = this.builderForm.value;
        console.log(body);
        this.overall.getSearchedData(body).subscribe(
          res => {
            this.getData = res;
            this.name = "Fayyaz";
            this.showSpinner = false;
          });
        this.JustCheck = true;
      } else {
        this.builderForm.controls['makkiMadniSuraFlag'].setValue(this.builderForm.value.makkiMadniSuraFlag[0].selectcity);
        this.builderForm.controls['listWordsToExclude'].setValue([]);
        const body = this.builderForm.value;
        console.log(body);
        this.overall.getSearchedData(body).subscribe(
          res => {
            this.getData = res;

          });
        this.JustCheck = true;
      }
    }

    else {
      this.builderForm.addControl('listWordsToExclude', this.NewArray);
      const body = this.builderForm.value;
      this.overall.getSearchedData(body).subscribe(res => {
        this.getData = res;
      });
      this.JustCheck = true;
    }
  }
}
