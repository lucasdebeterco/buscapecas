export function getApiHost() {
    return window.location.host.includes('localhost') ? 'http://localhost:3000/' : 'https://buscapecas-api.lucasdebeterco.dev/'
}
