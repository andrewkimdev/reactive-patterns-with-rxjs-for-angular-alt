import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadStatus } from '../model/upload.status.model';

const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})
export class UploadRecipesPreviewService {

  constructor(private http: HttpClient) { }
  /**
   * Uploads the file
   * @param code
   * @param fileToUpload
   * @returns
   */
  upload(code: string, fileToUpload?: File): Observable<UploadStatus> {
    const formData = new FormData()
    formData.append('fileToUpload', fileToUpload as File)
    return this.http.post<UploadStatus>(
      `${BASE_PATH}/recipes/upload/${code}`,
      formData
    )
  }
}
