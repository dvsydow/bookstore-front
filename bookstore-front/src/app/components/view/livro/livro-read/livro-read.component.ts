import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

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

  cancelar(): void {
      // this.id_cat = this.route.snapshot.paramMap.get('id_cat');
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
