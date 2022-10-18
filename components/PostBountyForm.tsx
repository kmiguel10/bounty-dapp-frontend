import React from "react"
import { Form } from "@web3uikit/core"
import type { NextPage } from "next"
import { useWeb3Contract } from "react-moralis"
import BountyBox from "./BountyBox"
import bountyAbi from "../constants/BountyFactory.json"
import contractAddresses from "../constants/networkMapping.json"
import { useState } from "react"
import { ethers } from "ethers"

const PostBountyForm: NextPage = () => {
    const bountyName: string = "test2"
    const price = ethers.utils.parseEther("1")
    //const bountyPrice: number = 1
    const chainId = process.env.chainId || "31337"
    const bountyAddress = contractAddresses[chainId]["BountyFactory"][0]

    const [bountyPrice, setBountyPrice] = useState(0)

    const handleSubmit = (name: string, price: number) => {
        console.log("Print name and price", name, price)
    }

    const { runContractFunction: postBounty } = useWeb3Contract({
        abi: bountyAbi,
        contractAddress: bountyAddress,
        functionName: "postBounty",
        msgValue: bountyPrice,
        params: { _name: bountyName },
    })

    // const handlePost = () => {
    //     { onError } = postBounty(bountyName)
    // }

    return (
        <div>
            <div>
                {bountyName}
                {bountyPrice}
                <Form
                    title="Post Bounty"
                    data={[
                        {
                            name: "Bounty Name",
                            type: "text",
                            validation: {
                                required: true,
                            },
                            value: bountyName,
                        },
                        {
                            name: "Bounty Price",
                            type: "number",
                            validation: {
                                required: true,
                            },
                            value: bountyPrice,
                        },
                    ]}
                    buttonConfig={{
                        onClick: function noRefCheck() {},
                        theme: "primary",
                    }}
                    onSubmit={() =>
                        postBounty({
                            // onComplete: () => console.log("COMPLETE"),
                            onError(error) {
                                console.log("Errors", error)
                            },
                        })
                    }
                    id={""}
                />
            </div>
        </div>
    )
}

export default PostBountyForm
