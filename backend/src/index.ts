import http from 'http'
import { app } from './app'
import { connect } from './config/database'

const server = http.createServer(app)

server.listen(process.env.API_PORT, async () => {
    console.log(
        `Hello running server from http://localhost:${process.env.API_PORT}`
    )
    await connect()
})
