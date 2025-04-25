import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { LivroAdapter } from 'src/app/moldes/adapter/livro.adapter';
import { ItemLivro } from 'src/app/moldes/interfaces/item-livro';
import { ItensLivrosResultado } from 'src/app/moldes/interfaces/itens-livros-resultado';
import { Livro } from 'src/app/moldes/interfaces/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly api: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valor: string): Observable<ItensLivrosResultado> {
    const params = new HttpParams()
      .set('q', valor)

    return this.http.get<ItensLivrosResultado>(this.api, { params });
  }
}
