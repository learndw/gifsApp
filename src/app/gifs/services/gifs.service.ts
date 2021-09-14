import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Interface
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

//Servicio unico y de manera global esd ecir funciona de manera general si nombrar en los providers
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //APIT GYPHY
  //yiwJYeRzPLBqkAB9eiLuADpfKSQtG9NQ

  private apiKey: string = 'yiwJYeRzPLBqkAB9eiLuADpfKSQtG9NQ';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  
  private _historial: string[] = [];

  
  // Tipo GIF es decir como la interfaz
  public resultados: Gif[] = [];

  get historial() {
    //romper referencia y empezar el nuevo arreglo es decir inicializar un array desde otro array
    return [...this._historial];
  }

  constructor(private _http: HttpClient) {
    //Typescript no se debe preocupar por el tipado (!) y es la respuesta o un array vacion || []

    //Obtiene el historial y los resultados desde el localStorage al cargarse la pagina
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    /* if(localStorage.getItem('historial')){
      this._historial=JSON.parse(localStorage.getItem('historial')!);
    } */
  }

  buscarGifs(query: string) {

    //El termino suprime los espacios de la derecha e izquierda y hace todo el texto minusculo
    query = query.trim().toLocaleLowerCase();

    //Para que no se repita terminos en la busqueda e historial
    if (!this._historial.includes(query)) {
      //Almacena el termino en historial
      this._historial.unshift(query);

     // El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos en este caso llega a 10 y reemplaza por nuevos elementos.
      this._historial = this._historial.splice(0, 10);

      
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    //Guarda los parametros que se van a enviar por a url antes que introducirlos en el enlace
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

   
    //https://www.w3schools.com/sql/sql_join_inner.asp
    //Se obtiene el tipado de una respuesta en https://app.quicktype.io y se coloca el codigo en una interface luego se <> indica en el metodo para que la respuesta sea de ese tipo
    this._http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params: params }).subscribe(
      (resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));

      }
    );

  }


}
