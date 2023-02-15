import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiService {
  private readonly apiKey = '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'; // Replace with your API key
private readonly apiUrl = 'https://api.openai.com/v1/completions';


  constructor(private http:HttpClient) { }

  public rephrase = (sentence:string) =>{
    // const prompt = `Hello chat gpt this is great to talk to you. i want to repharas this sentence as it would help me to do well`;
    const promt = `rephrase this for resume employment experience: "${sentence}" `;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.apiKey}`);
      const body ={
        "model": "text-davinci-003",
        prompt: promt,//`Rephrase this sentence: "${sentence}"`,
        temperature: 0.5,
        max_tokens: 512

      }

      return this.http.post(this.apiUrl,body,{headers:headers});
  }

  public complete = (sentence:string) =>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.apiKey}`);
      const body ={
        "model": "text-davinci-003",
        prompt: `Complete this sentence: "${sentence}"`,
        temperature: 0.5,
        max_tokens: 512

      }

      return this.http.post(this.apiUrl,body,{headers:headers});
  }
}
