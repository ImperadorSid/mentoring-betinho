export const create = (factory, attrs) => factories[factory](attrs)

const factories = {
  bet: (attrs) => ({
    stake: 0,
    eventId: 1,
    competitorId: 2,
    odd: 2.8,
    ...attrs,
  }),
  categories: () => [
    {
      id: 1,
      name: 'Soccer',
      icon: '',
    },
    {
      id: 2,
      name: 'Basketball',
      icon: '',
    },
  ],
  events: () => [
    {
      id: 1,
      categoryId: 1,
      competitors: [
        {
          id: 1,
          name: 'Real Madrid',
          type: 'home',
        },
        {
          id: 2,
          name: 'Barcelona',
          type: 'away',
        },
      ],
      odds: {
        home: 1.5,
        away: 2.8,
      },
    },
  ],
}
