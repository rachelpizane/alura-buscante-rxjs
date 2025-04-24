import { ItemLivro } from "../interfaces/item-livro";
import { Livro } from "../interfaces/livro";

export class LivroAdapter {
  static fromDto(dto: ItemLivro): Livro {
    return {
      title: dto.volumeInfo?.title,
      authors: dto.volumeInfo?.authors,
      publisher: dto.volumeInfo?.publisher,
      publishedDate: dto.volumeInfo?.publishedDate,
      description: dto.volumeInfo?.description,
      previewLink: dto.volumeInfo?.infoLink,
      thumbnail: dto.volumeInfo?.imageLinks?.thumbnail,
    };
  }
}
