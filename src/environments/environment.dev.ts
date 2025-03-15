// environment.ts (dev)
export const environment = {
  production: false,
  profile: "DEV",
  wsAdministrator: {
    companyUrl: 'http://api-dev.boyertech.mx/ws-administrator/api/company/all',
    companybyIdUrl: 'http://api-dev.boyertech.mx/ws-administrator/api/company/',
    privilegyByIdRoll: 'http://api-dev.boyertech.mx/ws-administrator/api/privilegy/allByRole/',
  },
  wsAuthenticate: {
    tokenUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/authenticate?',
    validateUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/authenticate/validate/',
    refreshUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/authenticate/refresh/',
    userUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/',
    addUserUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user',
    usersUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/all',
    usersByIdCompanyUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/allByIdCompany/',
    disabelEnableUserUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/disable',
    hideShowUserUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/hide',
    existUsernameUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/username/exist/',
    existEmailUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/email/exist/',
    confirmUserUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user/confirm',
    deleteUserUrl: 'http://api-dev.boyertech.mx/ws-authenticator/api/user'
  },
  wsSms :{
    sendUrl:'http://api-dev.boyertech.mx/ws-sms/api/sms/send-confirmation-code'
  },
  wsSysAdmin :{
    companyUrl : 'http://api-dev.boyertech.mx/ws-sysAdmin/api/company/all',
    companybyIdUrl : 'http://api-dev.boyertech.mx/ws-sysAdmin/api/company/',
    privilegyByIdRoll : 'http://api-dev.boyertech.mx/ws-sysAdmin/api/privilegy/allByRole/',
    menuByIdRoll : 'http://api-dev.boyertech.mx/ws-sysAdmin/api/menu/allByRole/',
    foodNodeByIdRoll : 'http://api-dev.boyertech.mx/ws-sysAdmin/api/menu/allFoodNodeByRole/',
    routeByIdRoll : 'http://api-dev.boyertech.mx/ws-sysAdmin/api/menu/allRouteByRole/',
  }
};