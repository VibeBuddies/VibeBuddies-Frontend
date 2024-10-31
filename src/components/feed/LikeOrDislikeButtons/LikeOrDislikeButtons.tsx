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
//Component for like or dislike toggle buttons and its logic
export default function LikeOrDislikeButtons({
  vibe_check_id,
  likePressed,
  dislikePressed,
  onLikePress,
  onDislikePress,
  likes,
  dislikes,
}: LikeOrDislikeButtonsProps) {

  return (
    <ToggleButtonGroup
      exclusive
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
