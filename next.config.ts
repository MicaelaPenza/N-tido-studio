import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // node:sqlite se usa solo en el servidor; no debe empaquetarse para el cliente.
  serverExternalPackages: ["node:sqlite"],
};

export default nextConfig;
