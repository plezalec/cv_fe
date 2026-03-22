export const environment = {
    production: false,
    keycloak: {
        config: {
        url: 'https://keycloak.xnar.si',
        realm: 'cv',
        clientId: 'frontEnd',
        },
        initOptions: {
        onLoad: 'check-sso',//'check-sso','login-required'
        checkLoginIframe: false
        }
    },
    apiUrl: 'https://cv-be.križnar.si/',
    wsUrl: 'wss://cv-be.križnar.si/ws/',
};