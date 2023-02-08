import React from "react"
import { Button, Input, Modal, Typography, useNotification } from "web3uikit"
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
    const dispatch = useNotification()
    const [secretKey, setSecretKey] = useState("")
    const chainId: string = process.env.chainId || "31337"
    const bountyAddress = contractAddresses[chainId]["BountyFactory"][0]

    const { runContractFunction: claimBounty } = useWeb3Contract({
        abi: bountyAbi,
        contractAddress: bountyAddress,
        functionName: "claimBounty",
        params: { _bountyId: bountyId, _secretKey: secretKey },
    })

    const handleClaimBountySuccess = () => {
        dispatch({
            type: "success",
            message: "Claimed Bounty Successfully",
            title: "Claimed Bounty - please refresh",
            position: "topR",
        })
        onClose && onClose()
    }

    return (
        <div>
            <Modal
                key={bountyId}
                cancelText="Cancel"
                id="regular"
                isVisible={isVisible}
                okText="Claim Bounty"
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                onOk={() =>
                    claimBounty({
                        onError(error) {
                            console.log("Errors", error)
                        },
                        onSuccess: handleClaimBountySuccess,
                    })
                }
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
                {/* <div>
                    <Button
                        text="Claim"
                        onClick={() =>
                            claimBounty({
                                onError(error) {
                                    console.log("Errors", error)
                                },
                                onSuccess: handleClaimBountySuccess,
                            })
                        }
                    />
                </div> */}
            </Modal>
        </div>
    )
}

export default ClaimModal
