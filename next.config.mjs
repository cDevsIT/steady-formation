
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com', 'randomuser.me','reqres.in', 'localhost'],
        remotePatterns: [
            {
                protocol: process.env.PROTOCOL || 'http',
                hostname: process.env.HOSTNAME || 'localhost:8000',
                pathname: process.env.PATHNAME || '/storage/uploads/**'
            },
        ],
    },
};

export default nextConfig;
