type ArrayItemType = {
  name: string, age: number, date_of_birth: string
} |
  string |
  number |
  boolean |
  (() => void);

const array: ArrayItemType[] = [{
  name: 'John', age: 32, date_of_birth: '01/12/1994'
},
  'Layer',
  1452475414785214,
  true,
  true,
  function printAccountData() {}
]
