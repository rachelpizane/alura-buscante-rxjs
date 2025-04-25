import { ItemLivro } from "./item-livro";
import { Livro } from "./livro";

export interface ItensLivrosResultado {
  items: ItemLivro[]
  totalItems: number;
}

export interface LivrosResultado {
  livros: Livro[]
  totalItems: number;
}


