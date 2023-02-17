import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  messages: string[] = [];
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }


}

export enum MESSAGES {
  NO_PROF_IMG = 'Please upload profile image',
}
