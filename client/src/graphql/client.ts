import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client';

const patients = [
  {
    id: 1,
    name: "Marcela O'Harney",
    email: 'moharney0@freewebs.com',
  },
  {
    id: 2,
    name: 'Avram Gockelen',
    email: 'agockelen1@discuz.net',
  },
  {
    id: 3,
    name: 'Aime Royson',
    email: 'aroyson2@ehow.com',
  },
  {
    id: 4,
    name: 'Frederich Ashington',
    email: 'fashington3@godaddy.com',
  },
  {
    id: 5,
    name: 'Theodora Snawden',
    email: 'tsnawden4@printfriendly.com',
  },
  {
    id: 6,
    name: 'Guillema Sworn',
    email: 'gsworn5@multiply.com',
  },
  {
    id: 7,
    name: 'Cynde Gyngell',
    email: 'cgyngell6@gmpg.org',
  },
  {
    id: 8,
    name: 'Julieta Alsford',
    email: 'jalsford7@ehow.com',
  },
  {
    id: 9,
    name: 'Powell Jesty',
    email: 'pjesty8@usatoday.com',
  },
  {
    id: 10,
    name: 'Elli Cawdery',
    email: 'ecawdery9@bizjournals.com',
  },
  {
    id: 11,
    name: 'Denys Blanking',
    email: 'dblankinga@multiply.com',
  },
  {
    id: 12,
    name: 'Elston Aubert',
    email: 'eaubertb@elegantthemes.com',
  },
  {
    id: 13,
    name: 'Lanette Island',
    email: 'lislandc@bbb.org',
  },
  {
    id: 14,
    name: 'Mariana Hallford',
    email: 'mhallfordd@cbc.ca',
  },
  {
    id: 15,
    name: 'Gabriel Boskell',
    email: 'gboskelle@aboutads.info',
  },
  {
    id: 16,
    name: 'Chiarra Llop',
    email: 'cllopf@dyndns.org',
  },
  {
    id: 17,
    name: 'Read Rubanenko',
    email: 'rrubanenkog@wordpress.com',
  },
  {
    id: 18,
    name: 'Carlyn Murname',
    email: 'cmurnameh@tumblr.com',
  },
  {
    id: 19,
    name: 'Fayette Pilling',
    email: 'fpillingi@dyndns.org',
  },
  {
    id: 20,
    name: 'Camilla Eastabrook',
    email: 'ceastabrookj@tumblr.com',
  },
  {
    id: 21,
    name: 'Kasper Walton',
    email: 'kwaltonk@i2i.jp',
  },
  {
    id: 22,
    name: 'Kaylyn Wey',
    email: 'kweyl@privacy.gov.au',
  },
  {
    id: 23,
    name: 'Duff Dawton',
    email: 'ddawtonm@usgs.gov',
  },
  {
    id: 24,
    name: 'Bret Fery',
    email: 'bferyn@themeforest.net',
  },
  {
    id: 25,
    name: 'Alia Domney',
    email: 'adomneyo@seattletimes.com',
  },
  {
    id: 26,
    name: 'Consolata Culvey',
    email: 'cculveyp@mail.ru',
  },
  {
    id: 27,
    name: 'Janot Jacobs',
    email: 'jjacobsq@wix.com',
  },
  {
    id: 28,
    name: 'Sharron Coo',
    email: 'scoor@deliciousdays.com',
  },
  {
    id: 29,
    name: 'Ardys Denney',
    email: 'adenneys@vinaora.com',
  },
  {
    id: 30,
    name: 'Ruby Mc Cahey',
    email: 'rmct@dell.com',
  },
  {
    id: 31,
    name: 'Ian Brattell',
    email: 'ibrattellu@symantec.com',
  },
  {
    id: 32,
    name: 'Inger Longridge',
    email: 'ilongridgev@zdnet.com',
  },
  {
    id: 33,
    name: 'Grantham Ruddom',
    email: 'gruddomw@123-reg.co.uk',
  },
  {
    id: 34,
    name: 'Basil Garrard',
    email: 'bgarrardx@nymag.com',
  },
  {
    id: 35,
    name: 'Devora Maskell',
    email: 'dmaskelly@bing.com',
  },
  {
    id: 36,
    name: 'Charlene Cardinale',
    email: 'ccardinalez@ifeng.com',
  },
  {
    id: 37,
    name: 'Rosalinde Rubenovic',
    email: 'rrubenovic10@google.com.hk',
  },
  {
    id: 38,
    name: 'Orella Basill',
    email: 'obasill11@elpais.com',
  },
  {
    id: 39,
    name: 'Tabor Lorentzen',
    email: 'tlorentzen12@jimdo.com',
  },
  {
    id: 40,
    name: 'Johan Dulieu',
    email: 'jdulieu13@unblog.fr',
  },
  {
    id: 41,
    name: 'Marcel Kingsley',
    email: 'mkingsley14@blogs.com',
  },
  {
    id: 42,
    name: 'Elwood Bloxam',
    email: 'ebloxam15@theguardian.com',
  },
  {
    id: 43,
    name: 'Michael Raphael',
    email: 'mraphael16@wikia.com',
  },
  {
    id: 44,
    name: 'Jess McCaughran',
    email: 'jmccaughran17@jalbum.net',
  },
  {
    id: 45,
    name: 'Melisande Goolden',
    email: 'mgoolden18@gov.uk',
  },
  {
    id: 46,
    name: 'Hailey Ellerey',
    email: 'hellerey19@paginegialle.it',
  },
  {
    id: 47,
    name: 'Barn Rowsell',
    email: 'browsell1a@homestead.com',
  },
  {
    id: 48,
    name: 'Auroora Plum',
    email: 'aplum1b@stumbleupon.com',
  },
  {
    id: 49,
    name: 'Purcell Marrian',
    email: 'pmarrian1c@archive.org',
  },
  {
    id: 50,
    name: 'Skye McLae',
    email: 'smclae1d@china.com.cn',
  },
];

let nextId = patients.length + 1;

const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const { operationName, variables } = operation;

    if (operationName === 'CreatePatient') {
      const newPatient = {
        id: String(nextId++),
        ...variables.input,
      };
      observer.next({ data: { createPatient: newPatient } });
      observer.complete();
    } else if (operationName === 'GetPatients') {
      observer.next({
        data: {
          patients,
        },
      });
      observer.complete();
    } else {
      observer.error(new Error('Unknown operation'));
    }
  });
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: mockLink,
});
