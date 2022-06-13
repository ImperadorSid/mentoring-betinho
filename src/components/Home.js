import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useBet } from '../providers/BetProvider'
import { useEvents } from '../providers/EventsProvider'
import { useAccount } from '../providers/AccountProvider'
import { useCategories } from '../providers/CategoriesProvider'
import {
  Box,
  Flex,
  Text,
  Heading,
  Container,
  Button,
  Events,
  PlaceBet,
} from './'

const Home = () => {
  const { events, getEvents } = useEvents()
  const { account, getAccount } = useAccount()
  const { categories, getCategories } = useCategories()
  const { bet, selectBet, changeBetStake, removeSelectedBet, removeSelectedBetEvent, placeBet } =
    useBet()

  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAccount()
        await getEvents()
        await getCategories()

        setStatus('fulfilled')
      } catch (error) {
        console.error(error)

        setStatus('rejected')
      }
    }

    fetchData()
  }, [])

  const handleChangeBetStake = (event) => {
    const stake = event.target.value

    changeBetStake(stake)
  }

  const handleClickPlaceBet = (event) => {
    placeBet()
  }

  return (
    <>
      <Container as='header' height='72px'>
        <Flex justifyContent='space-between' alignItems='center' height='100%'>
          <Heading fontSize='8'>Betinho</Heading>

          <Flex as='nav' alignItems='center' height='100%'>
            <Flex flexDirection='column' alignItems='flex-end'>
              <Text fontSize='4' color='gray.800'>
                Balance
              </Text>

              <Text fontSize='5'>
                <Box as='span' color='green.50'>
                  +
                </Box>{' '}
                {account.balance.amount} Coins
              </Text>
            </Flex>
            <Link href='/my-bets' passHref>
              <Button as='a' variant='secondary' ml='4'>
                <Text
                  as='span'
                  px='1'
                  mr='2'
                  fontSize='4'
                  bg='green.100'
                  color='black'
                  borderRadius='4px'
                >
                  {account.activeBets.length}
                </Text>
                My Bets
              </Button>
            </Link>

            <Button
              variant='primary'
              ml='4'
              onClick={() => alert('Not implemented yet.')}
            >
              + Deposit
            </Button>
          </Flex>
        </Flex>
      </Container>

      <Container as='main' flex='1' pt='4'>
        <Flex>
          <Box width={[1, 4 / 6, 1]}>
            {status === 'loading' && (
              <Box
                width='100%'
                height='100%'
                bg='blue'
                borderRadius='12px'
              ></Box>
            )}

            {status === 'rejected' && <Text>Failed...</Text>}

            {status === 'fulfilled' && (
              <Events
                account={account}
                events={events}
                categories={categories}
                selectBet={selectBet}
              />
            )}
          </Box>

          <Box
            position={['fixed', 'static', 'static']}
            top={[0, '5', '5']}
            left='0'
            display={[bet ? 'block' : 'none', 'block', 'block']}
            width={[1, 2 / 6, 2 / 6]}
            maxWidth={['none', '280px', '280px']}
            height={['100%', '400px', '400px']}
            ml={[0, '5', '5']}
            p='3'
            pb='4'
            bg='blue'
            borderRadius='12px'
          >
            <PlaceBet
              events={events}
              categories={categories}
              selectedBet={bet}
              removeBet={removeSelectedBet}
              removeBetEvent={removeSelectedBetEvent}
              changeBetStake={handleChangeBetStake}
              placeBet={handleClickPlaceBet}
            />
          </Box>
        </Flex>
      </Container>

      <Container as='footer' height='68px' mt='6'>
        <Flex justifyContent='center' alignItems='center' height='100%'>
          <Text
            as='a'
            href='https://codeminer42.com'
            target='_blank'
            rel='noopener noreferrer'
            color='white'
            fontSize='4'
          >
            Codeminer42
          </Text>
        </Flex>
      </Container>
    </>
  )
}

export default Home
