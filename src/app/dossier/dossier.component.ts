
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { DossierService } from "../service/dossier/dossier.service";

@Component({
  selector: "app-dossier",
  templateUrl: "./dossier.component.html",
  styleUrls: ["./dossier.component.css"],
})
export class DossierComponent implements OnInit {

  @Input() dossiers: any = [];


  constructor(private service: DossierService, private router: Router) {

  }

  ngOnInit(): void {
   this.getDossiers(0);
 }

 getDossiers(parentId: number): void {
  this.service.getDossiersByParent(parentId).subscribe({
    next: (dossiers) => {
      for (let dossier of dossiers) {
        dossier.children = [];
        this.getDossierChildren(dossier);
      }
      this.dossiers = dossiers;
    },
    error: (err) => {
      console.error(err);
    }
  });
}

 getDossierChildren(parentDossier: any): void {
  console.log(parentDossier);
  this.service.getDossiersByParent(parentDossier.Dossier_Id)
  .subscribe({
    next: (dossiers) => {
      for (let dossier of dossiers) {
        dossier.children = [];
        parentDossier.children.push(dossier);
        this.getDossierChildren(dossier);
      }
    },
    error: (error) => {
      console.error(error);
    }
  });
}

  Add_Dossier() {
    var val = {
      Dossier_Name: (<HTMLInputElement>document.getElementById("dossier"))
        .value,
      Dossier_Parent: null,
    };
    this.service.addDossier(val).subscribe((res) => {
      alert(res.toString());
      this.getDossiers(0);
    });
  }
  Add_Sous_Dossier(id: any) {
    var val = {
      Dossier_Name: (<HTMLInputElement>document.getElementById("dossier-name"))
        .value,
      Dossier_Parent: id,
    };
    console.log(val);
    this.service.addDossier(val).subscribe((res) => {
      alert(res.toString());
      this.getDossiers(0);
    });

  }
  openDossier(id: any) {
    console.log(id);
    this.router.navigate(["/dossier/", id]);
  }
  supprimer(id: any) {
    if (confirm("Are you sure to delete ??")) {
      this.service.deleteDossier(id).subscribe((data) => {
        alert(data.toString());
        this.getDossiers(0);
        window.location.reload();
      });
    }
  }
 
}

