import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LeaderService {

  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
  }
  getLeadersById(id: number) : Observable<Leader>{
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }
  
  constructor() { }
}
