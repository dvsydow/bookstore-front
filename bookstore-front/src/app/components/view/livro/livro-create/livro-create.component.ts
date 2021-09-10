import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3)]);
  // tslint:disable-next-line: variable-name
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  getMessage() {
    if (this.titulo.invalid) {
      return 'o campo titulo deve conter entre 3 e 100 caracteres';
    }
    if (this.nome_autor.invalid) {
      return 'o campo Nome do Autor deve conter entre 3 e 100 caracteres';
    }
    if (this.texto.invalid) {
      return 'o campo texto deve conter entre 10 e 100 caracteres';
    }
    return false;

  }

}
