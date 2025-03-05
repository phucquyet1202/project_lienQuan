/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL: process.env.URL,
      },
      images: {
        domains: ['res.cloudinary.com'], // Thêm "res.cloudinary.com" vào danh sách các nguồn ảnh cho phép
      },
};

module.exports = nextConfig;
