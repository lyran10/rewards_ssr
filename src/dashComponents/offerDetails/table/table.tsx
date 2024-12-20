import React from 'react'
import { TableBody } from "./tableBody"
import { TableHead } from "./tableHead"
import { useLocation } from 'react-router-dom'

type Props = {
    displayHeader : () => JSX.Element[]
    displayBody : () => any
}

export const Table = ({displayHeader, displayBody} : Props) => {
  const location = useLocation()

  return (
    <div id={"table-to-xlsx"} className={`w-[100%] overflow-x-scroll overflow-y-scroll h-[400px] md:h-full text-start px-2 rounded-md bg-white`}>
     <table className={`${location.pathname.split("/")[4] === "grievanceDetails" ? "w-[150%]" : "w-[100%]"} text-[12px]`}>
      <TableHead displayHeader={displayHeader}/>
      <TableBody displayBody={displayBody}/>
    </table>
    </div>
 
  )
}
