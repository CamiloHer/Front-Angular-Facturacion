import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Detalles } from 'src/app/interfaces/detalles';
import { Producto } from 'src/app/interfaces/producto';
import { Venta } from 'src/app/interfaces/venta';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-formulario-venta',
  templateUrl: './formulario-venta.component.html',
  styleUrls: ['./formulario-venta.component.css']
})
export class FormularioVentaComponent implements OnInit {
  formVentas: FormGroup
  venta: Venta;
  detalle: Detalles;
  total:any
  netoT:number=0;
  listaClientes: Cliente[];
  listaProductos: Producto[];
  array:Producto[];
  ventaId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ventas: VentasService,
    private productos: ProductosService,
    private clientes: ClientesService
  ) { 
    this.formVentas = new FormGroup({
      clientes: new FormControl(
        null,
        Validators.required
      ),
      fecha: new FormControl(
        null,
        Validators.required
      ),
      producto: new FormControl(
        null,
        Validators.required
      ),
    })
  }

  ngOnInit(): void {
    const  id = this.route.snapshot.paramMap.get('id');
    this.ventaId = id
    if(id != 'nuevo'){
      this.traerVentas(parseInt(id));
    }
    this.traerProductos()
    this.traerClientes();
  }

  traerClientes(){
    this.clientes.getClientes().subscribe((data:any)=>{
      console.log(data.data.$values);
      
      this.listaClientes= data.data.$values;
    })
  }
  traerProductos(){
    this.productos.getProductos().subscribe((data:any)=>{
      this.listaProductos= data.data.$values;
    })
  }
  traerVentas(id){
    this.ventas.getVentaId(id).subscribe((data:any)=>{
      this.venta= data.data;
      this.formVentas.get('clientes').setValue(this.venta.idCliente);
      this.formVentas.get('fecha').setValue(new Date(this.venta.fecha));
    })
  }
  traerDetalle(id){
    this.ventas.getDetalleVenta(id).subscribe((data:any)=>{
      this.detalle = data.data.$values
      this.formVentas.get('producto').setValue(this.detalle.idProducto);
          
        })
  }
  handleChange(){
    console.log('entra');
    let id= this.prod;
    console.log(id);
    
    if (id != null) {
      const produ = this.listaProductos.find(p=>{ return p.id == parseInt(id)})
      console.log(produ);
      let obj={
        id: produ.id,
        nombre:produ.nombre,
        precio:produ.precio
      }
      
    }

  }
  get prod(){
    return this.formVentas.get('producto').value
  }
  get neto(){
    if(this.ventaId != 'nuevo'){
      return this.venta.netoTotal

    }
    else{
      return 0;
    }
  }

}
