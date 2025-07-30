// environment.ts (dev)

import { PrivilegyService } from "src/app/services/helpers/privilegy/privilegy.service";

const params = {
  wsAdministrator: {
    url: "api-dev.boyertech.mx",
    port: undefined
  },
  wsAuthenticate: {
    url: "api-dev.boyertech.mx",
    port: undefined
  },
  wsSms: {
    url: "api-dev.boyertech.mx",
    port: undefined
  },
  wsSysAdmin: {
    url: "localhost",
    port: 8070
  },
}
export const environment = {
  production: false,
  profile: "DEV",
  wsAdministrator: {
    companyUrl: `http://${params.wsAdministrator.url}${params.wsAdministrator.port ? `:${params.wsAdministrator.port}` : ''}/ws-administrator/api/company/all`,
    companybyIdUrl: `http://${params.wsAdministrator.url}${params.wsAdministrator.port ? `:${params.wsAdministrator.port}` : ''}/ws-administrator/api/company/`,
    privilegyByIdRoll: `http://${params.wsAdministrator.url}${params.wsAdministrator.port ? `:${params.wsAdministrator.port}` : ''}/ws-administrator/api/privilegy/allByRole/`,
  },
  wsAuthenticate: {
    user: {
      tokenUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authenticate?`,
      validateUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authenticate/validate/`,
      refreshUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authenticate/refresh/`,
      userUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/`,
      addUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user`,
      resetPasswordUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/reset`,
      updateUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user`,
      usersUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/all`,
      usersByIdCompanyUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/allByIdCompany/`,
      disabelEnableUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/disable`,
      hideShowUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/hide`,
      existUsernameUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/username/exist/`,
      existEmailUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/email/exist/`,
      existMobileUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/mobile/exist/`,
      confirmUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user/confirm`,
      deleteUserUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/user`
    },
    authority: {
      authorityUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority/`,
      addAuthorityUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority`,
      updateAuthorityUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority`,
      authoritiesUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority/all`,
      disabelEnableAuthorityUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority/disable`,
      hideShowAuthorityUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority/hide`,
      existAuthorityUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority/exist/`,
      deleteAuthorityUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority`,
      authorityByIdCompanyUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority/allByIdCompany/`,
      authoritiesEnabledByIdCompanyUrl: `http://${params.wsAuthenticate.url}${params.wsAuthenticate.port ? `:${params.wsAuthenticate.port}` : ''}/ws-authenticator/api/authority/allEnabledByIdCompany/`,
    }
  },
  wsSms: {
    sendUrl: `http://${params.wsSms.url}${params.wsSms.port ? `:${params.wsSms.port}` : ''}/ws-sms/api/sms/send-confirmation-code`
  },
  wsSysAdmin: {
    company: {
      companyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/all`,
      companybyIdUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/`,
      // companyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/copmany/`,
      addScreenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company`,
      updateScreenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company`,
      companiesUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/all`,
      disableEnableCompanyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/disable`,
      existCompanyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/exist/`,
      deleteCompanyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company`,
      companiesEnabledUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/company/allEnabled`,
    },
    privilegy: {
      privilegyByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/privilegy/allByRole/`,
    },
    menu: {
      menuByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/menu/allByRole/`,
      foodNodeByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/menu/allFoodNodeByRole/`,
      routeByIdRoll: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/menu/allRouteByRole/`,
    },

    screen: {
      screenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen/`,
      addScreenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen`,
      updateScreenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen`,
      screensUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen/all`,
      disableEnableScreenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen/disable`,
      existScreenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen/exist/`,
      deleteScreenUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen`,
      screensEnabledUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen/allEnabled`,
      updateScreensOrderUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/screen/all/order`,
    },
    grupo: {
      grupoUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo/`,
      addGroupUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo`,
      updateGroupUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo`,
      gruposUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo/all`,
      disabelEnableGroupUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo/disable`,
      hideShowGroupUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo/hide`,
      existGroupUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo/exist/`,
      deleteGroupUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo`,
      grupoByIdCompanyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo/allByIdCompany/`,
      gruposEnabledByIdCompanyUrl: `http://${params.wsSysAdmin.url}${params.wsSysAdmin.port ? `:${params.wsSysAdmin.port}` : ''}/ws-sysAdmin/api/grupo/allEnabledByIdCompany/`,
    }

  }
};