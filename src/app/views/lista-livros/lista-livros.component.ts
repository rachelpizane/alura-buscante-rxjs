import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, filter, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Livro } from 'src/app/moldes/interfaces/livro';
import { LivroService } from 'src/app/service/livro/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca: FormControl = new FormControl();
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
  )

  constructor(private livroService: LivroService) { }

}


