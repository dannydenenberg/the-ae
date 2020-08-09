import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'

const PeopleQuery = gql`
  query PeopleQuery {
    people {
      id
      name
      status
    }
  }
`

const Index = () => {
  const {
    data: { people }
  } = useQuery(PeopleQuery)

  console.log(people)

  return (
    <div>
      <div>one sec <Link href='/about'><a>man...</a></Link></div>

      <ul>
        {people.map(person => {
          return (
            <li key={person.id}>
              {person.name} is <strong>{person.status}</strong>
              <code> ({person.id})</code>
            </li>
          )
        })}
      </ul>
    </div>
  )
  // return (
  //   <div>
  //     You're signed in as {person.name} and you're {person.status} goto{' '}
  //     <Link href="/about">
  //       <a>static</a>
  //     </Link>{' '}
  //     page.
  //   </div>
  // )
}

export async function getServerSideProps () {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: PeopleQuery
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}

export default Index
