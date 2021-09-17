import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {
  categorias: Categoria[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: CategoriaService, private router: Router) { }

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  ngOnInit(): void {
    this.findAll();
  }

  // tslint:disable-next-line: typedef
  findAll(){
    this.loadingSubject.next(true);
    this.service.findAll().subscribe(resposta => {
      this.loadingSubject.next(false);
      console.log(resposta);
      this.categorias = resposta;
    });

  }

  // tslint:disable-next-line: typedef
  navegarParaCategoriaCreate(){
    this.router.navigate(['categorias/create']);
  }

}
