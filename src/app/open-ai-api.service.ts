import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiKey } from './Openai_API_KEY'

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiService {

  private readonly apiKey = apiKey.key;
  private readonly apiUrl = `https://openai-api-production-155f.up.railway.app/api/complete`;


  constructor(private http: HttpClient) { }

  public rephrase = (sentence: string) => {
    return this.openAi(`rephrase this for resume employment experience: "${sentence}" `)
  }

  public complete = (sentence: string) => {
    return this.openAi(`Complete this sentance for my resume: "${sentence}"`)
  }

  public openAi(prompt: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const body = {
      prompt: prompt,
    }
    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}
