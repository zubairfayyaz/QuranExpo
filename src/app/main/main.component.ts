import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { OverallService } from 'src/Services/overall.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() getData?: any;
  @Input() formBuilderValue?: any;
  @Input() JustCheck: boolean = false;
  check2: boolean = this.JustCheck;
  getFirstSuraa: any;

  paraNameShow: any;
  suraNameShow: any;

  newPageNumberByAdditionOne: number = 0;
  currentPageNumberShow: number = 1;

  pageAddition: any = [];
  pageSubtraction: any = [];

  getAllMetaData: any = [];
  getPageBySura: any = [];

  // spinner
  //loading: boolean = false;

  constructor(private overall: OverallService) {

  }

  ngOnInit(): void {
    this.getFirstSura();
    this.getAllMetaDataa();
  }
  nextPage() {
    this.newPageNumberByAdditionOne = this.currentPageNumberShow + 1;
    this.overall.getByPage(this.newPageNumberByAdditionOne).subscribe(
      res => {
        this.pageAddition = res;
        this.currentPageNumberShow = this.pageAddition.pageNumber;
        this.suraNameShow = this.pageAddition.listDtoDisplaySuraByPage[0].suraName;
        this.paraNameShow = this.pageAddition.dtoDisplayJuz.name;
        this.pageSubtraction = [];

      });
  }
  previousPage() {
    if (this.currentPageNumberShow == 1) {
      this.currentPageNumberShow = 2;
    }
    this.newPageNumberByAdditionOne = this.currentPageNumberShow - 1;
    this.overall.getPreviousPage(this.newPageNumberByAdditionOne).subscribe(
      res => {
        this.pageSubtraction = res;
        this.currentPageNumberShow = this.pageSubtraction.pageNumber;
        this.suraNameShow = this.pageSubtraction.listDtoDisplaySuraByPage[0].suraName;
        this.paraNameShow = this.pageSubtraction.dtoDisplayJuz.name;
        this.pageAddition = [];

      }
    );
  }
  getFirstSura() {
    if (this.getData) {
      this.overall.getFirstSura().subscribe(
        res => {
          this.getFirstSuraa = res;
        }
      );
    }
  }

  getAllMetaDataa() {
    this.overall.getAllSuraName().subscribe(res => {
      this.getAllMetaData = res;
      this.suraNameShow = this.getAllMetaData.listSura[0].name;
      this.paraNameShow = this.getAllMetaData.listJuz[0].name;
    });
  }
  getAgainAfterSearch(Array: any) {
    this.pageAddition = [];
    this.pageSubtraction = [];
    this.getPageBySura = Array;
    this.suraNameShow = this.getPageBySura.listDtoDisplaySuraByPage[0].suraName;
    this.paraNameShow = this.getPageBySura.dtoDisplayJuz.name;
    this.currentPageNumberShow = this.getPageBySura.pageNumber;
  }

}

