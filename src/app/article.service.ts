import { Injectable } from '@angular/core';
import {Article} from './models/article';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public getArticleByID(id?: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
  }

  public deleteArticle(id?: number): Observable<Article> {
    return this.http.delete<Article>(`http://localhost:3000/articles/${id}`);
  }

  public postArticle(article: Article): Observable<Article> {   
    return this.http.post<Article>("http://localhost:3000/articles", article);
  }

  constructor(private http : HttpClient) {}
}
