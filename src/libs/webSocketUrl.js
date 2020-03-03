import config from '@/config'
const webSocketPath = process.env.NODE_ENV === 'development' ? config.webSocketPath.dev : config.webSocketPath.pro

const webSocketUrl = webSocketPath + 'websocket/'
export default webSocketUrl
