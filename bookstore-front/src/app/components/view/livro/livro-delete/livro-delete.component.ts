import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

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
    this.loadingSubject.next(true);
    this.service.findById(this.livro.id).subscribe((resposta) => {
      this.loadingSubject.next(false);
      this.livro = resposta;
    });

  }

  delete(): void {
    this.loadingSubject.next(true);
    this.service.delete(this.livro.id).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro Excluido com sucesso!');
    }, err => {
      this.loadingSubject.next(false);
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Falha ao excluir Livro! Tente mais tarde!');
    });
  }

  cancelar(): void {
      // this.id_cat = this.route.snapshot.paramMap.get('id_cat');
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}