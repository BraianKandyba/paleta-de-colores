import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../servicios/alert/alert.service';

interface Gradient {
  startColor: string;
  endColor: string;
}

@Component({
  selector: 'app-gradientes',
  templateUrl: './gradientes.component.html',
  styleUrl: './gradientes.component.scss'
})
export class GradientesComponent implements OnInit{

  constructor
  (
    private fb: FormBuilder,
    private alertService: AlertService,
  )
  {
    this.generateGradients();
  }  

  ngOnInit(): void {
    this.gradientForm = this.fb.group({
      startColor: this.fb.control('',[Validators.required]),
      endColor: this.fb.control('',[Validators.required]) 
    });
  }

  gradients: Gradient[] = [
    { startColor: '#bdc3c7', endColor: '#2c3e50' },
    { startColor: '#b92b27', endColor: '#1565C0' },
    { startColor: '#8E2DE2', endColor: '#4A00E0' },
    { startColor: '#FF0099', endColor: '#493240' },
    { startColor: '#f39c12', endColor: '#d35400' },
    { startColor: '#c31432', endColor: '#240b36' },
    { startColor: '#f12711', endColor: '#f5af19' },
    { startColor: '#dd3e54', endColor: '#6be585' },
    { startColor: '#ED213A', endColor: '#93291E' },
    { startColor: '#FFEFBA', endColor: '#FFFFF2' },
    { startColor: '#005AA7', endColor: '#FFFDE4' },
    { startColor: '#000000', endColor: '#434343' }

  ];

  gradientForm!: FormGroup;

  gradientAleatorio: Gradient [] = [];
  gradientGenerado: Gradient | null = null;
  startColor: string = '';
  endColor: string = '';

  
  isModalOpen: boolean = false;
  gradientCode: string = '';

  openModal(gradient: Gradient): void {
    this.gradientCode = `background: linear-gradient(to right, ${gradient.startColor}, ${gradient.endColor})`;
    this.isModalOpen = true;
  }

  copygradient(gradientCode: string) {
    navigator.clipboard.writeText(gradientCode)
      .then(() => {
        setTimeout(()=> this.isModalOpen = false,500);
        this.alertService.showMessage('Codigo Copiado');
        setTimeout(() => this.alertService.hideMessage(), 2000);
      } )
      .catch(err => this.alertService.showMessage('Error al copiar: '+ err));
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


  generateGradients() {
    const count: number = 8;
    const elementos = [];
    for (let i = 0; i < count; i++) {
      const startColor = this.getRandomColor();
      const endColor = this.getRandomColor();
      elementos.push({ startColor, endColor });
    }
    this.gradientAleatorio = elementos;
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }


  userGradient(): void {
    if (this.gradientForm.invalid) {
      this.gradientForm.markAllAsTouched();
      alert("ambos campos son requeridos");
      return;
    }
    const gradient: Gradient = this.gradientForm.value;
    this.gradientGenerado = gradient;
    this.gradientForm.reset();
  }


}
