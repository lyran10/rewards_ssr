import React from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { useSession } from "../../customHooks/useSession";
import { useClick } from "../../customHooks/useClick";

export const List = () => {
const { getValue } = useSession()
const {handleNavListItem} = useClick()
const items = [
    {   
        id : "dashboard",
        content : "Dashboard",
        navigate : "dashboard/home",
        classes : "",
        subItems : [],
        subContent : "Home"
    },
    {   
        id : "offers",
        content : "Offers",
        navigate : "offers",
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0  ? "hidden" : "block"}`,
        subItems : [
            {
            id : "addOffers",
            content : "Add Offers",
            subnavigate : "offers/addOffers",
            },
            {
            id : "OfferDetails",
            content : "Offer Details",
            headerContent : "Offers",
            subnavigate : "offers/offerDetails",
            }
        ]
    },
    {   
        id : "shop",
        content : "Shop",
        navigate : "shop",
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0  ? "block" : "hidden"}`,
        subItems : [
            {
            id : "shopDetails",
            content : "Shop Details",
            subnavigate : "shop/shopDetails",
            },
        ]
    },
    {   
        id : "redeem",
        content : "Redeem",
        navigate : "redeem",
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0  ? "hidden" : "block"}`,
        subItems : [
            {
            id : "redeemOffers",
            content : "Redeem Offers",
            subnavigate : "redeem/redeemOffers",
            },
        ]
    },
    {   
        id : "citizen",
        content : "Citizen",
        navigate : "citizen",
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0  ? "block" : "hidden"}`,
        subItems : [
            {
            id : "citizenDetails",
            content : "Citizen Details",
            subnavigate : "citizen/citizenDetails",
            },
        ]
    },
    {   
        id : "claim",
        content : "Claim",
        navigate : "claim",
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0  ? "hidden" : "block"}`,
        subItems : [
            {
                id : "claimOffers",
                content : "Claim Offers",
                subnavigate : "claim/claimOffers",
            },
        ]
    },
    {   
        id : "employee",
        content : "Employee",
        navigate : "employee",
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0  ? "block" : "hidden"}`,
        subItems : [
            {
                id : "employeeDetails",
                content : "Employee Details",
                subnavigate : "employee/employeeDetails",
            },
        ]
    },
    {   
        id : "profile",
        content : "Profile",
        navigate : "profile",
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0  ? "hidden" : "block"}`,
        subItems : [
            {
                id : "profileDetails",
                content : "Profile Details",
                subnavigate : "profile/profileDetails",
            },
        ]
    },
    {   
        id : "grievance",
        content : "Grievance",
        navigate : "grievance",
        classes : `${getValue() && getValue().level === 5  ? "block" : "hidden"}`,
        subItems : [
            {
                id : "grievanceDetails",
                content : "Grievance Details",
                subnavigate : "grievance/grievanceDetails",
            },
        ]
    },
]

  return (
    <ul className='w-full h-full hidden md:flex justify-start items-center text-[10px] md:text-[13px] lg:text-[13px] font-semibold'>
        {
            items.map(({id, content, subItems, navigate, classes}, index) => {
                return(
                    <li onClick={() => id === "dashboard" ? handleNavListItem(navigate, id) : null} className={`h-full p-5 ${index === 0 ? "" : "border-l"} ${classes} group relative flex justify-start items-center gap-1 cursor-pointer`} id={id} key={id}>
                       <span>{content}</span> 
                       {
                        subItems.length ? <IoMdArrowDropdown className='text-[rgb(195,195,195)]' size={20}/> : null
                       }
                       
                       {
                            subItems.length
                            ?
                            <ul className={`flex justify-start items-center gap-1 flex-col p-1 w-[130px] absolute opacity-0 z-[-1] translate-y-3 group-hover:z-[10000] group-hover:translate-y-0 group-hover:opacity-[1] duration-150  bg-white shadow-chart top-[100%] before:absolute before:content-"" before:bg-white before:w-2 before:h-2 ${id === "offers" ? "before:bottom-[95%]" : "before:bottom-[90%]"} before:left-5 before:rotate-45`}>
                                {
                                    subItems.map(({ id, content, subnavigate}, index) => {
                                        return(
                                            <li onClick={() => handleNavListItem(subnavigate, id)} id={id} className={`cursor-pointer w-full p-2 ${index === subItems.length - 1 ? "" : "border-b-[1px]"}`} key={id}>{content}</li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            null
                       }
                    </li>
                )
            })
        }
    </ul>
  )
}
