import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtitle',
  standalone: true
})
export class SubtitlePipe implements PipeTransform {

  transform(pTiltle:string): string {
    return pTiltle.split(" ").slice(0,2).join(" ");
  }

}
