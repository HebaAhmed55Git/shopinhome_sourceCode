import { Pipe, PipeTransform } from '@angular/core';

import {Product} from '../interfaces/product'

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allProduct:Product[] , userWord:string): Product[] {
    return allProduct.filter((prod)=> prod.title.toLowerCase().includes(userWord.toLowerCase()) );
  }

}
