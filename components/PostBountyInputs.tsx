import React from "react"
import { Input, Button } from "web3uikit"
import { useState } from "react"
import bountyAbi from "../constants/BountyFactory.json"
import contractAddresses from "../constants/networkMapping.json"
import { useWeb3Contract } from "react-moralis"
import type { NextPage } from "next"
import { ethers } from "ethers"

const PostBountyInputs: NextPage = () => {
    const [bountyName, setBountyName] = useState("")
    const [bountyPrice, setBountyPrice] = useState("")

    const chainId: string = process.env.chainId || "31337"
    const bountyAddress = contractAddresses[chainId]["BountyFactory"][0]

    const { runContractFunction: postBounty } = useWeb3Contract({
        abi: bountyAbi,
        contractAddress: bountyAddress,
        functionName: "postBounty",
        msgValue: bountyPrice,
        params: { _name: bountyName },
    })

    return (
        <div>
            <h1>PostBountyInputs</h1>

            <br />
            <div>
                <Input
                    label="Bounty Name"
                    name="Bounty Name"
                    onBlur={function noRefCheck() {}}
                    onChange={(event) => {
                        setBountyName(event.target.value)
                    }}
                    type="text"
                    value={bountyName}
                />
                {bountyName}
            </div>
            <br />
            <div>
                <Input
                    label="Bounty Price"
                    name="Bounty Price"
                    onBlur={function noRefCheck() {}}
                    onChange={(event) => {
                        const etherVal = ethers.utils.parseEther(event.target.value)

                        // const etherInt = ethers.BigNumber.from(etherVal).toNumber()
                        setBountyPrice(etherVal.toString())
                        console.log(etherVal, bountyPrice)
                    }}
                    value={bountyPrice}
                />
                {bountyPrice}
            </div>
            <br />
            <div>
                <Button
                    text="Post Bounty"
                    onClick={() =>
                        postBounty({
                            // onComplete: () => console.log("COMPLETE"),
                            onError(error) {
                                console.log("Errors", error)
                            },
                        })
                    }
                />
            </div>
        </div>
    )
}

export default PostBountyInputs
