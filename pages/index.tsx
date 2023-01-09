import type { NextPage } from "next"
import styles from "../styles/Home.module.css"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import BountyBox from "../components/BountyBox"
import ClaimButton from "../components/ClaimButton"
import { ethers } from "ethers"
import PostBountyInputs from "../components/PostBountyInputs"
import contractAddresses from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import { Button } from "@web3uikit/core"
import PostButton from "../components/PostButton"

interface contractAddressesInterface {
    [key: string]: contractAddressesItemInterface
}

interface contractAddressesItemInterface {
    [key: string]: string[]
}

interface bountyInterface {
    id: string
    name: string
    owner: string
    price: number
    action: object
}

const Home: NextPage = () => {
    const { isWeb3Enabled, chainId } = useMoralis()
    const [page, setPage] = useState(1)

    const addresses: contractAddressesInterface = contractAddresses

    const bountyContractAddress = chainId
        ? addresses[parseInt(chainId!.toString())]["BountyFactory"][0]
        : null

    const bounties: bountyInterface[] = []

    const {
        loading,
        error: subgraphQueryError,
        data: queriedBounties,
    } = useQuery(GET_ACTIVE_ITEMS)

    console.log("Active Bounties", queriedBounties)

    //Get bounties array
    if (!loading || queriedBounties) {
        queriedBounties.activeBounties.map((bounty: bountyInterface) => {
            console.log("Active Bounties inside loop", queriedBounties)
            const item: any = []
            const { id, name, owner, price, action } = bounty

            console.log("bounty", bounty)

            //const priceInEth = ethers.utils.formatUnits(bountyPrice, 18)
            let idString = id.substring(2, 3)
            let idInt = parseInt(idString)
            let priceInEth = ethers.utils.formatEther(price)
            const emptyAddress = ethers.constants.AddressZero
            let bountyClaimed = owner == emptyAddress ? false : true

            item.push(
                idInt,
                name,
                owner,
                priceInEth,
                <ClaimButton key={idInt} bountyId={idInt} disabledFlag={bountyClaimed} />
            )
            bounties.push(item)
            console.log("item", item)
        })
    }

    return (
        <div>
            {isWeb3Enabled ? (
                <div>
                    {" "}
                    <div>Insert Button here</div>
                    <div>
                        <PostButton />
                    </div>
                    <div className={styles.container}>
                        <PostBountyInputs />
                    </div>
                    <div className={styles.container}>
                        {loading || !queriedBounties ? (
                            <div>Loading . . .</div>
                        ) : (
                            // {queriedBounties}
                            <div>
                                {" "}
                                <BountyBox bounties={bounties} chainId={chainId} />
                                {/* <div>{queriedBounties}</div> */}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>Web3 is currently Not Enabled</div>
            )}
        </div>
    )
}

export default Home
