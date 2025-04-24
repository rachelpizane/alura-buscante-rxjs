import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { Livro } from 'src/app/moldes/interfaces/livro';
import { LivroService } from 'src/app/service/livro/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca: FormControl = new FormControl();

  livrosEncontrados$: Observable<Livro[]> = this.campoBusca.valueChanges
  .pipe(
    tap((valorDigitado: string) => console.log('Valor digitado:', valorDigitado)),
    switchMap((valorDigitado: string) => this.livroService.buscar(valorDigitado)),
  )

  constructor(private livroService: LivroService) { }

}


