const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  IS_REGISTERED: '/auth/isRegistered',
  GET_CURRENT_USER: '/auth/me',
  UPDATE_USER: '/auth/me',
  VENDOR_LOGIN: '/vendorAuth/login',
  VENDOR_REGISTER: '/vendorAuth/register',
  VENDOR_IS_REGISTERED: '/vendorAuth/isRegistered',
  VENDOR_GET_CURRENT_USER: '/vendorAuth/me',
  UPDATE_VENDOR: '/vendorAuth/me',
  GET_ALL_VENDORS: '/vendorAuth/vendors',
  VERIFY_VENDOR: '/vendorAuth/verify',
  VERIFY_DELIVERY: '/auth/verify',
  GET_ALL_USERS: '/auth/users',
};

const NOTIFICATION_ROUTES = {
  SEND_NOTIFICATIONS: '/notifications',
};

const ORDERS = {
  GET_ACTIVE_ORDERS: '/orders/activeAll',
  GET_FINISHED_ORDERS: '/orders/finishedAll',
  GET_VENDOR_ACTIVE_ORDERS: '/orders/activeVendor',
  GET_VENDOR_FINISHED_ORDERS: '/orders/finishedVendor',
  GET_DUE_PAYMENT_ORDERS: '/orders/paymentDues',
  MODIFY_ORDER: '/orders/modify',
  ACCEPT_ORDER: '/orders/accept',
  REJECT_ORDER: '/orders/reject',
  MARK_ORDER_COMPLETE: '/orders/complete',
};

const BUCKET = {
  UPLOAD_PIC: '/bucket/upload',
  DELETE_PIC: '/bucket/delete',
};

export const ENDPOINTS = {
  ...AUTH_ROUTES,
  ...NOTIFICATION_ROUTES,
  ...ORDERS,
  ...BUCKET,
  AD_ACTIONS: '/ads',
  DELIVERY_CHARGE_ACTIONS: '/price',
  ALERT_ACTIONS: '/alerts',
  CATEGORY_ACTIONS: '/categories',
  ITEM_ACTIONS: '/items',
  FILTERED_ITEMS: '/items/filter',
};
