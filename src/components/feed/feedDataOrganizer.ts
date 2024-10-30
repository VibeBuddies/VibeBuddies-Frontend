import getAllFriends from "../../api/getAllFriendsApi"
import getAllVibeChecksById from "../../api/getAllVibeChecksByIdApi"
import getAllVibeChecksByUsername from "../../api/getAllVibeChecksForSelfApi"

const organizeData = async (username: string) => {
  try {
    //initialize an array and then fetch the user's own vibe checks by their username
    let userVibeChecks = []
    try {
      const userVibeChecksResponse = await getAllVibeChecksByUsername(username)
      userVibeChecks = userVibeChecksResponse.data.returnedVibeChecks || [] //incase no vibechecks
    } catch (error) {
      console.log(`${username} has no vibeChecks: `, error)
    }

    try {
      //fetch the users' friends' vibeChecks
      const friends = await getAllFriends()
      const friendsIdList = friends.data.friendList.map(
        (friend: any) => friend.userId
      )

      //getting all vibeChecks for each friend
      const allVibeChecksPromises = friendsIdList.map(
        async (userId: string) => {
          try {
            const response = await getAllVibeChecksById(userId)
            return response.data.returnedVibeChecks || [] //incase no vibechecks
          } catch (error) {
            console.log(`${userId} has no vibeChecks to fetch: `, error)
            return []
          }
        }
      )
      const allVibeChecksResponses = await Promise.all(allVibeChecksPromises)

      //combine lists of vibeChecks
      let vibeCheckList = [...userVibeChecks, ...allVibeChecksResponses.flat()]

      //sort list by timestamp
      vibeCheckList = vibeCheckList.sort((a, b) => b.timestamp - a.timestamp)
      return vibeCheckList
    } catch (err) {
      console.log("failed to get all friend/ user may not have friends", err)
      userVibeChecks = userVibeChecks.sort(
        (a: any, b: any) => b.timestamp - a.timestamp
      )
      return userVibeChecks
    }
  } catch (error) {
    console.error("Error fetching vibe checks: ", error)
    return []
  }
}

export default organizeData
