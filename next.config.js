/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    //Without this domains you cant get image from an external source,
    // note domain is likely to change depending on the error it gives
    // and where the image is stored.In our case it is cloudinary
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
