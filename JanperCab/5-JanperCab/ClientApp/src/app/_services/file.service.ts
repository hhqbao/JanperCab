import { UploadDuraformFileDto } from './../_models/files/UploadDuraformFileDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  duraformFiles: UploadDuraformFileDto[] = [];

  constructor(private http: HttpClient) {}

  downloadDuraformFile = (id: string): Observable<Blob> => {
    return this.http
      .get(`${environment.baseUrl}/Files/DuraformFiles/Download/${id}`, {
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          const blob = new Blob([response], { type: response.type });
          return blob;
        })
      );
  };

  uploadDuraformFiles = (duraformFormId: string) => {
    const formData = new FormData();

    for (let i = 0; i < this.duraformFiles.length; i++) {
      const file = this.duraformFiles[i];

      Object.entries(file).forEach(([key, value]) =>
        formData.append(`uploadFiles[${i}].${key}`, value)
      );
    }

    return this.http
      .post(
        `${environment.baseUrl}/Files/DuraformFiles/Upload/${duraformFormId}`,
        formData
      )
      .pipe(
        map((_) => {
          this.duraformFiles = [];
        })
      );
  };

  deleteDuraformFile = (id: string) => {
    return this.http.delete(
      `${environment.baseUrl}/Files/DuraformFiles/Delete/${id}`
    );
  };
}
