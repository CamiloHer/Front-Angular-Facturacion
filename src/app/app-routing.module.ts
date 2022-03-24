import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormularioClienteComponent } from './components/clientes/formulario-cliente/formulario-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { FormularioProductosComponent } from './components/productos/formulario-productos/formulario-productos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormularioVentaComponent } from './components/ventas/formulario-venta/formulario-venta.component';
import { VentasComponent } from './components/ventas/ventas.component';


const routes: Routes = [{
  path:"",
  component: HomeComponent
},{
  path:"ventas",
  component: VentasComponent
},{
  path:"ventas/formulario-venta/:id",
  component: FormularioVentaComponent
},{
  path:"productos",
  component: ProductosComponent
},{
  path:"productos/formulario-producto/:id",
  component: FormularioProductosComponent
},{
  path:"clientes",
  component:ClientesComponent
},{
  path:"clientes/formulario-cliente/:id",
  component: FormularioClienteComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
