import { ItemLivro } from './../../moldes/interfaces/item-livro';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounce, debounceTime, distinctUntilChanged, EMPTY, filter, finalize, map, Observable, Subscription, switchMap, tap, throwError } from 'rxjs';
import { LivroAdapter } from 'src/app/moldes/adapter/livro.adapter';
import { ItensLivrosResultado, LivrosResultado } from 'src/app/moldes/interfaces/itens-livros-resultado';
import { Livro } from 'src/app/moldes/interfaces/livro';
import { LivroService } from 'src/app/service/livro/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca: FormControl = new FormControl();
  mensagemErro: string = '';
  PAUSE_TIME: number = 500;
  loading: boolean = false;

  resultadoEncontrado$: Observable<LivrosResultado> = this.campoBusca.valueChanges
    .pipe(
      filter((valorDigitado: string) => valorDigitado.length >= 3),
      tap((valorDigitado: string) => console.log('Valor válido!')),
      debounceTime(this.PAUSE_TIME),
      tap((valorDigitado: string) => console.log('Tempo de espera: Finalizado!')),
      distinctUntilChanged(),
      switchMap((valorDigitado: string) => {
        this.loading = true;
        return this.livroService.buscar(valorDigitado)
      }),
      map((itensLivrosResultado: ItensLivrosResultado) => {
        return {
          livros: itensLivrosResultado.items ? itensLivrosResultado.items.map(item => LivroAdapter.fromDto(item)) : [],
          totalItems: itensLivrosResultado.totalItems || 0
        } as LivrosResultado;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.mensagemErro = 'Erro ao buscar livros! Recarregue a aplicação!';
        return EMPTY; // opção 1
        // return throwError(() => new Error(this.mensagemErro = 'Erro ao buscar livros! Recarregue a aplicação!')); // opção 2
      }),
      finalize(() => this.loading = false)
    )

  constructor(private livroService: LivroService) { }
}


