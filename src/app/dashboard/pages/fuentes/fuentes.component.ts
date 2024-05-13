import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../../servicios/alert/alert.service';

interface DivData {
  text: string;
  color: string;
  textColor: string;
  font: string; // Agrega la propiedad font
}


@Component({
  selector: 'app-fuentes',
  templateUrl: './fuentes.component.html',
  styleUrl: './fuentes.component.scss'
})
export class FuentesComponent implements OnInit {

  
  ngOnInit(): void {

    this.colorSelecionadoback = '#FF0000'; // Color de fondo predeterminado
    this.generateMonochromaticPalette();
    this.generateDivs();
  }
  constructor(private alertService:AlertService){}
  
  monochromaticPalette: string[] = [];

  colorSelecionadoback: string ='';
  colorSelecionaTexto ='#171A1A';

  fondoSeleccionado: string = '#ff0000'
  textoColor: string = '#000000';

  isModalOpen: boolean = false;
  isModalOpenText:boolean = false;

  fontOptions: string[] = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Verdana, sans-serif',
    'Georgia, serif',
    'Tahoma, sans-serif',
    'Palatino Linotype, Book Antiqua, Palatino, serif',
    'Lucida Sans Unicode, Lucida Grande, sans-serif',
    'Garamond, serif',
    'Impact, Charcoal, sans-serif',
    'Bookman Old Style, serif',
    'Trebuchet MS, sans-serif',
    'Lucida Console, Monaco, monospace',
    'Arial Black, Gadget, sans-serif',
  ];

  fontSeleccionada: string = 'Arial, sans-serif'  
  
  colores: string[] = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#FF7832','#6DADE0', '#4B4E2A', '#E9CD4C', '#A8E6CF',
    '#536872', '#FB966E', '#3D1E6D', '#6E7F80' , '#1EA896',
    '#313838', '#171A1A', '#011F4B', '#7997C3', '#A4AFA9',
    '#10646A', '#8E802A', '#1CECF2', '#FE8982', '#11FD7F',
    '#4460E4', '#3E5975', '#535656', '#5C7C2D', '#C78119',
    '#CB5FA1', '#F46501', '#97D654', '#3B5DEF'
  ];

  colorsText: string[] = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#FF7832','#6DADE0', '#4B4E2A', '#E9CD4C', '#A8E6CF',
    '#536872', '#FB966E', '#3D1E6D', '#6E7F80' , '#1EA896',
    '#313838', '#171A1A', '#011F4B', '#7997C3', '#A4AFA9',
    '#10646A', '#8E802A', '#1CECF2', '#FE8982', '#11FD7F',
    '#4460E4', '#3E5975', '#535656', '#5C7C2D', '#C78119',
    '#CB5FA1', '#F46501', '#97D654', '#3B5DEF'
  ];
  colors: string[] = [];

  openColorPalette() {
    this.colors = this.colores
    this.isModalOpen = true;
  }
  closeColorPalette() {
    this.isModalOpen = false;
  }
  openTextPalette(){
    this.colors = this.colorsText;
    this.isModalOpenText = true;
  }
  closeTextPalette(){
    this.isModalOpenText = false;
  }

  selectorColorfondo(color: string) {
    this.fondoSeleccionado = color
    this.colorSelecionadoback = color;
    this.closeColorPalette();
    this.generateMonochromaticPalette()
    this.generateDivs()
    
  }
  selectorColorTexto(color: string){
    this.colorSelecionaTexto = color
    this.textoColor = color
    this.generateDivs()
    this.closeTextPalette()
  }

  seleccionarFuente() {
    this.generateDivs();
    console.log(this.fontSeleccionada)
  }

  generateDivs(): { text: string; color: string; textColor: string;font:string }[] {
    const divs: DivData[] = [];
    for (let i = 0; i < 9; i++) {
      divs.push({
        text: `Texto ${i + 1}`,
        color: this.monochromaticPalette[i],
        textColor: this.textoColor,
        font: this.fontSeleccionada,
      });
    }
    return divs;
  }

  generateMonochromaticPalette() {
    const baseColor = this.fondoSeleccionado;
    const step = 255 / 9; 
    this.monochromaticPalette = [];
    
    for (let i = 0; i <= 255; i += step) {
      const shade = this.aclararOscurecerColor(baseColor, i);
      this.monochromaticPalette.push(shade);
    }
  }
  

  aclararOscurecerColor(color: string, amount: number): string {
    let r, g, b;
    
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
    
    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));
    
    const newColor = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0').toLocaleUpperCase()}`;
    return newColor;
  }

  codigoCSS: string = '';
  mostrarCodigoModal:boolean = false
  abrirCodigoModal() {
    this.generarCodigoCSS(); // Generar el código antes de abrir el modal
    this.mostrarCodigoModal = true;
  }
  
  cerrarCodigoModal() {
    this.mostrarCodigoModal = false;
  }

  generarCodigoCSS() {
    this.codigoCSS = `
      background-color: ${this.fondoSeleccionado};
      color: ${this.colorSelecionaTexto};
      font-family: ${this.fontSeleccionada};
    `;
  }
  

  copyCss(codigoCSS: string) {
    navigator.clipboard.writeText(codigoCSS)
      .then(() => {
        setTimeout(()=> this.mostrarCodigoModal= false,500);
        this.alertService.showMessage('Codigo Copiado');
        setTimeout(() => this.alertService.hideMessage(), 2000);
      } )
      .catch(err => this.alertService.showMessage('Error al copiar: '+ err));
  }


}
