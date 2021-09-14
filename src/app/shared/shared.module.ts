import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  //Exportar el componente para usar en otros modulos es decir el rpincipal cuando invoque este modulo
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
