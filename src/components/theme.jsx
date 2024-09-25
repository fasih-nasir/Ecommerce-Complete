import { useState } from "react"

function Theme(){
    const [color , setColor] =useState("white")
    document.body.style.backgroundColor = color;
 document.body.style.color="white"
 return(
<>
<button className="" onClick={()=>{setColor("black")}}>black</button>
</>
    )
}
export default Theme