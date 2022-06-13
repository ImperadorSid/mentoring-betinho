import PropTypes from 'prop-types'

export const bet = PropTypes.shape({
  stake: PropTypes.number.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      competitorId: PropTypes.number.isRequired,
      odd: PropTypes.number.isRequired,
    })
  ).isRequired,
})

export const account = PropTypes.shape({
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
  }).isRequired,
  activeBets: PropTypes.arrayOf(bet).isRequired,
})

export const event = PropTypes.shape({
  id: PropTypes.number,
  categoryId: PropTypes.number,
  competitors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  odds: PropTypes.shape({
    home: PropTypes.number.isRequired,
    away: PropTypes.number.isRequired,
    draw: PropTypes.number,
  }).isRequired,
})

export const category = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
})
