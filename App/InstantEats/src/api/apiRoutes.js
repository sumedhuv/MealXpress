const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  IS_REGISTERED: '/auth/isRegistered',
  GET_CURRENT_USER: '/auth/me',
  UPDATE_USER: '/auth/me',
  ADD_REVIEW: '/auth/addReview',
  GET_UPDATE_CART: '/auth/cart',
};

const VENDORS = {
  GET_ALL_VENDORS: '/vendorAuth/vendors/top',
  GET_VENDOR: '/vendorAuth/vendors', //add id
};

const ITEMS = {
  ITEMS: '/items',
  FILTERED_ITEMS: '/items/filter',
};
const NOTIFICATION_ROUTES = {
  SEND: '/notifications', //add id
};

const ORDERS = {
  CREATE_ORDER: '/orders/create',
  MODIFY_ORDER: '/orders/modify',
  GET_ACTIVE_ORDERS: '/orders/active',
  GET_FINISHED_ORDERS: '/orders/finished',
};

export const ENDPOINTS = {
  ...AUTH_ROUTES,
  ...NOTIFICATION_ROUTES,
  ...VENDORS,
  ...ITEMS,
  ...ORDERS,
  GET_CATEGORIES: '/categories',
  GET_ALERTS: '/alerts',
  GET_ADS: '/ads',
  GET_DELIVERY_CHARGE: '/price',
  GET_RAZORPAY_KEY: '/key',
  RAZORPAY_CAPTURE: '/payment/capture/',
};
