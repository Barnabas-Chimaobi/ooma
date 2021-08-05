import React, {useEffect, useState} from 'react';
// import { useDispatch } from 'react-redux'
// import {getMenuItemsByBranch} from "../../../../FetchData"
// import {getMenuItemsForYou} from "../../../../reducers/MoreForYouMenu"
// import {getMenuItemsPlanForYou} from "../../../../reducers/MenuPlansForYou"
// import {getGlutenMenuItems} from "../../../../reducers/GlutenFreeMenu"
// import {getDrinkMenuItems} from "../../../../reducers/DrinkMenu"
// import {getBreakFastMenuItems} from "../../../../reducers/BreakFastMenu"
// import {getMenuItemsHistory} from "../../../../reducers/HistoryMenu"
// import {AppDispatch} from '../../../../store';
// const dispatch: AppDispatch = useDispatch()

// export const getMoreForYouMenuCategory = async(branchID: string, page:number) => {
//     const menuItem =  await getMenuItemsByBranch(branchID, page)
//     menuItem.length = 5
//     console.log(menuItem.length, "wwwww")
//     const removedMenu = menuItem.splice(2, 1)
//      menuItem.splice(0,0, removedMenu)
//     dispatch(getMenuItemsForYou(menuItem))
//   }

//   export const getMenuPlansForYouCategory = async(branchID: string, page:number) => {
//     const menuItem =  await getMenuItemsByBranch(branchID, page)
//     menuItem.length = 5
//     console.log(menuItem.length, "wwwww")
//     const removedMenu = menuItem.splice(3, 1)
//     menuItem.splice(0,0, removedMenu)
//     dispatch(getMenuItemsPlanForYou(menuItem))
//   }

//   export const getGlutenCategory = async(branchID: string, page:number) => {
//     const menuItem =  await getMenuItemsByBranch(branchID, page)
//     menuItem.length = 5
//     console.log(menuItem.length, "wwwww")
//     const removedMenu = menuItem.splice(4, 1)
//     menuItem.splice(0,0, removedMenu)
//     dispatch(getGlutenMenuItems(menuItem))
//   }

//   export const getDrinkCategory = async(branchID: string, page:number) => {
//     const menuItem =  await getMenuItemsByBranch(branchID, page)
//     menuItem.length = 5
//     console.log(menuItem.length, "wwwww")
//     const removedMenu = menuItem.splice(1, 1)
//     menuItem.splice(0,0, removedMenu)
//     dispatch(getDrinkMenuItems(menuItem))
//   }

//   export const getBreakFastCategory = async(branchID: string, page:number) => {
//     const menuItem =  await getMenuItemsByBranch(branchID, page)
//     menuItem.length = 5
//     console.log(menuItem.length, "wwwww")
//     const removedMenu = menuItem.splice(0, 1)
//     menuItem.splice(0,0, removedMenu)
//     dispatch(getBreakFastMenuItems(menuItem))
//   }


//   export const getHistoryCategory = async(branchID: string, page:number) => {
//     const menuItem =  await getMenuItemsByBranch(branchID, page)
//     menuItem.length = 5
//     console.log(menuItem.length, "wwwww")
//     const removedMenu = menuItem.splice(3, 1)
//     menuItem.splice(0,0, removedMenu)
//     dispatch(getMenuItemsHistory(menuItem))
//   }


  