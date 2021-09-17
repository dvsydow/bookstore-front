import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { Livro } from '../livro.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  isLoading = true;
  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  livros: Livro[] = [];

  // tslint:disable-next-line: variable-name ban-types
  id_cat: String = '';

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.findAll();
  }

  // tslint:disable-next-line: typedef
  findAll(){
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.isLoading = false;
      this.livros = resposta;
      console.log(this.livros);
    });
  }

  // tslint:disable-next-line: typedef
  navegarParaCreateLivro(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros/create`]);
  }

}
