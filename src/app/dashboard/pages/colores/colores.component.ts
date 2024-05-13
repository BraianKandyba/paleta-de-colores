import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertService } from '../../../servicios/alert/alert.service';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrl: './colores.component.scss'
})
export class ColoresComponent implements OnInit {
  
  isModalOpen: boolean = false;

  colors: string[] = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#FF7832','#6DADE0', '#4B4E2A', '#E9CD4C', '#A8E6CF',
    '#536872', '#FB966E', '#3D1E6D', '#6E7F80' , '#1EA896',
    '#313838', '#171A1A', '#011F4B', '#7997C3', '#A4AFA9',
    '#10646A', '#8E802A', '#1CECF2', '#FE8982', '#11FD7F', 
    '#4460E4', '#3E5975', '#535656', '#5C7C2D', '#C78119',
    '#CB5FA1', '#F46501', '#97D654', '#3B5DEF'
  ];

  colorPorDefecto:string = '#7997C3';

  colorSelecionado: string = this.colorPorDefecto;

  @ViewChild('divColoresPrincipales') divColoresPrincipales!: ElementRef;

  monochromaticPalette: string[] = [];

  randomPaleta: string[] = [];

  constructor(private alertService: AlertService) { }

  
  ngOnInit(){
    this.aplicarColorDefecto();
    this.generarPaletaMonocromatica();
    this.generarRandomPaleta();
    
  }
  openColorPalette() {
    this.isModalOpen = true;
  }

  closeColorPalette() {
    this.isModalOpen = false;
  }

  aplicarColorDefecto() {
    if (this.divColoresPrincipales) {
      this.divColoresPrincipales.nativeElement.style.backgroundColor = this.colorPorDefecto;
    }
    console.log('exitoso')
  }

  selectorColor(color: string) {
    this.colorSelecionado = color; 
    if (this.divColoresPrincipales){
      this.divColoresPrincipales.nativeElement.style.backgroundColor = this.colorSelecionado;
    }
    this.isModalOpen = false //cerramos el modal

    this.generarPaletaMonocromatica();

  }

  // monocromo

  generarPaletaMonocromatica() {
    const baseColor = this.colorSelecionado;
    const step = 20; // Paso de cambio de tono 
    const numberOfShades = 7; // Número de tonos monocromáticos a generar
  
    // Limpia la paleta monocromática anterior
    this.monochromaticPalette = [];

    // Genera los tonos monocromáticos
    for (let i = 0; i < numberOfShades; i++) {
      const shade = this.aclararOscurecerColor(baseColor, i * step);
      this.monochromaticPalette.push(shade);
    }
    console.log("se genero la aleta")
  }

  aclararOscurecerColor(color: string, amount: number): string {
    let r, g, b;

    // Convierte el color hexadecimal a RGB
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);

    // Ajusta el tono
    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    // Convierte de nuevo a hexadecimal
    const newColor = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0').toLocaleUpperCase()}`;
    return newColor;
  }

  //RANDOM

  selectorRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    const randomColor = this.colors[randomIndex];
    this.selectorColor(randomColor);
  }
  


  generarRandomPaleta() {
    const paleta = [];
    const letrasHexa = '0123456789ABCDEF';
    for (let i = 0; i < 7; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letrasHexa[Math.floor(Math.random() * 16)];
      }
      paleta.push(color);
    }
    this.randomPaleta = paleta;
  }

  showCopyTooltip(color: string) {
    const colorElement = document.querySelector('.color-aleatorio:hover');
    if (colorElement) {
      colorElement.setAttribute('title', 'Copiar ' + color);
    }
    
  }
  
  hideCopyTooltip() {
    const colorElement = document.querySelector('.color-aleatorio:hover');
    if (colorElement) {
      colorElement.setAttribute('title', '');
    }
  }
  
  copyColor(color: string) {
    navigator.clipboard.writeText(color)
      .then(() => {
        this.alertService.showMessage('Color copiado:' + color);
        setTimeout(() => this.alertService.hideMessage(), 2000);
      } )
      .catch(err => this.alertService.showMessage('Error al copiar: ' + err));
  }
  

}