import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OverallService {

  constructor(private http: HttpClient) { }

  getAllSuraName() {
    return this.http.get('http://45.35.42.88:8081/quran/getAllMetaData');
  }
  getSearchedData(body: any) {
    return this.http.post<any>('http://45.35.42.88:8081/quran/search', body);
  }
  getFirstSura() {
    return this.http.get('http://45.35.42.88:8081/quran/getBySura?sura=1');
  }
  getByPage(pageNumber: number) {
    return this.http.get('http://45.35.42.88:8081/quran/getByPage?pageNumber=' + pageNumber);
  }
  getPreviousPage(pageNumber: number) {
    return this.http.get('http://45.35.42.88:8081/quran/getByPage?pageNumber=' + pageNumber);
  }
  done(Take: any) {
    return this.http.get('http://45.35.42.88:8081/quran/getPageBySuraAndAya?suraNumber=' + Take.sura + '&ayaNumber=' + Take.aya);
  }

}
