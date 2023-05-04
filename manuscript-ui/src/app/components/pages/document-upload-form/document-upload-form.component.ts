import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faTimes, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {DocumentService} from "../../../services/document.service";
import {DocumentMetadataModel} from "../../../models/DocumentMetadataModel";

@Component({
  selector: 'app-document-upload-form',
  templateUrl: './document-upload-form.component.html',
  styleUrls: ['./document-upload-form.component.css']
})
export class DocumentUploadFormComponent implements OnInit {
  uid!: string;
  form!: FormGroup;
  fileToUpload?: File;
  faTimes: IconDefinition = faTimes;

  constructor(private formBuilder: FormBuilder, private documentService: DocumentService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.uid = localStorage.getItem("uid")!;
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: [''],
      publicationDate: [''],
      description: [''],
      file: [null, Validators.required]
    });
  }

  onImageSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: FormData = new FormData();
      // formData.append('title', this.form.value.title);
      // formData.append('author', this.form.value.author);
      // formData.append('publicationDate', this.form.value.publicationDate);
      // formData.append('description', this.form.value.description);
      if (this.fileToUpload) {
        const documentMetadata: DocumentMetadataModel = new DocumentMetadataModel({
          uid: this.uid,
          title: this.form.value.title,
          author: this.form.value.author,
          publicationDate: this.form.value.publicationDate,
          description: this.form.value.description,
        });
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        formData.append('metadata', JSON.stringify(documentMetadata));
        console.log("Uploading file");
        this.documentService.uploadDocument(formData)
          .subscribe(res => {
          });
      }
    }
  }

  removeFile() {
    this.form.get('file')?.setValue(null);
    this.fileToUpload = undefined;
  }
}
