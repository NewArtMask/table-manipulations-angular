import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableContentService {
  public initTableData = [
    {
      company: 'Alfreds Futterkiste',
      name: 'Maria Anders',
      contact: 'Superstraße 1',
      country: 'Austria',
    },
    {
      company: 'Berglunds snabbköp',
      name: 'Christina Berglund',
      contact: 'Berguvsvägen 8',
      country: 'Sweden',
    },
    {
      company: 'Centro comercial Moctezuma',
      name: 'Francisco Chang',
      contact: 'Sierras de Granada 9993',
      country: 'Mexico',
    },
    {
      company: 'Ernst Handel',
      name: 'Roland Mendel',
      contact: 'Kirchgasse 6',
      country: 'Austria',
    },
    {
      company: 'FISSA Fabrica Inter. Salchichas S.A.',
      name: 'Helen Bennett',
      contact: '12, rue des Bouchers',
      country: 'France',
    },
    {
      company: 'Galería del gastrónomo',
      name: 'Philip Cramer',
      contact: 'Calle del Rosal 4',
      country: 'Spain',
    },
    {
      company: 'Island Trading',
      name: 'Helen Bennett',
      contact: 'Garden House Crowther Way',
      country: 'UK',
    },
    {
      company: 'Königlich Essen',
      name: 'Philip Cramer',
      contact: 'Maubelstr. 90',
      country: 'Germany',
    },
    {
      company: 'Laughing Bacchus Wine Cellars',
      name: 'Yoshi Tannamuri',
      contact: '1900 Oak St.',
      country: 'Canada',
    },
    {
      company: 'Magazzini Alimentari Riuniti',
      name: 'Giovanni Rovelli',
      contact: 'Via Ludovico il Moro 22',
      country: 'Italy',
    },
    {
      company: 'Apple',
      name: 'Tim Cook',
      contact: '1 Infinite Loop',
      country: 'USA',
    },
    {
      company: 'Microsoft',
      name: 'Satya Nadella',
      contact: 'One Microsoft Way',
      country: 'USA',
    },
    {
      company: 'Amazon',
      name: 'Andy Jassy',
      contact: '410 Terry Ave. North',
      country: 'USA',
    },
    {
      company: 'Facebook',
      name: 'Mark Zuckerberg',
      contact: '1 Hacker Way',
      country: 'USA',
    },
    {
      company: 'Google',
      name: 'Sundar Pichai',
      contact: '1600 Amphitheatre Parkway',
      country: 'USA',
    },
    {
      company: 'Samsung',
      name: 'Kim Ki-nam',
      contact: '129 Samsung-ro',
      country: 'South Korea',
    },
    {
      company: 'Sony',
      name: 'Kenichiro Yoshida',
      contact: '1-7-1 Konan',
      country: 'Japan',
    },
    {
      company: 'Tesla',
      name: 'Elon Musk',
      contact: '3500 Deer Creek Road',
      country: 'USA',
    },
    {
      company: 'IBM',
      name: 'Arvind Krishna',
      contact: '1 New Orchard Road',
      country: 'USA',
    },
    {
      company: 'Intel',
      name: 'Pat Gelsinger',
      contact: '2200 Mission College Blvd.',
      country: 'USA',
    },
    {
      company: 'Ford',
      name: 'Jim Farley',
      contact: '16800 Executive Plaza Dr',
      country: 'USA',
    },
    {
      company: 'Toyota',
      name: 'Akio Toyoda',
      contact: '1 Toyota-Cho',
      country: 'Japan',
    },
    {
      company: 'Honda',
      name: 'Toshihiro Mibe',
      contact: '2-1-1 Minami-Aoyama',
      country: 'Japan',
    },
    {
      company: 'Nissan',
      name: 'Makoto Uchida',
      contact: '2 Takara-cho, Kanagawa-ku',
      country: 'Japan',
    },
    {
      company: 'General Motors',
      name: 'Mary Barra',
      contact: '300 Renaissance Center',
      country: 'USA',
    },
    {
      company: 'Fiat Chrysler Automobiles',
      name: 'Carlos Tavares',
      contact: "25 St James's Square",
      country: 'UK',
    },
    {
      company: 'BMW',
      name: 'Oliver Zipse',
      contact: 'Petuelring 130',
      country: 'Germany',
    },
    {
      company: 'Mercedes-Benz',
      name: 'Ola Källenius',
      contact: 'Mercedesstraße 120',
      country: 'Germany',
    },
    {
      company: 'Volkswagen',
      name: 'Herbert Diess',
      contact: 'Berliner Ring 2',
      country: 'Germany',
    },
    {
      company: 'Traban',
      name: 'Fishko Bub',
      contact: 'Trabaner Weg',
      country: 'FRD',
    },
  ];

  public getTableData({
    searchData = '',
    page = 1,
    pageItemsAmount = 10,
  } = {}): { pageAmount: number; data: any[] } {
    const filteredData = this.filterTable(searchData);
    const data = this.formPage(filteredData, page, pageItemsAmount);
    return {
      pageAmount: Math.ceil(filteredData.length / pageItemsAmount),
      data,
    };
  }

  private formPage(data: any[], page: number, pageItemsAmount: number): any[] {
    if (pageItemsAmount < 1) return [];
    const startPosition = page > 0 ? (page - 1) * pageItemsAmount : 0;

    return data.slice(startPosition, startPosition + pageItemsAmount);
  }

  public initTableDataCopy(originData: any[]): any[] {
    return originData.map((item) => ({ ...item }));
  }

  private filterTable(searchData: string): typeof this.initTableData {
    return this.initTableDataCopy(this.initTableData).filter(
      (data) =>
        data.name
          .toLocaleLowerCase()
          .includes(searchData.toLocaleLowerCase()) ||
        data.company
          .toLocaleLowerCase()
          .includes(searchData.toLocaleLowerCase()) ||
        data.country
          .toLocaleLowerCase()
          .includes(searchData.toLocaleLowerCase()) ||
        data.contact
          .toLocaleLowerCase()
          .includes(searchData.toLocaleLowerCase())
    );
  }

  public getPredication(
    searchData: string,
    predicationLinstLength = 5
  ): string[] {
    const filteredTable = this.filterTable(searchData);
    const predicationsList = filteredTable.reduce((acc: string[], data) => {
      let predications = [];
      if (
        data.name.toLocaleLowerCase().startsWith(searchData.toLocaleLowerCase())
      ) {
        predications.push(data.name);
      }
      if (
        data.company
          .toLocaleLowerCase()
          .startsWith(searchData.toLocaleLowerCase())
      ) {
        predications.push(data.company);
      }
      if (
        data.contact
          .toLocaleLowerCase()
          .startsWith(searchData.toLocaleLowerCase())
      ) {
        predications.push(data.contact);
      }
      if (
        data.country
          .toLocaleLowerCase()
          .startsWith(searchData.toLocaleLowerCase())
      ) {
        predications.push(data.country);
      }

      return [...acc, ...predications];
    }, []);

    return [...new Set(predicationsList)].slice(0, predicationLinstLength);
  }
}
