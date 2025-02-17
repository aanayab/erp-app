// environment.ts (dev)

const params = {
  wsAdministrator: {
    url: "api-dev.boyertech.mx",
    port: undefined
  },
  wsAuthenticate: {
    url: "localhost",
    port: "8071"
  },
  wsSms: {
    url: "localhost",
    port: "8073"
  },
  wsSysAdmin: {
    url: "localhost",
    port: "8070"
  },
}
export const environment = {
  production: false,
  wsAdministrator: {
    companyUrl: `http://${params.wsAdministrator.url}${params.wsAdministrator.port ? `:${params.wsAdministrator.port}` : ''}/ws-administrator/api/company/all`,
    companybyIdUrl: `http://${params.wsAdministrator.url}${params.wsAdministrator.port ? `:${params.wsAdministrator.port}` : ''}/ws-administrator/api/company/`,
    privilegyByIdRoll: `http://${params.wsAdministrator.url}${params.wsAdministrator.port ? `:${params.wsAdministrator.port}` : ''}/ws-administrator/api/privilegy/allByRole/`,
  },
  wsAuthenticate: {
    tokenUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authenticate?`,
    validateUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authenticate/validate/`,
    refreshUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authenticate/refresh/`,
    userUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/`,
    addUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user`,
    usersUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/all`,
    usersByIdCompanyUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/allByIdCompany/`,
    disabelEnableUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/disable`,
    hideShowUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/hide`,
    existUsernameUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/username/exist/`,
    existEmailUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/email/exist/`,
    confirmUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/confirm`,
    deleteUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user`
  },
  wsSms: {
    sendUrl: `http://${params.wsSms.url}${params.wsSms.port ? `:${params.wsSms.port}` : ''}/ws-sms/api/sms/send-confirmation-code`
  },
  wsSysAdmin: {
    companyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/all`,
    companybyIdUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/`,
    privilegyByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/privilegy/allByRole/`,
    menuByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/menu/allByRole/`,
    foodNodeByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/menu/allFoodNodeByRole/`,
    routeByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/menu/allRouteByRole/`,
  }
};