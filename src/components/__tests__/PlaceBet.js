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

      it('shows selected event category', () => {
        setup({ selectedBet })

        expect(screen.getByText('Soccer')).toBeInTheDocument()
      })

      it('shows selected event name', () => {
        setup({ selectedBet })

        expect(screen.getByText('Real Madrid vs Barcelona')).toBeInTheDocument()
      })

      it('shows selected competitor name', () => {
        setup({ selectedBet })

        expect(screen.getByText('Real Madrid')).toBeInTheDocument()
      })

      it('shows call removeBet callback when the "Remove" link is clicked', async () => {
        const removeBet = jest.fn()
        setup({ selectedBet, removeBet })
        const removeButton = screen.getByText('x Remove')

        await userInteration.click(removeButton)

        expect(removeBet).toBeCalled()
      })

      it('should the submit button be disabled', () => {
        setup({ selectedBet })

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

      it('should update stake when something is typed in the input field', async () => {
        const changeBetStake = jest.fn()
        setup({ selectedBet, changeBetStake })
        const stakeInput = screen.getByRole('textbox')

        const newStake = 20
        await userInteration.type(stakeInput, newStake.toString())

        expect(changeBetStake).toBeCalled()
      })

      it('should submit button be enabled', () => {
        setup({ selectedBet })

        expect(screen.getByRole('button', { value: 'Place Bet' })).toBeEnabled()
      })

      it('should submit bet event data when the button is pressed', async () => {
        const placeBet = jest.fn()
        setup({ selectedBet, placeBet })
        const submitButton = screen.getByRole('button', { value: 'Place Bet' })

        await userInteration.click(submitButton)

        expect(placeBet).toBeCalled()
      })
    })
  })

  describe('there are multiple bets selected', () => {
    const selectedBet = create('bet', {
      events: [
        { id: 1, competitorId: 1, odd: 2.8, categoryId: 1 },
        { id: 2, competitorId: 4, odd: 0.8, categoryId: 2 },
      ],
    })

    it('shows selected categories', () => {
      setup({ selectedBet })

      expect(screen.getByText('Soccer')).toBeInTheDocument()
      expect(screen.getByText('Basketball')).toBeInTheDocument()
    })

    it('shows selected events names', () => {
      setup({ selectedBet })

      expect(screen.getByText('Real Madrid vs Barcelona')).toBeInTheDocument()
      expect(screen.getByText('Rivers vs Eagles')).toBeInTheDocument()
    })

    it('shows selected competitors name', () => {
      setup({ selectedBet })

      expect(screen.getByText('Real Madrid')).toBeInTheDocument()
      expect(screen.getByText('Eagles')).toBeInTheDocument()
    })

    it('shows call to remove single event from selection', async () => {
      const removeBetEvent = jest.fn()
      setup({ selectedBet, removeBetEvent })
      const removeButtons = screen.getAllByTitle('Remove this bet')

      await userInteration.click(removeButtons[0])
      await userInteration.click(removeButtons[1])

      expect(removeBetEvent).toBeCalledTimes(2)
    })

    it('shows call removeBet callback when the "Remove All" link is clicked', async () => {
      const removeBet = jest.fn()
      setup({ selectedBet, removeBet })
      const removeButton = screen.getByText('x Remove All')

      await userInteration.click(removeButton)

      expect(removeBet).toBeCalled()
    })
  })
})
