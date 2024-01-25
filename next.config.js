/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        HOST:"http://localhost:8070",
        CONTROLLER_AUTH:"/auth",
        CONTROLLER_PERSON:"/person",
        //TODO: manage sessions and credential later...
        AUTH_TOKEN:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290QHJ3aXphcmQuY29tIiwiaWF0IjoxNzA1NjIzNjI2fQ.EEmjUahLWh88SZUfF0g6xVzCjJ3iN5rWetP2rU5AKB8"
    }
}

module.exports = nextConfig
