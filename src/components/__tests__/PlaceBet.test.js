import PlaceBet from '../PlaceBet'
import { render, fireEvent } from '../../../test-support/components'
import { create } from '../../../test-support/factories'

describe('<PlaceBet />', () => {
  const setup = ({
    events = create('events'),
    categories = create('categories'),
    removeBet = () => {},
    changeBetStake = () => {},
    placeBet = () => {},
    ...props
  } = {}) =>
    render(
      <PlaceBet
        events={events}
        categories={categories}
        removeBet={removeBet}
        changeBetStake={changeBetStake}
        placeBet={placeBet}
        {...props}
      />
    )

  describe("when there's not a bet selected", () => {
    it('renders a placeholder message', () => {
      const { getByText } = setup()

      expect(getByText('Select a match to start...')).toBeInTheDocument()
    })
  })

  describe('when there is a bet selected', () => {
    const selectedBet = create('bet')

    it('renders selected bet category', () => {
      const { getByText } = setup({ selectedBet })

      expect(getByText('Soccer')).toBeInTheDocument()
    })

    it('renders selected competitor name', () => {
      const { getByText } = setup({ selectedBet })

      expect(getByText(/Barcelona/)).toBeInTheDocument()
    })

    it('renders selected competitor odd', () => {
      const { getByText } = setup({ selectedBet })

      expect(getByText('2.8')).toBeInTheDocument()
    })

    it('renders the potential gain', () => {
      const { getByText } = setup({
        selectedBet: create('bet', { stake: 10 }),
      })

      expect(getByText('28.00')).toBeInTheDocument()
    })

    describe('when the stake is changed', () => {
      it('calls the changeBetStake callback', () => {
        const changeBetStake = jest.fn()
        const { getByRole } = setup({ selectedBet, changeBetStake })

        fireEvent.change(getByRole('textbox'), {
          target: { value: '10' },
        })

        expect(changeBetStake).toHaveBeenCalled()
      })
    })

    describe('when remove bet is clicked', () => {
      it('calls the removeBet callback', () => {
        const removeBet = jest.fn()
        const { getByText } = setup({ selectedBet, removeBet })

        fireEvent.click(getByText('x Remove'))

        expect(removeBet).toHaveBeenCalled()
      })
    })

    describe('when place bet is clicked', () => {
      it('calls the placeBet callback', () => {
        const placeBet = jest.fn()
        const { getByText } = setup({
          selectedBet: create('bet', { stake: 10 }),
          placeBet,
        })

        fireEvent.click(getByText('Place Bet'))

        expect(placeBet).toHaveBeenCalled()
      })
    })
  })
})
