/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
               hostname: "localhost",
               hostname: "images.unsplash.com",
            }
        ]
    }
};

export default nextConfig;
