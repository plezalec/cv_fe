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
    apiUrl: 'http://localhost:8888/',
    wsUrl: 'ws://localhost:8888/ws/',
};