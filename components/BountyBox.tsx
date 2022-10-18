import React from "react"
import type { NextPage } from "next"
import { Table } from "@web3uikit/core"
import { Moralis } from "moralis-v1/types"
import bountyAbi from "../constants/BountyFactory.json"
import contractAddresses from "../constants/networkMapping.json"
import { useWeb3Contract } from "react-moralis"
// import * as dotenv from "dotenv"
// require("dotenv").config({ path: "../.env" })

interface BountyBoxProps {
    bounties: any[]
}

const chainId = process.env.chainId || "31337"

let id = chainId ? "31337" : chainId.toString()

const BountyBox: NextPage<BountyBoxProps> = ({ bounties }: BountyBoxProps) => {
    const bountyAddress = contractAddresses[chainId]["BountyFactory"][0]
    console.log("contractAddresses", contractAddresses, bountyAddress)
    const { runContractFunction: claimBounty } = useWeb3Contract({
        abi: bountyAbi,
        contractAddress: bountyAddress,
        functionName: "claimBounty",
        params: {},
    })
    return (
        <div>
            <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                data={bounties}
                isColumnSortable={[false, true, false, false]}
                maxPages={3}
                // eslint-disable-next-line react/jsx-key
                header={[
                    // eslint-disable-next-line react/jsx-key
                    <span>ID</span>,
                    // eslint-disable-next-line react/jsx-key
                    <span>Name</span>,
                    // eslint-disable-next-line react/jsx-key
                    <span>Price in ETH</span>,
                    // eslint-disable-next-line react/jsx-key
                    <span>Status</span>,
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
