const Moralis = require("moralis-v1/node")
require("dotenv").config()
const contractAddresses = require("./constants/networkMapping.json")

let chainId = process.env.chainId || "31337"
let moralisChainId = chainId == "31337" ? "1337" : chainId
console.log(moralisChainId)

/** Moralis init code */
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const appId = process.env.NEXT_PUBLIC_APP_ID
const masterKey = process.env.masterKey

async function main() {
    await Moralis.start({ serverUrl, appId, masterKey })
    const contractAddress = contractAddresses[chainId]["BountyFactory"][0]

    console.log(`Working with contract address : ${contractAddress}`)

    let createBountyOptions = {
        chainId: moralisChainId,
        address: contractAddress,
        topic: "CreateBounty(uint256, string, uint256, bool)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "string",
                    name: "name",
                    type: "string",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "price",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "bool",
                    name: "status",
                    type: "bool",
                },
            ],
            name: "CreateBounty",
            type: "event",
        },
        tableName: "CreateBounty",
        sync_historical: true,
    }

    let claimBountyOptions = {
        chainId: moralisChainId,
        address: contractAddress,
        topic: "ClaimBounty(uint256, address, string, uint256, bool)",
        abi: {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "string",
                    name: "name",
                    type: "string",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "price",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "bool",
                    name: "status",
                    type: "bool",
                },
            ],
            name: "ClaimBounty",
            type: "event",
        },
        tableName: "ClaimBounty",
        sync_historical: true,
    }

    const createdResponse = await Moralis.Cloud.run("watchContractEvent", createBountyOptions, {
        useMasterKey: true,
    })

    const claimResponse = await Moralis.Cloud.run("watchContractEvent", claimBountyOptions, {
        useMasterKey: true,
    })

    console.log("Created Response", createdResponse)
    console.log("Claim Response", claimResponse)

    if (createdResponse.success && claimResponse.success) {
        console.log(
            "Updated! You should now be able to see these tables in your database. \n Note: You won't be able to see the events on the `sync` tab of the UI though."
        )
    } else {
        console.log(
            "Something went wrong uploading events... Try manually importing for a better error code. "
        )
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
