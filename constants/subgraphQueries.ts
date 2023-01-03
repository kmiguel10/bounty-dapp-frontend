import { useQuery, gql } from "@apollo/client"
// See more example queries on https://thegraph.com/explorer/subgraph/protofire/maker-protocol

const GET_ACTIVE_ITEMS = gql`
    {
        activeBounties(first: 5) {
            id
            owner
            name
            price
        }
    }
`

export default GET_ACTIVE_ITEMS
