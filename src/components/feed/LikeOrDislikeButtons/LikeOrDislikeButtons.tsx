import {useState} from 'react';
import * as React from 'react';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


interface LikeOrDislikeButtonsProps {
  vibe_check_id: string;
  likePressed: boolean;
  dislikePressed: boolean;
  onLikePress: () => void;
  onDislikePress: () => void;
  likes: number;
  dislikes: number;
}

export default function LikeOrDislikeButtons({
  vibe_check_id,
  likePressed,
  dislikePressed,
  onLikePress,
  onDislikePress,
  likes,
  dislikes,
}: LikeOrDislikeButtonsProps) {
  // const [alignment, setAlignment] = useState<string | null>(null);
  // const [likePressed, setLikePressed] = useState<boolean>(false);
  // const [dislikePressed, setDislikePressed] = useState<boolean>(false);
  // const [likesCount, setLikesCount] = useState<number>(initialLikes);
  // const [dislikesCount, setDislikesCount] = useState<number>(initialDislikes);

  // const handleLikePress = () =>{
  //   setLikePressed(prevState => !prevState);
  //   setDislikePressed(false);
  //   sendLike(vibe_check_id);
  // }
  // const handleDislikePress = () => {
  //   setDislikePressed(prevState => !prevState);
  //   setLikePressed(false);
  //   sendDislike(vibe_check_id);
  // }
  // const handleAlignment = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: string | null,
  // ) => {
  //   setAlignment(newAlignment);
  // };

  return (
    <ToggleButtonGroup
      // value={alignment}
      exclusive
      // onChange={handleAlignment}
      aria-label="like or dislike"
    >
      <ToggleButton value="like" aria-label="like button"
      onClick={onLikePress}
      disabled={dislikePressed}>
        {!likePressed ? <ThumbUpOffAltIcon /> : <ThumbUpAltIcon />}
        {likes}
      </ToggleButton>
      <ToggleButton value="dislike" aria-label="dislike button"
        onClick={onDislikePress}
        disabled={likePressed}>
        {dislikes}
        {!dislikePressed ? <ThumbDownOffAltIcon /> : <ThumbDownAltIcon />}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
