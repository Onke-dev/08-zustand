import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // В Next.js 15 компилятор React 19 включается через объект experimental
  experimental: {
    reactCompiler: true,
  },
  eslint: {
    // Теперь, когда конфиг ESLint чистый, мы можем включить проверки обратно
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
