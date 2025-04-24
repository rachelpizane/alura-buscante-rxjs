import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { LivroAdapter } from 'src/app/adapter/livro.adapter';
import { ItemLivro } from 'src/app/interfaces/item-livro';
import { ItensLivrosResultado } from 'src/app/interfaces/itens-livros-resultado';
import { Livro } from 'src/app/interfaces/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly api: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valor: string): Observable<Livro[]> {
    const params = new HttpParams()
      .set('q', valor)

    return this.http.get<ItensLivrosResultado>(this.api, { params }).pipe(
      tap((resposta: ItensLivrosResultado) => {
        console.log('Resposta da API (1º tap):', resposta);
      }),
      map(resultado => resultado.items),
      tap((itens: ItemLivro[]) => {
        console.log('Itens retornados: (2º tap)', itens);
      }),
      map((itens: ItemLivro[]) => {
        return itens.map(item => (LivroAdapter.fromDto(item)));
      })
    );
  }
}
