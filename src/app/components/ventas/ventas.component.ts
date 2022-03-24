import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venta } from 'src/app/interfaces/venta';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(
    private ventas: VentasService,
    private router: Router,
    private route: ActivatedRoute
    ) { }
  listaVentas!: Venta[];
  ngOnInit(): void {
    this.traerVentas()
  }
  traerVentas(){
    this.ventas.getVentas().subscribe((data:any)=>{
      console.log(data.data);
      this.listaVentas = data.data.$values;
    })
  }
  irVenta(id){
    this.router.navigate(['ventas','formulario-venta',id]),{
      relativeTo: this.route
    }
  }

}
