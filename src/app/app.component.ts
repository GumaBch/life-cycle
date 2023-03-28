import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'app-lista-de-compras';
  listaDeCompra!: Array<Item>;
  itemParaSerEditado!: Item;

  constructor(
    private listaService: ListaDeCompraService
  ) { }

  ngOnInit(): void {
    this.listaDeCompra = this.listaService.getListaDeCompra();
  }

  editarItem(item: Item) {
    this.itemParaSerEditado = item;
  }

  marcarItemDaLista(item: Item) {
    const itemEditado: Item = {
      id: item.id,
      nome: item.nome,
      data: item.data,
      comprado: !item.comprado
    };

    const id = item.id;
    this.listaDeCompra.splice(Number(id)-1, 1, itemEditado);
  }

  ngDoCheck(): void {
    console.log('DoCheck foi chamado');
    this.listaService.atualizarLocalStorage();
  }
}
