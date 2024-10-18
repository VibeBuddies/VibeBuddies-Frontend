import getPendingFriends from "../../../../api/getPendingFriendsApi"

const organizData = async () => {
  try {
    const friendRequests = await getPendingFriends()

    // Log the entire response to check its structure
    console.log("Friend requests response: ", friendRequests)

    // Safely access data and map through friendList if it exists
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
