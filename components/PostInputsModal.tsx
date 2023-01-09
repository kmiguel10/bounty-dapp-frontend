import React from "react"
import { Button, Input, Modal, Typography, useNotification } from "web3uikit"

interface PostBountyModalProps {
    isVisible: boolean
    onClose: () => void
}

const PostInputsModal = ({ isVisible, onClose }: PostBountyModalProps) => {
    return (
        <div>
            <Modal
                key={1}
                cancelText="Cancel"
                id="regular"
                isVisible={isVisible}
                okText="Claim Bounty"
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                onOk={() => ({})}
                title={
                    <div style={{ display: "flex", gap: 10 }}>
                        <Typography color="#68738D" variant="h3">
                            Input Forms
                        </Typography>
                    </div>
                }
            >
                <div></div>
            </Modal>
        </div>
    )
}

export default PostInputsModal
