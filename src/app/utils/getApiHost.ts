export function getApiHost() {
    return window.location.host.includes('localhost') ? 'http://localhost:3000/' : 'http://15.229.69.25:3000/'
}
