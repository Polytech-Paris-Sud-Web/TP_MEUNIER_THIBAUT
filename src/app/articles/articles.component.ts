import { Component, OnInit } from '@angular/core';
import {Article} from '../models/article';
import {ArticleService} from '../article.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  private _articles : Observable<Article[]>;

  constructor(private articleService: ArticleService) {
    this._articles = of();
  }

  articles() {
    return this._articles;
  }

  ngOnInit(): void {
    this.refreshArticles();
  }

  delete(article: Article) {
    this.articleService.deleteArticle(article.id).subscribe(() => {
      this.refreshArticles();
    });
  }

  refreshArticles() {
    this._articles = this.articleService.getArticles();
  }

}
