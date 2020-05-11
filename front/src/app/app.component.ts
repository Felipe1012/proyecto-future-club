import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormControl, FormGroup, Validators, FormControlDirective, FormBuilder } from '@angular/forms';
import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  palabra: FormGroup ;
  tweetsdata = [];
  res_text=[];
  tweetsform: FormGroup;
  
  formData = new FormControl("");
  datos = new FormControl("");


  constructor(private http: Http, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.tweetsform = this.formBuilder.group({
      formData: this.formData,
    });
    this.palabra = this.formBuilder.group({
      datos: this.datos,
    });
  }


  async searchcall() {
    let searchquery = this.tweetsform.value;
    console.log(this.tweetsform.value.formData);

    this.http.get('http://localhost:3000/api/tweets/' + this.tweetsform.value.formData).subscribe((res) => {
      this.tweetsdata.push(res.json());
      console.log(this.tweetsdata);
      
    });
  }

  async archivo() {
    var headers = new Headers();
    let searchquery = this.palabra.value.datos;
      var data={
        "bucket" : "transmi",
        "name" : this.palabra.value.datos
      }
    this.http.post('http://localhost:3000/list/',data ).subscribe(res => {
      this.res_text.push(res);
      console.log(this.res_text);
      
    });

   
  }
 respuesta =[];
  async nlu_text(){
    var textc
    for(let textR of this.res_text){
      textc = textR._body
    }
    var text = {"text" : textc}
    console.log(textc)
    this.http.post('http://localhost:3000/api/upload-text', text).subscribe(res =>{
      this.respuesta.push(res.json())
      console.log(this.respuesta)

    })
  }


  
}
