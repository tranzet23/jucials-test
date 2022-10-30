export const autocompletePhrases = [
  'Состав суда объявлен',
  'Отводов нет',
  'Суд переходит к разрешению ходатайств',
  'Ходатайств нет',
  'Суд делает перерыв на 15 минут',
  'Судебное заседание продолжено в том же составе суда',
  'Ходатайства ответчика: ',
  'Истец: ',
  'Прокурор',
  'Суд на месте определил в удовлетворении заявленного Ходатайства отказать.',
];

export const people = {
  judge: {
    name: {
      last: 'Серова',
      first: 'Екатерина',
      middle: 'Егоровна',
    },
  },
  secretary: {
    name: {
      last: 'Кузнецов',
      first: 'Тимур',
      middle: 'Евгеньевич',
    },
  },
  claimant: {
    name: {
      last: 'Попов',
      first: 'Виктор',
      middle: 'Алексеевич',
    },
    representative: false,
    inCourt: true,
    dateOfBirth: '29.03.1994',
    isIndividual: true,
  },
  // claimantRepresentative: false,
  defendant: {
    name: {
      last: 'Алексеева',
      first: 'Алиса',
      middle: 'Давидовна',
    },
    representative: true,
    inCourt: true,
    dateOfBirth: '29.03.1974',
    isIndividual: true,
  },
  defendantRepresentative: {
    name: {
      last: 'Карпова',
      first: 'Дарья',
      middle: 'Ивановна',
    },
    isAdvocate: true,
    powerOfAttorney: {
      date: '11.01.2021',
      number: '2134234',
    },
  },
  expert: {
    name: {
      last: 'Горбунова',
      first: 'Таисия',
      middle: 'Ивановна',
    },
  },
};
