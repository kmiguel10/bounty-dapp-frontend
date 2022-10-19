// Create a new table called "ActiveItem"
// Add items when they are posted
// Remove the, when they are claimed

//everytime a new bounty is created, run a function -- which is to add to the ActiveItem list
Moralis.Cloud.afterSave("CreateBounty", async (request) => {
    //Every event gets triggered twice, once on unconfirmed, and again on confirmed
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("Looking for confirmed Tx. . . ")

    if (confirmed) {
        logger.info("Fount item!")
        const ActiveItem = Moralis.Object.extend("ActiveItem") //Create the table

        //Add new activeItem
        const activeItem = new ActiveItem()
        activeItem.set("bountyId", request.object.get("uid"))
        activeItem.set("bountyName", request.object.get("name"))
        activeItem.set("bountyPrice", request.object.get("price"))
        activeItem.set("bountyStatus", request.object.get("status"))

        logger.info(
            `Adding bounty: ${request.object.get("uid")} Name: ${request.object.get("name")}`
        )
        logger.info("Saving. . . ")
        await activeItem.save()
    }
})

//Everytime a bounty is claimed, remove that item from ActiveItem table
Moralis.Cloud.afterSave("ClaimBounty", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("Looking for confirmed Tx . . .")

    // event ClaimBounty(
    //     uint256 indexed id,
    //     address indexed owner,
    //     string name,
    //     uint256 price,
    //     bool status
    // );

    if (confirmed) {
        //get ActiveItem table
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.Query(ActiveItem)
        query.equalTo("bountyId", request.object.get("uid"))
        query.equalTo("bountyPrice", request.object.get("price"))
        query.equalTo("bountyName", request.object.get("name"))
        logger.info(`Bounty | Query: ${query}`)
        const claimedBounty = await query.first()
        logger.info(`Bounty | claimedBounty: ${JSON.stringify(claimedBounty)}`)
        if (claimedBounty) {
            logger.info(`Deleting claimed bounty ${claimedBounty.id}`)
            await claimedBounty.destroy()
            logger.info(
                `Deleting claimedBounty ${request.object.get(
                    "uid"
                )} from ActiveItem table since it was claimed.`
            )
        }
    } else {
        logger.info(`No bounty with id: ${request.object.get("uid")} to delete`)
    }
})
