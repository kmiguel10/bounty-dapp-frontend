import { ConnectButton } from "@web3uikit/web3"

export default function Header() {
    return (
        <div>
            <div>
                <h1>Decentralized Bounty Application</h1>
            </div>
            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
