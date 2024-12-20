import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown, IoMdMenu } from "react-icons/io";
import { useSession } from "../../customHooks/useSession";
import { useClick } from "../../customHooks/useClick";

interface MenuItem {
  id: string;
  content: string;
  navigate?: string;
  classes: string;
  subItems: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  content: string;
  subnavigate: string;
}

export const List2: React.FC = () => {
  const { getValue } = useSession();
  const { handleNavListItem } = useClick();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0 ? "hidden" : "block"}`,
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
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0 ? "block" : "hidden"}`,
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
        classes : `${getValue() && getValue().level || getValue() && getValue().level === 0 ? "hidden" : "block"}`,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative" ref={navRef}>
      {/* Hamburger Icon for smaller screens */}
      <div className="flex justify-between items-center w-full md:hidden p-[9px]">
        <button onClick={toggleMenu}>
          <IoMdMenu size={30} />
        </button>
      </div>

      {/* List - hidden on smaller screens unless menu is open */}
      <ul
        className={`${isMenuOpen ? "block" : "hidden"
          } md:hidden rounded-md shadow-chart bg-white absolute top-full left-[1px] z-[5000] h-auto flex-col md:flex-row justify-start items-center text-[10px] md:text-[13px] lg:text-[13px] font-semibold`}
      >
        {items.map(({ id, content, subItems, navigate, classes }, index) => (
          <li
            onClick={() =>
              id === "dashboard" ? handleNavListItem(navigate || "", id) : null
            }
            className={`p-5 ${index === 0 ? "" : "border-l"
              } ${classes} group relative flex justify-start items-center gap-1 cursor-pointer border-b border-gray-200`}
            id={id}
            key={id}
          >
            <span>{content}</span>
            {/* {subItems.length > 0 && (
              <IoMdArrowDropdown className="text-[rgb(195,195,195)]" size={20} />
            )} */}

            {subItems.length > 0 && (
              <ul
                className={`flex justify-start items-center gap-1 flex-col p-1 w-[130px] absolute opacity-0
                     z-[-1] translate-x-3  group-hover:flex  group-hover:z-[10000]
                     group-hover:translate-x-0 group-hover:opacity-[1] duration-150 bg-white
                      shadow-chart left-full top-[13px] 
                      before:absolute before:content-"" before:bg-white before:w-2 before:h-2 
                      before:-left-1 before:top-2 before:rotate-45`}
              >
                {subItems.map(({ id, content, subnavigate }, index) => (
                  <li
                    onClick={() => handleNavListItem(subnavigate, id)}
                    id={id}
                    className={`cursor-pointer w-full p-2 ${index === subItems.length - 1 ? "" : "border-b"
                      }`}
                    key={id}
                  >
                    {content}
                   
                  </li>
                ))}
              </ul>
            )}
       
          </li>
        ))}
      </ul>
    </div>
  );
};