import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize } from 'rxjs/operators';
import { CategoriasDataSource } from '../categorias.datasource';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit, AfterViewInit {
  //categorias: Categoria[] = [];

  dataSource: CategoriasDataSource;

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('input', { static: true }) input: ElementRef;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: CategoriaService, private router: Router) { }



  ngOnInit(): void {
    this.dataSource = new CategoriasDataSource(this.service);

    this.dataSource.loadCategorias('', 'asc', 0, 3);
  }

  ngAfterViewInit(): void {
    console.log('aqui');

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadLessonsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  // tslint:disable-next-line: typedef
  /* findAll(filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number) {
    this.loadingSubject.next(true);


    this.service.findAll1(filter, sortDirection,
      pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(categorias => this.categoriasSubject.next(categorias));





  } */

  loadLessonsPage() {
    this.dataSource.loadCategorias(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  // tslint:disable-next-line: typedef
  navegarParaCategoriaCreate() {
    this.router.navigate(['categorias/create']);
  }

}
