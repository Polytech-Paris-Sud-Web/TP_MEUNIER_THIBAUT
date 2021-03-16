import {Component, Input, Output, OnInit} from '@angular/core';
import {Article} from '../models/article';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article?: Article;

  @Output()
  deletedArticle : EventEmitter<Article> = new EventEmitter();

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const aId : number = Number(this.route.snapshot.paramMap.get("id"));
    this.articleService.getArticleByID(aId).subscribe(val => {
      this.article = val;
    });
  }

  delete(){
    this.deletedArticle.emit(this.article);
  }

}
