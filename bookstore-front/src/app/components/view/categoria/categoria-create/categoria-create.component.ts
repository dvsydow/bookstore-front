import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  categoria: Categoria = {
    nome: '',
    descricao: ''
  };
  constructor(private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.loadingSubject.next(true);
    this.service.create(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias']);
      this.service.mensagem('Categoria criada com sucesso!');
    },
      err => {
        this.loadingSubject.next(false);
        for (const iterator of err.error.errors) {
          this.service.mensagem(iterator.message);
        }
        /* for (let index = 0; index < err.error.errors.length; index++) {
          const element = err.error.errors[index];

        } */
      }

    );
  }

  cancelar(): void {
      this.router.navigate(['categorias']);
  }

}
