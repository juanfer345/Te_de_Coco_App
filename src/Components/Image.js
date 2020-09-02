import React from "react";

export const Image = ({style,src}) => {
  console.log(style.size)

  return (
    <img src={src} style={style} />
  )
}
