import getAllVibeChecks from "../../../api/getAllVibeChecksApi"

const organizeData = async () => {
  try {
    let allVibeChecks = []
    const vibeChecks = await getAllVibeChecks()
    allVibeChecks = vibeChecks.data.returnedVibeChecks
    allVibeChecks = allVibeChecks.sort(() => Math.random() - 0.5)

    return allVibeChecks
  } catch (err) {
    console.log("failled to retrieve all vibechecks: ", err)
  }
}

export default organizeData
