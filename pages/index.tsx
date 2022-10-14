import type { NextPage } from "next"
import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import { useState } from "react"
import BountyBox from "../components/BountyBox"
import { Table } from "@web3uikit/core"
import Moralis from "moralis-v1/types"
import Button from "../components/ClaimButton"
import { ethers } from "ethers"

const Home: NextPage = () => {
    const { isWeb3Enabled } = useMoralis()
    const [page, setPage] = useState(1)
    const { data: activeBounties, isFetching: fetchingActiveBounties } = useMoralisQuery(
        //TableName
        //Function for the Query
        "ActiveItem",
        (query) => query.limit(10).descending("uid")
    )

    const bounties: any[] = []

    console.log("Active Bounties", activeBounties)

    //Get bounties array
    activeBounties.map((bounty) => {
        const item: any = []
        console.log(bounty.attributes)
        const { bountyId, bountyName, bountyPrice, bountyStatus } = bounty.attributes

        const priceInEth = ethers.utils.formatUnits(bountyPrice, 18)

        item.push(bountyId, bountyName, priceInEth, bountyStatus.toString(), <Button />)
        bounties.push(item)
    })

    console.log("bounties", bounties)

    return (
        <div>
            <div className={styles.container}>
                {fetchingActiveBounties ? (
                    <div>Loading . . .</div>
                ) : (
                    // activeBounties.map((bounty) => {
                    //     console.log(bounty.attributes)
                    //     const { bountyId, bountyName, bountyPrice, bountyStatus } =
                    //         bounty.attributes
                    //     return (
                    //         <div key={bountyId}>
                    //             <BountyBox
                    //                 bountyId={bountyId}
                    //                 bountyName={bountyName}
                    //                 bountyPrice={bountyPrice}
                    //                 bountyStatus={bountyStatus}
                    //             />

                    //         </div>
                    //     )
                    // })
                    <BountyBox bounties={bounties} />
                )}
            </div>
            {/* <div>
                <Table
                    columnsConfig="80px 3fr 2fr 2fr 80px"
                    data={bounties}
                    isColumnSortable={[true, false, false]}
                    maxPages={3}
                    // eslint-disable-next-line react/jsx-key
                    header={[<span>ID</span>, <span>Name</span>, <span>Price</span>]}
                    onPageNumberChanged={function noRefCheck() {}}
                    onRowClick={function noRefCheck() {}}
                    pageSize={5}
                />
            </div> */}
        </div>
    )
}

export default Home
