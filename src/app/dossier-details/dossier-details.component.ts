import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DossierService } from '../service/dossier/dossier.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


/**
 * @title Basic Drag&Drop
 */
@Component({
  selector: 'app-dossier-details',
  templateUrl: './dossier-details.component.html',
  styleUrls: ['./dossier-details.component.css'],
})
export class DossierDetailsComponent implements OnInit {
  field: any = [];
  fields: any = [];
  rectangles: any = [];
  allRectangles: any = [];
  links: any = [];
  RectName: any;
  RectField: any;
  final:any="file";
  id: any;
  idrect: any;
  linkName:any;
  linkUrl:any;
  isopen: boolean = false;
  nouveau:boolean=true;
  existant:boolean=false;
  nouv:boolean=true;
  exist:boolean=false;
  selectedRectangleId:any;
  selectedFieldId:any;

  showModal = false;
  idrectModal :number=0;
  nomModal:string="";

  openModalRect(id:any,nom:any) {
    this.idrectModal = id;
    this.nomModal=nom
    this.showModal = true;
    console.log()
  }

  closeModalRect() {
    this.showModal = false;
    this.nouv=true;
    this.exist=false
  }
  idFieldModal :number=0;
  nomFieldModal:string="";

  openModal(id:any,nom:any) {
    this.idFieldModal = id;
    this.nomFieldModal=nom
    this.showModal = true;
    console.log()
    this.getLink(id)
  }

  closeModal() {
    this.showModal = false;
  }

  constructor(private service: DossierService, private route: ActivatedRoute,fb: FormBuilder,private http: HttpClient) {

  }
  onSubmit(event: any) {
    const fileInput = event.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    this.http.post('http://127.0.0.1:8000/drive/add_folder/', formData)
      .subscribe((data: any) => {
       console.log(data);
        var val = {
          Link_Name: data.name,
          Link_Url: data.link,
          Field_Id:this.idFieldModal
        };
        console.log(val)
        this.service.addLink(val).subscribe((res) => {
          alert(res.toString());
          window.location.reload();;
        });

      });
  }

ajoutlien(){
  var val = {
    Link_Name: this.linkName,
    Link_Url: this.linkUrl,
    Field_Id:this.idFieldModal
  };
  console.log(val)
  this.service.addLink(val).subscribe((res) => {
    alert(res.toString());
    window.location.reload();;
  });

}

  ngOnInit(): void {
    this.refresh();


  }
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  refresh() {
    this.getrectangle();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.field = [];
      this.service.get_Rectangle_ByDossier(this.id).subscribe((data: any) => {
        data.forEach((x: any) => {
          this.service.get_Field_ByRectandDossier(x.R_Id, this.id).subscribe((res: any) => {
            this.field=[...this.field]
            res['rect'] = x.R_Name;
            res['id'] = x.R_Id;
            this.field.push(res);
          });
        });
      });
    });
  }


  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.getrectangle();
      this.route.params.pipe(
        switchMap((params: Params) => {
          this.id = params['id'];
          console.log(this.id);
          return this.service.getAllByParent(this.id);
        })
      ).subscribe((data: any) => {
        console.log(data);
        this.field = [];
        data.forEach((x: any) => {
          console.log(x);
          this.service.get_Field_ByRect(x.R_Id).subscribe((res: any) => {
            this.field=[...this.field]
            res['rect'] = x.R_Name;
            res['id'] = x.R_Id;
            this.field.push(res);
          });
        });
      });
    } else {
      window.location.reload();;
    }
  }



getexistfield(id:any){
console.log(id)
this.fieldbyrect(id)
}

fieldbyrect(id:any){
  this.service.get_Field_ByRect(id).subscribe((res: any) => {
    this.fields=res
    console.log(this.fields);
    // this.field.push(this.field);
  });
}
  getLink(id:any){
    this.service.getLinkList(id).subscribe((res: any) => {
  this.links = res;
  console.log(res);
})
}
  getrectangle(){
      this.service.getRectangleList().subscribe((rect: any) => {
    this.allRectangles = rect;
    console.log(rect);
  })
}
onSelectRectangle(event: any) {
  this.selectedRectangleId = event.target.value;
}
onSelectField(event: any) {
  this.selectedFieldId = event.target.value;
  console.log(event.target.value)
}
  addRectangle() {
    if (this.nouveau){
    var val = {
      R_Name: this.RectName,
      Dossier_Id: this.id,
    };
    console.log(val)
    this.service.addRectangle(val).subscribe((res) => {
      alert("added successfully");
      window.location.reload();;
    });
  }
  else if(this.existant){
    var val2 = {
      Dossier_Id: this.id,
      R_Id: this.selectedRectangleId
    };
    this.service.addDossierToRect(val2).subscribe((res) => {
      alert("added successfully");
      window.location.reload();;
    });
  }
  }
  addField(id: any,field:any) {
    if(this.nouv){
    var val = {
      Field_Name:  (<HTMLInputElement>document.getElementById("recipient-name")).value,
      Rect_Id: id,
      Dossier_Id: this.id,
    };
    console.log(val)
    this.service.addField(val).subscribe((res) => {

      alert("added successfully");
      window.location.reload();;
    });
  }
  else if(this.exist){
    var val2 = {
      Dossier_Id: this.id,
      Field_Id: this.selectedFieldId
    };
    console.log(val2)
    this.service.addDossierToField(val2).subscribe((res) => {
      alert("added successfully");
      window.location.reload();;
    });
  }
  }
 supprimerRect(id:any){
  if (confirm('Are you sure to delete ??')) {
    this.service.deleteReactangle(id).subscribe((data) => {
      alert(data.toString());
      this.refresh();
      window.location.reload();;
    });
  }
 }
 supprimerFied()
{
  if (confirm('Are you sure to delete ??'+this.idFieldModal)) {
    this.service.deleteField(this.idFieldModal).subscribe((data:any) => {
      alert(data.toString());

      window.location.reload();;
    });
  }
 }
}


