import getAllVibeChecks from "../../../api/getAllVibeChecksApi"

const organizeData = async () => {
  try {
    let allVibeChecks = []
    const vibeChecks = await getAllVibeChecks()
    allVibeChecks = vibeChecks.data.returnedVibeChecks
    allVibeChecks = allVibeChecks.sort(
      (a: any, b: any) => b.timestamp - a.timestamp
    )
    return allVibeChecks
  } catch (err) {
    console.log("failled to retrieve all vibechecks: ", err)
  }
}

export default organizeData
