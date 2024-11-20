import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatProp',
  standalone: true
})
export class FormatPropertyNamePipe implements PipeTransform {

  transform(value: unknown): string {
    let formattedName = '';

    if (typeof(value) === 'string') {
        formattedName = value.split(' ') // Split by spaces
        .map(letter => letter[0].toUpperCase() + letter.slice(1)) // Capitalize first letter of each word
        .join(' ') // Join back with spaces
        .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between lowercase and uppercase letters
    }  
    
    return formattedName;
  }

}
