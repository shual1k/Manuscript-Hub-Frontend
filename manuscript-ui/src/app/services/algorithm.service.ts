import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, from, map} from "rxjs";
import {Router} from "@angular/router";
import {RestErrorsHandlerService} from "./rest-errors-handler.service";
import {TownCrierService} from "./town-crier.service";
import {environment} from "../../environments/environment";
import {RouterEnum} from "../enums/RouterEnum";
import {AlgorithmModel} from "../models/AlgorithmModel";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor(private http: HttpClient, private router: Router,
              private restErrorsHandlerService: RestErrorsHandlerService, private townCrier: TownCrierService) {  }

  submitAlgorithm(algorithmModel: AlgorithmModel) {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return from(this.http.post(`${environment.baseUrl}${environment.RESOURCE_SUBMIT_ALGORITHM}`, algorithmModel, {headers: headers}))
      .pipe(
        map((res: any) => {
          this.townCrier.info("Algorithm submitted successfully.")
          this.router.navigate(['/' + RouterEnum.Dashboard]);
          return res;
        }),
        catchError(errorRes => {
          this.townCrier.error(errorRes.error)
          return this.restErrorsHandlerService.handleRequestError(errorRes);
        }));
  }
}