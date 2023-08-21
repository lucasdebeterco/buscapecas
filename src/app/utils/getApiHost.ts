export function getApiHost() {
    return window.location.host.includes('localhost') ? 'http://localhost:3000/' : 'https://buscapeca-api.onrender.com/'
}
