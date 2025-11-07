import { Twitter, Droplets } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center space-x-8 mb-6">
          <a
            href="https://x.com/de_rianar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            <span>Follow @de_rianar</span>
          </a>
          <a
            href="https://testnet.iopn.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Droplets className="w-5 h-5" />
            <span>IOPN Faucet</span>
          </a>
        </div>
        <div className="text-center text-gray-500">
          <p>© 2025 Oats Swap - AMM DEX for IOPN Testnet</p>
          <p className="text-sm mt-1">Built for the IOPN ecosystem with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
