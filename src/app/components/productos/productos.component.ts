import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos!: Producto[];
  constructor(
    private productoService: ProductosService,
    private router: Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.traerProductos();
  }
  traerProductos(){
    this.productoService.getProductos().subscribe((data:any)=>{
      console.log(data.data.$values);
      
      this.productos = data.data.$values;
    })
  }
  irProducto(id){
    this.router.navigate(['productos','formulario-producto',id]),{
      relativeTo: this.route
    }
  }
  confirmacionEliminar(id){
    swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar este producto?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result)=>{
      if (result.value) {
        this.deleteProducto(id);
      }
    })
  }
  deleteProducto(id){
    this.productoService.deleteProdcto(id).subscribe((data:any)=>{
      if (data.codigo == 0) {
        this.productos = this.productos.filter(p=>{
          return p.id != id
        })
      }
    })
  }
}
