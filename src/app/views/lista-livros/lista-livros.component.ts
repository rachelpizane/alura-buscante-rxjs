import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounce, debounceTime, distinctUntilChanged, EMPTY, filter, Observable, Subscription, switchMap, tap, throwError } from 'rxjs';
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

  livrosEncontrados$: Observable<Livro[]> = this.campoBusca.valueChanges
  .pipe(
    tap((valorDigitado: string) => console.log('Valor digitado:', valorDigitado)),
    filter((valorDigitado: string) => valorDigitado.length >= 3),
    tap((valorDigitado: string) => console.log('Valor válido!')),
    debounceTime(this.PAUSE_TIME),
    tap((valorDigitado: string) => console.log('Tempo de espera: Finalizado!')),
    distinctUntilChanged(),
    switchMap((valorDigitado: string) => this.livroService.buscar(valorDigitado)),
    tap((livros: Livro[]) => console.log(livros)),
    catchError((error: HttpErrorResponse) => {
      console.error(error);
      this.mensagemErro = 'Erro ao buscar livros! Recarregue a aplicação!';
      return EMPTY; // opção 1
      // return throwError(() => new Error(this.mensagemErro = 'Erro ao buscar livros! Recarregue a aplicação!')); // opção 2
    })
  )

  constructor(private livroService: LivroService) { }

}


