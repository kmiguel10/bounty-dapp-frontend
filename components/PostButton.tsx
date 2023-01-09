import React from "react"
import { Button } from "@web3uikit/core"
import { useState, useEffect } from "react"
import PostInputsModal from "./PostInputsModal"

interface PostButtonInterface {}

//** Opens up a modal to receive paramters for bounties */
const PostButton = () => {
    //state to handle input modal
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)
    const handlePostButtonClick = () => setShowModal(true)

    return (
        <div>
            <Button text="Post Bounty" onClick={handlePostButtonClick}></Button>
            <PostInputsModal isVisible={showModal} onClose={hideModal} />
        </div>
    )
}

export default PostButton
