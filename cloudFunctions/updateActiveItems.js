// Create a new table called "ActiveItem"
// Add items when they are posted
// Remove the, when they are claimed

//const { default: Moralis } = require("moralis-v1")

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
