import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map, Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DossierService {
  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getDossiersByParent(id: number): Observable<any> {
    return this.http.get<any[]>(this.APIUrl + '/get_dossier_Byparent/'+id);
  }



  addDossier(val: any) {
    return this.http.post(this.APIUrl + '/dossier/', val);
  }
  addRectangle(val: any) {
    return this.http.post(this.APIUrl + '/rect/', val);
  }
  addField(val: any) {
    return this.http.post(this.APIUrl + '/field/', val);
  }
  addLink(val: any) {
    return this.http.post(this.APIUrl + '/link/', val);
  }
  addDossierToRect(val: any) {
    return this.http.post(this.APIUrl + '/rectdossier/', val);
  }
  addDossierToField(val: any) {
    return this.http.post(this.APIUrl + '/fielddossier/', val);
  }
  getDossierList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/dossier/');
  }

  getRectangleList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/rect/');
  }
  getLinkList(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/getLink_ByField/'+id);
  }
  get_Rectangle_ByDossier(id: any):Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/getRectByDossier/' + id);
  }
  get_Field_ByRect(id: any):Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/Field_By_Rect/' + id);
  }
  get_Field_ByRectandDossier(idRect: any,idDossier:any) {
    return this.http.get<any[]>(this.APIUrl + '/Field_By_RectDossier/'+idRect+'/'+idDossier);
  }
  getAllByParent(id: any):Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/getAllRectByParent/' + id);
  }
  get_dossier_Byparent(id: any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/get_dossier_Byparent/' + id);

  }
  deleteReactangle(val: any) {
    return this.http.delete(this.APIUrl + '/rect/' + val);
  }
  deleteDossier(val: any) {
    return this.http.delete(this.APIUrl + '/dossier/' + val);
  }
  deleteField(val: any) {
    return this.http.delete(this.APIUrl + '/field/' + val);
  }
}
