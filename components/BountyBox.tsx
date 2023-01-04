import React from "react"
import type { NextPage } from "next"
import { Table } from "@web3uikit/core"
import { Moralis } from "moralis-v1/types"
import bountyAbi from "../constants/BountyFactory.json"
import contractAddresses from "../constants/networkMapping.json"
import { useWeb3Contract } from "react-moralis"
import { NotificationProvider } from "web3uikit"
// import * as dotenv from "dotenv"
// require("dotenv").config({ path: "../.env" })

interface BountyBoxProps {
    bounties: bountyInterface[]
    chainId: string
}

interface bountyInterface {
    id: string
    name: string
    owner: string
    price: number
    action: object
}

const BountyBox: NextPage<BountyBoxProps> = ({ bounties, chainId }: BountyBoxProps) => {
    const id = parseInt(chainId)
    const bountyAddress = contractAddresses[id]["BountyFactory"][0]
    console.log("contractAddresses", contractAddresses, bountyAddress)
    const { runContractFunction: claimBounty } = useWeb3Contract({
        abi: bountyAbi,
        contractAddress: bountyAddress,
        functionName: "claimBounty",
        params: {},
    })
    return (
        <div>
            <div>
                id: {id} {bountyAddress}
            </div>
            <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                data={bounties}
                isColumnSortable={[false, true, false, false]}
                maxPages={5}
                // eslint-disable-next-line react/jsx-key
                header={[
                    // eslint-disable-next-line react/jsx-key
                    <span>ID</span>,
                    // eslint-disable-next-line react/jsx-key
                    <span>Name</span>,
                    // eslint-disable-next-line react/jsx-key
                    <span>Owner</span>,
                    // eslint-disable-next-line react/jsx-key
                    <span>Price in ETH</span>,
                    // eslint-disable-next-line react/jsx-key
                    <span>Action</span>,
                ]}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={5}
            />
        </div>
    )
}

export default BountyBox
