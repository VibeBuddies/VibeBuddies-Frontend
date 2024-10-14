import React, { useState } from "react"
import { Container, Box } from "@mui/material"
import VibeCheckList from "../components/feed/vibeCheckList"

// Define the shape of the vibeChecks array
interface VibeCheck {
  id: number
  album: string
  review: string
  stars: number
  image: string
}

// mock data to populate the vibeCheckList until we can integrate API connectivity
const initialVibeChecks: VibeCheck[] = [
  {
    id: 1,
    album: "Igor",
    review:
      "Amazing sound, great beats! This is my album of the year Tyler is the GOAT!!! 🐐",
    stars: 4,
    image:
      "https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-igor-album-art-2019-billboard-embed.jpg?w=600",
  },
  {
    id: 2,
    album: "Currents",
    review: "Sick vibes and amazing vocals. 10 outta 10 would recommend!",
    stars: 5,
    image:
      "https://qodeinteractive.com/magazine/wp-content/uploads/2020/06/16-Tame-Impala.jpg",
  },
  {
    id: 3,
    album: "Graduation",
    review: "A certified hip hop classic, Ye in peak form!",
    stars: 4.5,
    image:
      "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
  },
  {
    id: 4,
    album: "Blonde",
    review:
      "Emotional, raw, and beautiful. Frank Ocean delivers a masterpiece that grows on you with each listen.",
    stars: 5,
    image:
      "https://ih1.redbubble.net/image.2836713419.5990/aps,504x498,small,transparent-pad,600x600,f8f8f8.jpg",
  },
  {
    id: 5,
    album: "To Pimp a Butterfly",
    review:
      "A cultural landmark. Kendrick Lamar’s storytelling and musicality are second to none.",
    stars: 5,
    image:
      "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/11/1426099817173/f1efb3f4-9a6d-4f78-8ca8-594ab646d198-bestSizeAvailable.jpeg?width=465&dpr=1&s=none",
  },
  {
    id: 6,
    album: "Abbey Road",
    review:
      "Timeless classic. The Beatles at their very best with unmatched creativity and sound.",
    stars: 5,
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
  },
  {
    id: 7,
    album: "Good Kid, M.A.A.D City",
    review:
      "One of the best concept albums of the last decade. Lamar’s lyrical skills shine on every track.",
    stars: 4.8,
    image: "https://i.scdn.co/image/ab67616d0000b273d58e537cea05c2156792c53d",
  },
  {
    id: 8,
    album: "A Moon Shaped Pool",
    review:
      "Radiohead delivers an atmospheric, hauntingly beautiful album. A true art piece.",
    stars: 4.5,
    image: "https://upload.wikimedia.org/wikipedia/en/6/6a/Amoonshapedpool.png",
  },
  {
    id: 9,
    album: "Channel Orange",
    review:
      "A genre-defying album with soulful beats and poetic lyrics. Frank Ocean set a high bar with this.",
    stars: 4.7,
    image: "https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg",
  },
  {
    id: 10,
    album: "DAMN.",
    review:
      "Another masterpiece by Kendrick Lamar. Packed with raw emotion, political undertones, and incredible beats.",
    stars: 4.9,
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png",
  },
  {
    id: 11,
    album: "Random Access Memories",
    review:
      "Daft Punk’s tribute to disco, funk, and their roots. Stunning production and unforgettable tracks.",
    stars: 4.5,
    image:
      "https://media.pitchfork.com/photos/63f641d801dbe796fab80055/1:1/w_320,c_limit/Daft-Punk-Random-Access-Memories.jpg",
  },
  {
    id: 12,
    album: "My Beautiful Dark Twisted Fantasy",
    review:
      "Kanye’s magnum opus. Incredible production and lyrical content. A game-changer for hip-hop.",
    stars: 5,
    image: "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f",
  },
]

const Feed: React.FC = () => {
  const [vibeChecks] = useState<VibeCheck[]>(initialVibeChecks)

  return (
    <Container maxWidth="sm" sx={{ display: "flex", position: "relative" }}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Scrollable VibeCheckList */}
        <Box
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            pt: 8,
          }}
        >
          <VibeCheckList vibeChecks={vibeChecks} />
        </Box>
      </Box>
    </Container>
  )
}

export default Feed
