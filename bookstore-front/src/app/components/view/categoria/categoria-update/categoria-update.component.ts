import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  isLoading = true;

  categoria: Categoria = {
    nome: '',
    descricao: ''
  };
  constructor(private service: CategoriaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id).subscribe((resposta) => {
      this.isLoading = false;
      this.categoria = resposta;
      console.log(resposta);
    });
  }

  thinking(): void {
    this.isLoading=true;
  }

  update(): void {
    this.service.update(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias']);
      this.service.mensagem('Categoria alterada com sucesso!');
    },
      err => {
        // this.service.mensagem('validar se todos os campos estao preenchidos corretamente!');
        this.service.mensagem(err.error.error);
      }

    );
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }
}
