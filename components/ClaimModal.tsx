import React from "react"
import { Button, Input, Modal, Typography } from "@web3uikit/core"
import { useState } from "react"
import bountyAbi from "../constants/BountyFactory.json"
import contractAddresses from "../constants/networkMapping.json"
import { useWeb3Contract } from "react-moralis"

//Expose props to claimButton
//handle contract function call here so we dont send data back up to the parent
// close modal after save... dont use Button ... use sendTransaction
interface ClaimModalProps {
    isVisible: boolean
    bountyId: number
    onClose: () => void
}

const ClaimModal = ({ isVisible, bountyId, onClose }: ClaimModalProps) => {
    const [secretKey, setSecretKey] = useState("")
    const chainId: string = process.env.chainId || "31337"
    const bountyAddress = contractAddresses[chainId]["BountyFactory"][0]
    const { runContractFunction: claimBounty } = useWeb3Contract({
        abi: bountyAbi,
        contractAddress: bountyAddress,
        functionName: "claimBounty",
        params: { _bountyId: bountyId, _secretKey: secretKey },
    })

    return (
        <div>
            <Modal
                cancelText="Discard Changes"
                id="regular"
                isVisible={isVisible}
                okText="Save Changes"
                onCancel={function noRefCheck() {}}
                onCloseButtonPressed={onClose}
                onOk={function noRefCheck() {}}
                title={
                    <div style={{ display: "flex", gap: 10 }}>
                        <Typography color="#68738D" variant="h3">
                            Secret Key
                        </Typography>
                    </div>
                }
            >
                <div
                    style={{
                        padding: "20px 0 20px 0",
                    }}
                >
                    {secretKey}
                    <Input
                        label="Please enter the secret key"
                        width="100%"
                        onChange={(event) => {
                            setSecretKey(event.target.value)
                        }}
                        value={secretKey}
                    />
                </div>
                <div>
                    <Button
                        text="Claim"
                        onClick={() =>
                            claimBounty({
                                onError(error) {
                                    console.log("Errors", error)
                                },
                            })
                        }
                    />
                </div>
            </Modal>
        </div>
    )
}

export default ClaimModal
