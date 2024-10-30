import getPendingFriends from "../../../../api/getPendingFriendsApi"

/**
 *
 * organizes the data for the notification list
 * sends a request to gePendingFriends and then returns
 * the pending friends for the user
 */

const organizData = async () => {
  try {
    const friendRequests = await getPendingFriends()
    const simplifiedFriendRequests = friendRequests?.data?.friendList?.map(
      (friend: any) => ({
        username: friend.username,
        userId: friend.userId,
      })
    )

    return simplifiedFriendRequests
  } catch (err) {
    console.log("Failed to retrieve friend requests: ", err)
  }
}

export default organizData
