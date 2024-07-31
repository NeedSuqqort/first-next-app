"use client"
import Second from "./Component/Second";
export default function Page(){
  if (typeof window === 'undefined') {
    return(
      <div>
        Loading...
      </div>
    )
  } else {
    console.log(window)
    return(
      <div>
        <Second />
      </div>
    )
  }
}