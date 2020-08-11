import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonAssetsService {
  states: any[] = [
    { id: 'ACT', name: 'ACT' },
    { id: 'NSW', name: 'NSW' },
    { id: 'NT', name: 'NT' },
    { id: 'QLD', name: 'QLD' },
    { id: 'SA', name: 'SA' },
    { id: 'TAS', name: 'TAS' },
    { id: 'VIC', name: 'VIC' },
  ];

  constructor() {}
}
