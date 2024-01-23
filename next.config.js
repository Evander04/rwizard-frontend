/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        REMOTE_HOST:"http://localhost:8070",
        PREFIX_AUTH:"/auth",
    }
}

module.exports = nextConfig
