import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { FormularioVentaComponent } from './components/ventas/formulario-venta/formulario-venta.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormularioProductosComponent } from './components/productos/formulario-productos/formulario-productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormularioClienteComponent } from './components/clientes/formulario-cliente/formulario-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VentasComponent,
    FormularioVentaComponent,
    ProductosComponent,
    FormularioProductosComponent,
    ClientesComponent,
    FormularioClienteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
