import { Fragment } from 'react'
import PropTypes from 'prop-types'
import css from '@styled-system/css'
import Flex from './Flex'
import Text from './Text'
import Heading from './Heading'
import Button from './Button'
import Input from './Input'
import Box from './Box'
import { event, category, bet } from '../propTypes'

const PlaceBet = ({
  events,
  categories,
  selectedBet,
  removeBet,
  removeBetEvent,
  changeBetStake,
  placeBet,
}) => {
  if (!selectedBet) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Text fontSize="4" textAlign="center" color="gray.800">
          Select a match to start...
        </Text>
      </Flex>
    )
  }

  const selectedBetEventsId = selectedBet.events.map((event) => event.id)

  const selectedBetEvents = events.filter((event) => selectedBetEventsId.includes(event.id))
  const allCompetitors = selectedBetEvents.reduce(
    (acc, event) => [...acc, ...event.competitors],
    []
  )
  const selectedBetCategoriesIds = selectedBetEvents.map((event) => event.categoryId)
  const selectedBetCategories = categories.filter((category) =>
    selectedBetCategoriesIds.includes(category.id)
  )
  const selectedBetCategoriesWithEvents = selectedBetCategories.map((category) => ({
    ...category,
    events: selectedBetEvents.filter((event) => event.categoryId === category.id),
    betEvents: selectedBet.events.filter((event) => event.categoryId === category.id),
  }))
  const betEventsOrderedByCategories = selectedBetCategoriesWithEvents.reduce(
    (acc, category) => [...acc, ...category.betEvents],
    []
  )

  const handleEnter = (event) => {
    if (event.key !== 'Enter') {
      return
    }

    placeBet()
  }

  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <Box>
          {selectedBetCategoriesWithEvents.map((selectedBetCategory, index) => {
            return (
              <Fragment key={index}>
                <Heading fontSize="5" fontWeight="2" mt={index !== 0 ? 4 : 0}>
                  <Text as="span" mr="2">
                    {selectedBetCategory.icon}
                  </Text>{' '}
                  {selectedBetCategory.name}
                </Heading>

                {selectedBetCategory.events.map((betEvent, index) => {
                  const [selectedBetHome, selectedBetAway] = betEvent.competitors

                  return (
                    <Flex key={index} alignItems="center" justifyContent="space-between" mt="2">
                      <Text fontSize="5">
                        {selectedBetHome.name} vs {selectedBetAway.name}
                      </Text>

                      <Text
                        fontSize="4"
                        color="red"
                        ml="2"
                        css={css({ cursor: 'pointer' })}
                        onClick={() => removeBetEvent(betEvent)}
                        title="Remove this bet"
                      >
                        x
                      </Text>
                    </Flex>
                  )
                })}
              </Fragment>
            )
          })}
        </Box>

        <Box>
          {betEventsOrderedByCategories.map((betEvent, index) => {
            const category = categories.find((category) => category.id === betEvent.categoryId)

            return (
              <Flex key={index} justifyContent="space-between" mt={index === 0 ? 5 : 0}>
                <Text fontSize="5">
                  {category.icon}{' '}
                  {
                    allCompetitors.find((competitor) => competitor.id === betEvent.competitorId)
                      .name
                  }
                </Text>

                <Text fontSize="5" color="green.100">
                  {betEvent.odd}
                </Text>
              </Flex>
            )
          })}

          <Input
            mt="2"
            css={css({ textAlign: 'right' })}
            value={selectedBet.stake}
            onChange={changeBetStake}
            onKeyPress={handleEnter}
          />

          <Flex justifyContent="space-between" mt="2">
            <Text fontSize="4" color="red" css={css({ cursor: 'pointer' })} onClick={removeBet}>
              x Remove {selectedBet.events.length === 1 ? '' : 'All'}
            </Text>

            <Text fontSize="4">
              <Text as="span" color="gray.800">
                Potencial Gain
              </Text>{' '}
              {parseFloat(
                selectedBet.stake *
                  (selectedBet.events.reduce((acc, event) => acc + event.odd, 0) *
                    (selectedBet.events.length === 1 ? 1 : 1.25))
              ).toFixed(2)}
            </Text>
          </Flex>

          <Button
            variant="primary"
            width={1}
            mt="2"
            disabled={!selectedBet.stake}
            onClick={placeBet}
          >
            Place Bet
          </Button>
        </Box>
      </Flex>
    </>
  )
}

PlaceBet.propTypes = {
  selectedBet: bet,
  events: PropTypes.arrayOf(event).isRequired,
  categories: PropTypes.arrayOf(category).isRequired,
  removeBet: PropTypes.func,
  removeBetEvent: PropTypes.func,
  changeBetStake: PropTypes.func,
  placeBet: PropTypes.func,
}

export default PlaceBet
