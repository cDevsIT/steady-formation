/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com', 'randomuser.me','reqres.in', 'localhost'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.cdevs.com.bd",
                pathname: "/storage/uploads/**",
            },
        ],
    },
};

export default nextConfig;
