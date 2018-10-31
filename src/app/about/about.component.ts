import { Component, OnInit,Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service'; 
import { Leader } from '../shared/leader'; 
import { flyInOut,expand } from '../animations/app.animation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  errMess : string;
  leaders: Leader[];
  constructor(private leaderService: LeaderService,
     private http: HttpClient,
     private processHTTPMsgService: ProcessHTTPMsgService,
     @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders,errmess => this.errMess = <any>errmess);
  }
}
