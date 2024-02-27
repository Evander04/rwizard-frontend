/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        HOST:"https://localhost:8070",
        CONTROLLER_AUTH:"/auth",
        CONTROLLER_PERSON:"/person",        
    }
}

module.exports = nextConfig