import getAllFriends from "../../api/getAllFriendsApi"
import getAllVibeChecksById from "../../api/getAllVibeChecksByIdApi"

const organizeData = async () => {
  try {
    const friends = await getAllFriends()

    // extract userId from each friend and populate friendsIdList
    const friendsIdList = friends.data.friendList.map(
      (friend: any) => friend.userId
    )

    // fetch all vibe checks for friends
    const allVibeChecksPromises = friendsIdList.map(async (userId: string) => {
      try {
        const response = await getAllVibeChecksById(userId)
        return response.data.returnedVibeChecks || [] // Return empty array if no vibe checks
      } catch (error) {
        console.log(` ${userId} has no vibeChecks to fetch: `, error)
        return [] // Return empty array in case of error
      }
    })

    // resolve all promises and clean up the final array
    const allVibeChecksResponses = await Promise.all(allVibeChecksPromises)

    // Combine all vibe checks into one list
    const vibeCheckList = allVibeChecksResponses.flat()

    console.log(vibeCheckList)
    return vibeCheckList
  } catch (error) {
    console.error("Error fetching vibe checks: ", error)
    return []
  }
}

export default organizeData
