import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private service: CategoriaService, private router: Router) { }

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  ngOnInit(): void {
    this.findAll();
  }

  // tslint:disable-next-line: typedef
  findAll(){
    this.service.findAll().subscribe(resposta => {
      console.log(resposta);
      this.categorias = resposta;
    });

  }

  navegarParaCategoriaCreate(){
    this.router.navigate(['categorias/create']);
  }
}
