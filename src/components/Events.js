import PropTypes from 'prop-types'
import css from '@styled-system/css'
import Box from './Box'
import Flex from './Flex'
import Heading from './Heading'
import Text from './Text'
import Button from './Button'
import { account, event, category } from '../propTypes'

const Events = ({ account, events, categories, selectBet }) => {
  const eventsByCategory = categories.reduce(
    (acc, category) => ({
      ...acc,
      [category.id]: events.filter((event) => event.categoryId === category.id),
    }),
    {}
  )

  return (
    <>
      {categories.map((category) => (
        <Box
          key={category.id}
          css={css({
            ':not(:last-child)': {
              mb: '5',
            },
          })}
        >
          <Flex
            as='header'
            alignItems='center'
            justifyContent='space-between'
            px='4'
            py='3'
            borderRadius='12px 12px 0 0'
            bg='blue'
          >
            <Heading fontSize='6' fontWeight='2'>
              <Text as='span' mr='2'>
                {category.icon}
              </Text>{' '}
              {category.name}
            </Heading>

            <Flex justifyContent='center' width='160px'>
              <Text fontSize='4' color='#8697a2'>
                Winner
              </Text>
            </Flex>
          </Flex>

          {eventsByCategory[category.id].map((event) => {
            const { competitors, odds } = event
            const [home, away] = competitors
            const isDisabled = account.activeBets.some(
              (activeBet) => activeBet.eventId === event.id
            )

            return (
              <Flex
                key={event.id}
                justifyContent='space-between'
                alignItems='center'
                px='4'
                py='3'
                borderWidth='2px'
                borderStyle='solid'
                borderColor='blue'
                css={css({
                  ':not(:first-child)': {
                    borderTop: 0,
                  },
                })}
              >
                <Flex flexDirection='column'>
                  <Text
                    fontSize='5'
                    opacity={isDisabled ? 0.6 : 1}
                    css={css({
                      cursor: isDisabled ? 'auto' : 'pointer',
                      transition: 'color .2s ease',
                      ':hover': { color: isDisabled ? 'inherit' : 'gray.800' },
                    })}
                    onClick={() => {
                      if (isDisabled) return

                      selectBet({
                        eventId: event.id,
                        competitorId: home.id,
                      })
                    }}
                  >
                    {home.name}
                  </Text>

                  <Text
                    pt='2'
                    fontSize='5'
                    opacity={isDisabled ? 0.6 : 1}
                    css={css({
                      cursor: isDisabled ? 'auto' : 'pointer',
                      transition: 'color .2s ease',
                      ':hover': { color: isDisabled ? 'inherit' : 'gray.800' },
                    })}
                    onClick={() => {
                      if (isDisabled) return

                      selectBet({
                        eventId: event.id,
                        competitorId: away.id,
                      })
                    }}
                  >
                    {away.name}
                  </Text>
                </Flex>

                <Box>
                  <Button
                    variant='secondary'
                    width='78px'
                    disabled={isDisabled}
                    onClick={() => {
                      selectBet({
                        eventId: event.id,
                        competitorId: home.id,
                      })
                    }}
                  >
                    {isDisabled ? '🔒' : odds.home}
                  </Button>
                  <Button
                    variant='secondary'
                    ml='2'
                    width='78px'
                    disabled={isDisabled}
                    onClick={() => {
                      selectBet({
                        eventId: event.id,
                        competitorId: away.id,
                      })
                    }}
                  >
                    {isDisabled ? '🔒' : odds.away}
                  </Button>
                </Box>
              </Flex>
            )
          })}
        </Box>
      ))}
    </>
  )
}

Events.propTypes = {
  account,
  events: PropTypes.arrayOf(event).isRequired,
  categories: PropTypes.arrayOf(category).isRequired,
  selectBet: PropTypes.func.isRequired,
}

export default Events
