import { PlaceBet } from 'components'
import { screen, render, userEvent } from 'test-support/components'
import { create } from 'test-support/factories'

const userInteration = userEvent.setup()

const setup = ({
  events = create('events'),
  categories = create('categories'),
  changeBetStake = () => {},
  ...rest
} = {}) => {
  return render(
    <PlaceBet events={events} categories={categories} changeBetStake={changeBetStake} {...rest} />
  )
}

describe('<PlaceBet />', () => {
  describe('there is no selected bet', () => {
    it('renders a message', () => {
      setup()

      expect(screen.getByText('Select a match to start...')).toBeInTheDocument()
    })
  })

  describe('there is a selected bet', () => {
    describe('without stake', () => {
      const selectedBet = create('bet')

      beforeEach(() => setup({ selectedBet }))

      it('shows selected event category', () => {
        expect(screen.getByText('Soccer')).toBeInTheDocument()
      })

      it('shows selected event name', () => {
        expect(screen.getByText('Real Madrid vs Barcelona')).toBeInTheDocument()
      })

      it('shows selected competitor name', () => {
        expect(screen.getByText('Real Madrid')).toBeInTheDocument()
      })

      it('should disable "Place Bet" button', () => {
        expect(screen.getByRole('button', { value: 'Place Bet' })).toBeDisabled()
      })
    })

    describe('with stake', () => {
      const selectedBet = create('bet', { stake: 10 })

      it('shows selected competitor odd', () => {
        setup({ selectedBet })

        expect(screen.getByText('2.8')).toBeInTheDocument()
      })

      it('shows potential gains', () => {
        setup({ selectedBet })

        expect(screen.getByText('28.00')).toBeInTheDocument()
      })

      it('should enable "Place Bet" button', () => {
        setup({ selectedBet })

        expect(screen.getByRole('button', { value: 'Place Bet' })).toBeEnabled()
      })

      it('should call function after change stake in input field', async () => {
        const changeBetStake = jest.fn()
        setup({ selectedBet, changeBetStake })
        const stakeInput = screen.getByRole('textbox')

        const newStake = 20
        await userInteration.type(stakeInput, newStake.toString())

        expect(changeBetStake).toBeCalled()
      })
    })
  })
})
