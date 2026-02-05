interface IUser {
  name: string;
  age: number;
  email?: string;
  phone: number;
}

interface ICustomer extends IUser {
  balance: number;
  orderHistory: string[];
}

let uploadStatus: 'loading' | 'succes' | 'error';

let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

function getCalc(a: number, b: number): number {
  return a + b;
}

function getTextFormat(text: string, textFormat: 'uppercase' | 'lowercase' | 'capitalize'): string {
  if (textFormat === 'uppercase') {
    return text.toUpperCase();
  }
  if (textFormat === 'lowercase') {
    return text.toLowerCase();
  }
  if (textFormat === 'capitalize') {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
  }
  return text;
}

function getTextWithoutSymbol(text: string, symbol: string): string {
  if (text.includes(symbol)) {
    return text.split(symbol).join('');
  } else {
    return text;
  }
}

const users: IUser[] = [
  {
    name: 'Saimon',
    age: 34,
    phone: 4555446266,
  },

  {
    name: 'Nick',
    age: 32,
    email: 'nick@gmail.com',
    phone: 459009266,
  },

  {
    name: 'Jonn',
    age: 27,
    email: 'jonn11@gmail.com',
    phone: 455544133,
  },

  {
    name: 'Elizabet',
    age: 27,
    email: 'lizzy@gmail.com',
    phone: 455548908,
  },

  {
    name: 'Olivia',
    age: 25,
    phone: 4555443490,
  },
];

const matureUsers: IUser[] = users.filter((user: IUser) => user.age > 30);
console.log(matureUsers);
