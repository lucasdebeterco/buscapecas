export function getApiHost() {
    return window.location.host.includes('localhost') ? 'http://localhost:3000/' : 'http://15.228.15.38:3000/'
}
