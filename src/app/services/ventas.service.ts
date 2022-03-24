import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }
   baseUrl = 'https://localhost:44323/api'
  getVentas(){
    return this.http.get(`${this.baseUrl}/Ventas/GetVentas`)
  }
  getVentaId(id){
    return this.http.get(`${this.baseUrl}/Ventas/GetVenta/${id}`)
  }
  getDetalleVenta(id){
    return this.http.get(`${this.baseUrl}/Ventas/GetDetalleVenta/${id}`)
  }
}
