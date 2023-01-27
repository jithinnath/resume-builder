import { IResume } from './../types';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
export interface Template {
  dd(data: IResume): TDocumentDefinitions;
}
