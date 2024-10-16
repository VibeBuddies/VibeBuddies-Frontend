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
    const allVibeChecksPromises = friendsIdList.map((userId: string) =>
      getAllVibeChecksById(userId)
    )

    // resolve all promises and cleans up the final array
    const allVibeChecksResponses = await Promise.all(allVibeChecksPromises)
    const vibeCheckList = allVibeChecksResponses.flatMap(
      (response) => response.data.returnedVibeChecks
    )

    return vibeCheckList
  } catch (error) {
    console.error("Error fetching vibe checks: ", error)
    return []
  }
}

export default organizeData
