/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'thispersondoesnotexist.com'],
    }
}

module.exports = nextConfig
