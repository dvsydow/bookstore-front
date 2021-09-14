import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  id_cat: String = '';
  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }
 
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
}
