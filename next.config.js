module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://localhost:7215/api/:path*'
            }
        ]
    }
}