import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String = '';
  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }
  titulo = new FormControl('', [Validators.minLength(3)]);
  // tslint:disable-next-line: variable-name
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.livro.id = this.route.snapshot.paramMap.get('id');
    this.findByID();
  }

  findByID(): void{
    this.service.findById(this.livro.id).subscribe((resposta) => {
      this.livro = resposta;
    });

  }

  update(): void {
    console.log(this.livro);
    console.log(this.id_cat);
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro Alterado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Falha ao alterar Livro! Tente mais tarde!');
    });
  }

  cancelar(): void {
      // this.id_cat = this.route.snapshot.paramMap.get('id_cat');
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
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
