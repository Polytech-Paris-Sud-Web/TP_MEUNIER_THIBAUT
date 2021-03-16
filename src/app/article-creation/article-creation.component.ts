import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Article} from '../models/article';
import {ArticleService} from '../article.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  @Output()
  postedArticle : EventEmitter<Article> = new EventEmitter();

  articleForm : FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      content : ['', Validators.required ],
      author : ['', Validators.required ],
    });
  }

  ngOnInit(): void {
  }

  resetForm(): void {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      content : ['', Validators.required ],
      author : ['', Validators.required ],
    });
  }

  createArticle() {
    const { title, content, author } = this.articleForm.value;
    const a = {title:title, content:content, author:author}
    this.articleService.postArticle(a).subscribe((val)=>{ 
      this.postedArticle.emit(a);
      this.router.navigate([`/article/${val.id}`]);
    });
  }

}
