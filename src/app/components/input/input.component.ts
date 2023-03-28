import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  @Input() itemQueVaiSerEditado!: Item;

  editando = false;
  textBtn = 'Salvar item';

  valorItem!: string;

  constructor(
    private listaService: ListaDeCompraService
  ) { }

  ngOnInit(): void { }

  adicionarItem() {
    this.listaService.adicionarItemNaLista(this.valorItem);
    this.limpaCampo();
  }

  limpaCampo() {
    this.valorItem = '';
  }

  editarItem() {
    this.listaService.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem);
    this.limpaCampo();
    this.editando = false;
    this.textBtn = 'Salvar item';
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes['itemQueVaiSerEditado'].firstChange) {
      this.editando = true;
      this.textBtn = 'Editar item';
      this.valorItem = this.itemQueVaiSerEditado?.nome;
    }
  }
}
