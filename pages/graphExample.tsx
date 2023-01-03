/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, gql } from "@apollo/client"

const GET_ACTIVE_ITEM = gql`
    {
        activeBounties(first: 5) {
            id
            owner
            name
            price
        }
    }
`

const graphExample = () => {
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEM)
    console.log(data)
    return <div>TEST</div>
}

export default graphExample
