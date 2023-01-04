import React from "react"
import { Input, Button, useNotification } from "web3uikit"
import { useState } from "react"
import bountyAbi from "../constants/BountyFactory.json"
import contractAddresses from "../constants/networkMapping.json"
import { useWeb3Contract } from "react-moralis"
import { BigNumber, ethers } from "ethers"

const PostBountyInputs = () => {
    const dispatch = useNotification()
    const [bountyName, setBountyName] = useState("")
    const [bountyPrice, setBountyPrice] = useState<string | undefined>()

    const chainId: string = process.env.chainId || "5"
    const bountyAddress = contractAddresses[chainId]["BountyFactory"][0]

    const { runContractFunction: postBounty } = useWeb3Contract({
        abi: bountyAbi,
        contractAddress: bountyAddress,
        functionName: "postBounty",
        msgValue: ethers.utils.parseEther(bountyPrice || "0").toString(),
        params: { _name: bountyName },
    })

    const handlePostBountySuccess = () => {
        dispatch({
            type: "success",
            message: "Posted Bounty Successfully",
            title: "Posted Bounty - please refresh",
            position: "topR",
        })
        //reset inputs
        setBountyName("")
        setBountyPrice("")
    }

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
                        setBountyPrice(event.target.value)
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
                            onSuccess: () => handlePostBountySuccess(),
                        })
                    }
                />
            </div>
        </div>
    )
}

export default PostBountyInputs
