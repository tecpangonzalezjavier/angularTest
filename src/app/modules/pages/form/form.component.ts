import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  status: any = [
    {
      label: "No especificar",
      value: null
    },
    {
      label: "Soltero",
      value: 'soltero'
    },
    {
      label: "Divorciado",
      value: 'Divorciado'
    },
    {
      label: "Casado",
      value: 'Casado'
    },
  ];


  public FormGroup = this.formBuilder.group({
    names: ['', [Validators.required, this.noTrailingSpaceValidator]],
    last_names: ['', [Validators.required, this.noTrailingSpaceValidator]],
    smoke: [false, Validators.required],
    reading: [false, Validators.required],
    civil_status: [''],
    books: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder) {}

  get books() {
    return this.FormGroup.controls["books"] as FormArray;
  }

  ngOnInit() {
    this.FormGroup.get('reading')?.valueChanges.subscribe((value) => {
      if (value) {
        this.FormGroup.get('books')?.enable();
      } else {
        this.FormGroup.get('books')?.disable();
      }
    });
  }

  getControls() {
    return (this.FormGroup.get('books') as FormArray).controls;
  }

  // Validación personalizada para nombres y apellidos
  noTrailingSpaceValidator(control: any) {
    if (control.value && control.value.trim().length !== control.value.length) {
      return { trailingSpace: true };
    }
    return null;
  }

  // Agregar librosLeidosUltimosTresMeses
  agregarLibro() {
    const librosArray = this.FormGroup.get('books') as FormArray;
    librosArray.push(this.formBuilder.control(''));
  }

  removerLibro(index: number) {
    const librosArray = this.FormGroup.get('books') as FormArray;
    librosArray.removeAt(index);
  }

  // Enviar el formulario
  enviarFormulario() {
    if (this.FormGroup.valid) {
      // Formulario válido, muestra una alerta de éxito
      alert('Formulario válido. ¡Enviado con éxito!');
    } else {
      // Formulario inválido, muestra una alerta de error
      alert('Formulario inválido. Por favor, complete los campos obligatorios.');
    }
  }

  isFormArray(control: AbstractControl): boolean {
    return control instanceof FormArray;
  }

  addBook() {
    const BookForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.books.push(BookForm)
  }

  deleteBook(index: number){
    this.books.removeAt(index)
  }

  getFormGroup(bookForm: AbstractControl) {
    return bookForm as FormGroup;
  }
}
