import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

/*
  Generated class for the CartolaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartolaProvider {

  private baseApiPath = "/cartolaApi/";

  private baseAzureApiPath = "https://monkey-hub-api.azurewebsites.net/api/";// "/vargolaApi/";

  constructor(
    public http: HttpClient,
    private _platform: Platform
  ) {
    //if(this._platform.is("cordova")) { // Indica que é um Mobile Android, IOS ou WPhone
    //  this.baseApiPath = "https://api.cartolafc.globo.com/";
    //}
  }
  
  atletas(): Observable<any> {
    return this.http.get(this.baseApiPath + "atletas/mercado");
  }

  tags(): Observable<any> {
    console.log("metodo tags iniciado");
    let ret = this.http.get(this.baseAzureApiPath + "tags");
    console.log("metodo tags finalizado");
    return ret;
  }
}
