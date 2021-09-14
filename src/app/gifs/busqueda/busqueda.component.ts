import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  constructor(
    private _gifsService: GifsService
  ) { }

  //@viewchild
  //elemento a buscar es decir #txtBuscar en el input y todas las propiedades del elemento html

  //!:
  //Asegura que el valor no va a ser nulo, siempre va a tener algo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar() {
    //Obtiene valor
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }

    this._gifsService.buscarGifs(valor);

    //Vacia el campo de texto al realizar la accion
    this.txtBuscar.nativeElement.value = '';

  }




}
