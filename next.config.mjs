/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // or 'https' if the image uses HTTPS
                hostname: 'books.google.com',
                port: '', // Leave empty unless a specific port is used
                pathname: '/books/content/**', // Adjust the path to match the URL pattern
              },
        ],
    },
};

export default nextConfig;
