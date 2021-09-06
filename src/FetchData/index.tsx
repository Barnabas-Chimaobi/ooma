import api from '../api';
import {data} from '../features/App/MyCart/myCartIntro/introData';
import {AppDispatch} from '../store';
import {useDispatch} from 'react-redux';
import {cartSlice, cartStates} from '../reducers';
// const dispatch: AppDispatch = useDispatch();

export const getRegion = async () => {
  try {
    const regionData = await api.get('/utils/region');
    const allRegion = regionData?.data?.data?.data?.rows || [];
    // console.log(allRegion, 'allRegionnnnn');
    return allRegion;
  } catch (error) {
    console.log(error);
  }
};

export const getBranches = async (regionId: number) => {
  try {
    const branchData = await api.get(
      `/branches/getbyregion?regionId=${regionId}`,
    );
    const allBranches = branchData?.data?.data?.data?.rows || [];
    // console.log(allBranches, 'allbranchesss');
    return allBranches;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuItemsByBranch = async (branchId: string, page: number) => {
  try {
    const menuData = await api.get(
      `/menuitems?branchId=${branchId}&page=${page}`,
    );
    const allMenuItemsByBranch = menuData?.data?.data?.items;
    // console.log(allMenuItemsByBranch, 'allmenuitemmmss=======================');
    return allMenuItemsByBranch;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuItemsSpecialOffer = async (
  branchId: string,
  page: number,
) => {
  try {
    const menuData = await api.get(
      `/menuitems/filter?branchId=${branchId}&page=${page}&category=SPECIAL_OFFER`,
    );
    const allMenuItemsSpecialOffer = menuData?.data?.data.items;
    // console.log(allMenuItemsSpecialOffer, 'allmenuitemspecaloffer');
    return allMenuItemsSpecialOffer;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuItemsNew = async (branchId: string, page: number) => {
  console.log(page, 'paggeee');
  try {
    const menuData = await api.get(
      `/menuitems/filter?branchId=${branchId}&page=${page}&category=NEW`,
    );
    const allMenuItemsNew = menuData?.data?.data.items;
    // console.log(allMenuItemsNew, 'allmenuitemsnew');
    return allMenuItemsNew;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuItemsPopular = async (branchId: string, page: number) => {
  try {
    const menuData = await api.get(
      `/menuitems/filter?branchId=${branchId}&page=${page}&category=POPULAR`,
    );
    const allMenuItemsPopular = menuData?.data?.data.items;
    // console.log(allMenuItemsPopular, 'allMenuItemsPopular');
    return allMenuItemsPopular;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuItemsCategories = async (branchId: string) => {
  try {
    const menuData = await api.get(`/menuitems/categories`);
    const allMenuItemsCategories = menuData?.data?.data;
    // console.log(allMenuItemsCategories, 'allMenuItemsCategories');
    return allMenuItemsCategories;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllMenuItemCategory = async (branchId: string) => {
  try {
    const menuItemCategory = await api.get(
      `/menuitems/categories?branchId=${branchId ? branchId : branchId}`,
    );
    const MenuItemCategories = menuItemCategory?.data?.data?.rows;
    // console.log(MenuItemCategories, 'MenuItemCategories');
    return MenuItemCategories;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetAllMenuPlanCategory = async (branchId: string) => {
  try {
    const menuPlanCategory = await api.get(
      `menuplans/categories/${branchId ? branchId : branchId}`,
    );
    const MenuPlanCategories = menuPlanCategory?.data?.data?.data?.rows;
    console.log(MenuPlanCategories, 'MenuPlanCategories');
    return MenuPlanCategories;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const SearchMenuItemByCategoryId = async (
  categoryId: number,
  page: number,
) => {
  try {
    const menuItemByCategory = await api.get(
      `menuitems/search?categoryId=${categoryId}&page=${page}`,
    );
    const MenuItemByCategoriesId = menuItemByCategory?.data;
    // console.log(MenuItemByCategoriesId, 'MenuItemByCategoriesId');
    return MenuItemByCategoriesId;
  } catch (error) {
    console.log(error);
  }
};

export const SearchMenuItemAndMenuPlan = async (
  name: string,
  branchId: string,
) => {
  try {
    const menuItemAndMenuPlan = await api.get(
      `explore?name=${name}&branchId=${branchId}`,
    );
    const MenuItemAndPlan = menuItemAndMenuPlan?.data;
    // console.log(MenuItemAndPlan, 'MenuItemByCategoriesId');
    return MenuItemAndPlan;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuItemsById = async (itemId: string) => {
  try {
    const singleMenuData = await api.get(`/menuitems/${itemId}/detail`);
    const menuItem = singleMenuData?.data?.data;
    // console.log(menuItem, 'menuItem');
    return menuItem;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuPlansByBranch = async (branchId: string, page: number) => {
  try {
    const MenuPlansData = await api.get(
      `/menuplans/plan/branch?branchId=${
        branchId ? branchId : branchId
      }&page=${page}`,
    );
    const menuPlans = MenuPlansData?.data?.data?.data?.items;
    // console.log(menuPlans, 'menuPlanss');
    return menuPlans;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuPlansByBranchAndCategory = async (
  branchId: string,
  page: number,
  categoryId: number,
) => {
  try {
    const MenuPlansData = await api.get(
      `/menuplans/plan/branch/category?branchId=${branchId}&page=${page}&categoryid=${categoryId}`,
    );
    const menuPlans = MenuPlansData?.data?.data?.data?.items;
    // console.log(menuPlans, 'menuPlans');
    return menuPlans;
  } catch (error) {
    console.log(error);
  }
};
export const getMenuPlansById = async (palnId: string) => {
  try {
    const MenuPlanData = await api.get(`/menuplans/${palnId}`);
    const menuPlan = MenuPlanData?.data?.data?.data;
    // console.log(menuPlan, 'menuPlan');
    return menuPlan;
  } catch (error) {
    console.log(error);
  }
};

export const filterMenuItems = async (
  branchId: string,
  page: number,
  category?: any,
  minPrice?: any,
  maxPrice?: any,
  menuItemType?: string,
) => {
  try {
    //82059935-89dc-4daf-aff3-adcf997d6859

    const MenuItemData = await api.get(
      `/menuitems/filter?branchId=${branchId}&page=${page}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&menuItemType=${menuItemType}`,
    );
    const menuItem = MenuItemData?.data.data.items;
    return menuItem;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuPlanTime = async (branchId: string) => {
  try {
    const MenuPlanTime = await api.get(`/menuplans/time/branch/${branchId}`);
    // console.log(MenuPlanTime, 'MenuPlanDataMenuPlanDataMenuPlanData');
    const menuPlan = MenuPlanTime?.data?.data?.data?.rows;
    // console.log(menuPlan, 'menuPlanTime');
    return menuPlan;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuPlanDetailBydateAndtypePlanId = async (
  date: any,
  page: string,
  menuPlanId: string,
  planType: string,
) => {
  try {
    const MenuPlanData = await api.get(
      `/menuplans/detail/plan/datetype?date=${date}&menuplanId=${menuPlanId}&plantype=${planType}&page=${page}`,
    );
    // console.log(
    //   MenuPlanData?.data?.data?.data?.items,
    //   'MenuPlanDataMenuPlanDataMenuPlanData',
    // );
    const menuPlans = MenuPlanData?.data?.data?.data?.items;
    // console.log(menuPlans, 'menuPlan');
    return menuPlans;
  } catch (error) {
    console.log(error);
  }
};

export const getMenuPlanDetailBydatePlanId = async (
  date: string,
  page: string,
  menuPlanId: string,
) => {
  try {
    const MenuPlanData = await api.get(
      `/menuplans/detail/plan/date_id?date=${date}&menuplanId=${menuPlanId}&page=${page}`,
    );
    // console.log(MenuPlanData, 'MenuPlanDataMenuPlanDataMenuPlanData....');
    const menuPlan = MenuPlanData?.data?.data?.data;
    // console.log(menuPlan, 'menuPlan');
    return menuPlan;
  } catch (error) {
    console.log(error);
  }
};

const body = {
  menuplanid: '41dc98f1-49f0-4e8f-9f97-037d727f883c',
  branchId: '82059935-89dc-4daf-aff3-adcf997d6859',
  menuitemid: '67676a8c-29ff-4b6f-b804-79ef99433804',
  quantity: 4,
  amount: 1000,
};

export const getMenuitemCart = async (branchId: any, id: any) => {
  console.log(id, '===userId===');
  try {
    const MenuItemCart = await api.get(
      `/orders/cart/menuitem?page=1&branchId=${branchId}&userId=${id}`,
    );
    // console.log(MenuItemCart, 'MenuPlanDataMenuPlanDataMenuPlanData....');
    const menuCart = MenuItemCart?.data?.data;
    // console.log(menuCart, 'menuPlan');
    return menuCart;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMenuPlanCart = async (id: any, branchId: any) => {
  try {
    const MenuItemCart = await api.get(
      `/orders/cart/menuplan?page=1&branchId=${branchId}&userId=${id}`,
    );
    // console.log(MenuItemCart, 'MenuPlanDataMenuPlanDataMenuPlanData....');
    const menuCart = MenuItemCart?.data?.data;
    // console.log(menuCart, 'menuPlan');
    return menuCart;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDeliveryAddress = async (branch: any) => {
  try {
    const address = await api.get(`/utils/deliveryaddress?branchId=${branch}`);
    console.log(address?.data?.rows, 'deliverAdreeesss....');
    // const menuCart = MenuItemCart?.data?.data;
    return address;
  } catch (error) {
    console.log(error);
  }
};

// export const createCart = async (body: any) => {
//   console.log(body, 'bodyyy');
//   try {
//     const cart = await api.post(`/orders/cart`, {
//       branchId: body.branchId,
//       menuitemid: body.menuitemid,
//       quantity: body.quantity,
//       amount: body.amount,
//     });
//     const addedCart = cart?.data?.data;
//     dispatch(cartStates(addedCart));
//     console.log(addedCart, 'addedcaart');
//   } catch (err) {
//     console.log(err, 'cartError');
//   }
// };

export const createMenuItemOrder = async (body: any) => {
  console.log(body, 'bodyyy');
  console.log(
    {
      isMenuPlan: body.isMenuPlan,
      branchId: body.branchId,
      subTotal: body.subTotal,
      total: body.total,
      paymentMethod: body.paymentMethod,
      paymentType: body.paymentType,
      deliveryCharge: body.deliveryCharge,
      orderName: body.orderName,
      // orderChannel: 'POS',
      paymentStatus: 'Not Paid',
      cartIds: body.cartIds,
      orderForFriend: body.orderForFriend,
      friendName: body.friendName,
      friendPhoneNumber: body.friendPhoneNumber,
      deliveryOption: body.deliveryOption,
      deliveryTime: body.deliveryTime,
      deliveryAddress: body.deliveryAddress,
      deliveryAddId: body.deliveryAddId,
      orderChannel: body.orderChannel,
    },
    '====consolleddditem=====',
  );
  try {
    const cart = await api.post(`/orders/menuItem`, {
      isMenuPlan: body.isMenuPlan,
      branchId: body.branchId,
      subTotal: body.subTotal,
      total: body.total,
      paymentMethod: body.paymentMethod,
      paymentType: body.paymentType,
      deliveryCharge: body.deliveryCharge,
      // orderName: body.orderName,
      // orderChannel: 'POS',
      paymentStatus: 'Not Paid',
      cartIds: body.cartIds,
      orderForFriend: body.orderForFriend,
      friendName: body.friendName,
      friendPhoneNumber: body.friendPhoneNumber,
      deliveryOption: body.deliveryOption,
      deliveryTime: body.deliveryTime,
      deliveryAddress: body.deliveryAddress,
      deliveryAddId: body.deliveryAddId,
      orderChannel: body.orderChannel,
    });
    const addedCart = cart?.data;
    // console.log(cart.data, 'addedcaart');
    return addedCart;
  } catch (err) {
    console.log(err, 'cartError');
  }
};

export const createMenuPlanOrder = async (body: any) => {
  console.log(body, 'bodyyy');
  try {
    const cart = await api.post(`/orders/menuPlan`, {
      isMenuPlan: body.isMenuPlan,
      branchId: body.branchId,
      subTotal: body.subTotal,
      total: body.total,
      paymentMethod: body.paymentMethod,
      paymentType: body.paymentType,
      deliveryCharge: body.deliveryCharge,
      orderName: body.orderName,
      // orderChannel: 'POS',
      paymentStatus: 'Not Paid',
      basketIds: body.cartIds,
      orderChannel: body.orderChannel,
    });
    const addedCart = cart?.data;
    // console.log(cart?.data, 'addedcaart');
    return addedCart;
  } catch (err) {
    console.log(err, 'cartError');
  }
};

export const createMenuItemOrderDetail = async (body: any, orderId: any) => {
  console.log(body, orderId, 'bodyyy');
  try {
    const cart = await api.post(`orders/menuitem/detail`, {
      orderId: orderId,
      branchId: body.branchId,
      cartIds: body.cartIds,
      deliveryTime: body.deliveryTime,
      deliveryOption: body?.deliveryAddress,
      deliveryAddress: body?.deliveryOption,
      orderForFriend: body?.orderForFriend,
      friendName: body?.friendName,
      friendPhoneNumber: body?.friendPhoneNumber,
      //"orderForFriend": true, // optional
      //"friendName": "Chike", // optional
      //"friendPhoneNumber": "090540904" // optional
    });
    const addedCart = cart?.data?.data;
    // console.log(addedCart, 'order completed');
    return addedCart;
  } catch (err) {
    console.log(err, 'orderError');
  }
};

export const createmenuplanorderDetail = async (body: any, orderId: any) => {
  console.log(body, orderId, 'bodyyy');
  try {
    const cart = await api.post(`orders/menuplan/detail`, {
      orderId: orderId,
      branchId: body.branchId,
      cartIds: body.cartIds,
    });
    const addedCart = cart?.data?.data;
    // console.log(addedCart, 'order completed');
    return addedCart;
  } catch (err) {
    console.log(err, 'orderError');
  }
};

export const getMenuPlanOrders = async (id: any) => {
  try {
    const MenuItemCart = await api.get(
      `orders/menuplan/detail?page=${1}&userId=${id}`,
    );
    // console.log(MenuItemCart, 'MenuPlanDataMenuPlanDataMenuPlanData....');
    const menuCart = MenuItemCart?.data?.data;
    // console.log(menuCart, 'menuPlan');
    return menuCart;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMenuItemOrders = async (id: any) => {
  try {
    const MenuItemCart = await api.get(
      `/orders/menuitem/detail?page=${1}&userId=${id}`,
    );
    // console.log(MenuItemCart, 'MenuPlanDataMenuPlanDataMenuPlanData....');
    const menuCart = MenuItemCart?.data?.data;
    // console.log(menuCart, 'menuPlan');
    return menuCart;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOrderById = async (id: any) => {
  try {
    const MenuItemCart = await api.get(
      `/orders/byId?orderId=${id}&isMenuplan=${true}`,
    );
    const menuOrderId = MenuItemCart?.data;
    // console.log(menuOrderId, 'menuPlanOrderByidddd');
    return menuOrderId;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getPlanCatId = async (branch: any, id: any) => {
  console.log(branch, id, '====detailllsssss');
  try {
    const MenuItemCart = await api.get(
      `https://api.staging.ooma.kitchen/api/v1/menuplans/plan/branch/category?branchId=${branch}&page=1&categoryid=${id}`,
      // `/menuplans/plan/branch/category?branchId=${branch}&page=${1}&categoryid=${id}`,
    );
    const menuOrderId = MenuItemCart?.data?.data?.data?.items;
    // console.log(menuOrderId, 'categoryidddss==');
    return menuOrderId;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generatePaymentRef = async (body: any) => {
  console.log(body, '====detailllsssss');
  try {
    const payment = await api.post(`/payments`, {
      amount: body.amount,
      branchId: body.branchId,
      orderId: body.orderId,
      paymentMethod: body.paymentMethod,
      gateWayType: body.gateWayType,
      currency: 'NGN',
    });
    const generated = payment.data;
    // console.log(generated, 'categoryidddss==');
    return generated;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyPayment = async (key: any) => {
  console.log(body, '====detailllsssss');
  try {
    const confirmPayment = await api.get(`payments/verify/${key}`);
    const generated = confirmPayment.data;
    // console.log(generated, 'categoryidddss==');
    return generated;
  } catch (error) {
    console.log(error);
    return error;
  }
};
