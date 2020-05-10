import { DocumentInterface } from './documentInterface';

export interface DocCollectionInterface {
    [folder: string]: DocumentInterface[];
}
