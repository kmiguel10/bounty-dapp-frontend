import React from "react"
import { Button } from "@web3uikit/core"
import { useState, useEffect } from "react"
import ClaimModal from "./ClaimModal"

//What does ClaimBounty need? function claimBounty(uint256 _bountyId, uint256 _secretKey)
//pass down bountyId from parent as prop
// secret key is from user input
interface ClaimButtonProp {
    bountyId: number
}

const ClaimButton = ({ bountyId }: ClaimButtonProp) => {
    //State to handle claim modal
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)
    const handleClaimButtonClick = () => setShowModal(true)

    return (
        <div>
            {bountyId}
            <Button text="Claim" onClick={handleClaimButtonClick}></Button>
            <ClaimModal isVisible={showModal} bountyId={bountyId} onClose={hideModal} />
        </div>
    )
}

export default ClaimButton
