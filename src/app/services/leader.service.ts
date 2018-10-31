import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
  
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LeaderService {

  constructor(private http: HttpClient,private processHTTpMsgService: ProcessHTTPMsgService) { }

  getLeadersById(id: number) : Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id).pipe(this.processHTTpMsgService.handleError)
  }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTpMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leadership => leadership[0]))
      .pipe(catchError(this.processHTTpMsgService.handleError));
  }
  
}
