import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private BASE_URL: string = 'https://api.giphy.com/v1/gifs/search';

  private apikey: string = 'RVuo987zBMXjc0qcuSSGlJ79Mnx8igWB';

  private limite: string = '15';

  private _historial: string[] = [];

  public results: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('gifs')!) || [];
    this.results = JSON.parse(localStorage.getItem('lastGifs')!) || [];
    // if (localStorage.getItem('gifs')) {
    //   this._historial = JSON.parse(localStorage.getItem('gifs')!);
    // }
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('gifs', JSON.stringify(this._historial));
    }

    //enviar parametros
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('q', query)
      .set('limit', this.limite);

    //llamada al servicio
    this.http
      .get<SearchGifsResponse>(`${this.BASE_URL}`, { params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem('lastGifs', JSON.stringify(response.data));
      });
    console.log(this._historial);
  }
}
