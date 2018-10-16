import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LeaderService {

  getLeaders(): Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }
  getLeadersById(id: number) : Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }
  
  constructor() { }
}
