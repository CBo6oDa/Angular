import { Component, OnInit, Input, ViewChild,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective;
  dishIds: number[];
  prev: number;
  next: number;
  dish: Dish;
  commentForm: FormGroup;
  comment: Comment;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private com: FormBuilder,
    @Inject('BaseURL') private BaseURL) { this.createForm();}
 
  createForm(){
    this.commentForm = this.com.group({
      author: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      rating: '5',
      comment: ['',[Validators.required,Validators.minLength(2)]],
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data? : any){
    if(!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 3 characters long.',
      'maxlength':     'Name cannot be more than 30 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Last Name must be at least 2 characters long.'
    }
  };

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(+params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id)});
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = Date.now().toString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
    this.commentFormDirective.resetForm();
    console.log('');
  }
}
