
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageIMGService {
  uploadPercent!:Observable<any>;
  urlImage!:Observable<string>;

  constructor(private storage:AngularFireStorage, private auth:AuthService) { }

  upload(e:any):boolean {
    const id = localStorage.getItem('idDoc')
    const file = e.target.files[0];
    //const filePath = 'upload/imagen.png'
    const filePath = `uploads/profile_${id}`
    //console.log(filePath)
    const ref = this.storage.ref(filePath);
    console.log(file)
    const task = ref.put(file);
    //console.log(ref)
    ref.getDownloadURL().subscribe((url) =>{
        //console.log(url)
        this.auth.actualizarImgProfile(url);
      }
    )

    return true;
  }

  upload2(file:File, id:string) {
    const filePath = `uploads/profile_${id}`
    //console.log(filePath)
    const ref = this.storage.ref(filePath);
    console.log(file)
    const task = ref.put(file);
    //console.log(ref)
    ref.getDownloadURL().subscribe((url) =>{
        console.log(url)
        this.auth.actualizarImgProfile(url);
      }
    )

    return true;
  }
}
