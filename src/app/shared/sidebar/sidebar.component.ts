import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private _gifsService:GifsService
  ) { }

  
  get historial(){
    return this._gifsService.historial;
  }

  ngOnInit(): void {
  }

  //Ejecuta el metodo buscargifs que afecta directamente al componente resultados para la busqueda
  buscar(value:string){
    this._gifsService.buscarGifs(value);
  }

}
