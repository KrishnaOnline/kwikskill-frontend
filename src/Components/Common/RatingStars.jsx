import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im'

const RatingStars = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="rating-stars flex gap-[1px]">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;

        if (starValue <= fullStars) {
          return <ImStarFull key={starValue} className="star full text-yellow-400" />;
        } else if (starValue === fullStars + 1 && hasHalfStar) {
          return <ImStarHalf key={starValue} className="star half text-yellow-400" />;
        } else {
          return <ImStarEmpty key={starValue} className="star empty text-yellow-400" />;
        }
      })}
    </div>
  );
};

export default RatingStars





/*
import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    const wholeStars = Math.floor(Review_Count) || 0
    SetStarCount({
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
    })
  }, [Review_Count])
  return (
    <div className="flex gap-1 text-yellow-100">
      {[...new Array(starCount.full)].map((_, i) => {
        return <TiStarFullOutline key={i} size={Star_Size || 20} />
      })}
      {[...new Array(starCount.half)].map((_, i) => {
        return <TiStarHalfOutline key={i} size={Star_Size || 20} />
      })}
      {[...new Array(starCount.empty)].map((_, i) => {
        return <TiStarOutline key={i} size={Star_Size || 20} />
      })}
    </div>
  )
}

export default RatingStars
*/