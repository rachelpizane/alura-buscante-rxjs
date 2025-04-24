import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/moldes/interfaces/livro';
import { LivroService } from 'src/app/service/livro/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {
  campoBusca!: string;
  subscricao!: Subscription;
  listaLivros: Livro[] = []

  constructor(private livroService: LivroService) { }

  buscarLivros(): void {
    this.subscricao = this.livroService.buscar(this.campoBusca).subscribe({
      next: (livros: any) => this.listaLivros = livros,
      error: erro => console.error(erro),
      complete: () => console.log('Requisição completa')
    });
  }

  ngOnDestroy(): void {
    if (this.subscricao) {
      this.subscricao.unsubscribe();
    }
  }

}



