import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/services/productos.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-formulario-productos',
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario-productos.component.css']
})
export class FormularioProductosComponent implements OnInit {
  formProducto:FormGroup;
  productoId:any;
  producto: Producto = {};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productos_S: ProductosService
  ) {
    this.formProducto = new FormGroup({
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30)
        ])
      ),
      stock: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      precio: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      )
    })
   }
  ngOnInit(): void {
    const  id = this.route.snapshot.paramMap.get('id');
    this.productoId= id;
    if (id != "nuevo") {
      this.getProducto(parseInt(id));
    }
  }
  getProducto(id){
    this.productos_S.getProducto(id).subscribe((data:any)=>{
      this.producto = data.data;
      this.formProducto.get("nombre").setValue(this.producto.nombre);
      this.formProducto.get("precio").setValue(this.producto.precio);
      this.formProducto.get("stock").setValue(this.producto.stock);
    })
  }

   guardarProducto(){
     
    if(this.formProducto.invalid){
      return;
    }
    this.producto.stock =  this.formProducto.get("stock").value;
    this.producto.precio =  this.formProducto.get("precio").value;
    this.producto.nombre =  this.formProducto.get("nombre").value;

    if (this.productoId == 'nuevo') {
      this.postProducto(this.producto);
    }
    else{
      this.putProducto(this.producto.id,this.producto);
    }
    console.log(this.producto);
  }
  postProducto(producto){
    this.productos_S.postProducto(producto).subscribe((data:any)=>{
      console.log(data.data);
      if (data.codigo == 0) {
        this.swalSucces('registrado');
      }
    })
  }
  putProducto(id,producto){
    this.productos_S.putProducto(id,producto).subscribe((data:any)=>{
      console.log(data.data);
      if (data.codigo == 0) {
        this.swalSucces('actualizado');
      }
      
    })
  }

  swalSucces(type){
    swal.fire({
      icon: 'success',
      title: `Se ha ${type} correctamente`,
      confirmButtonText:'Ver productos'
    }).then(result =>{
      this.router.navigate(['productos'])
    })
  }
  get fprod(){
    return this.formProducto.controls
  }

}
