import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu:any[]=[{
    id: 'productos',
    title:  'Productos',
    path:'/formulario-producto/nuevo'
  },{
    id: 'clientes',
    title:  'Clientes',
    path:'/formulario-cliente/nuevo'
  }]
  isCollapsed= false;

  constructor() { }

  ngOnInit(): void {
  }

}
