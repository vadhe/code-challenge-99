# Cryptocurrency Swap App

A simple React app for swapping cryptocurrencies using real-time exchange rates from CoinGecko API.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run linter
pnpm run lint
```

## Environment Setup

Create a `.env` file with:
```
VITE_BASE_URL_API=https://api.coingecko.com/api/v3
```

## Features

- Real-time cryptocurrency exchange rates
- Swap between different cryptocurrencies
- Loading states and error handling
- Toast notifications for user feedback
- Responsive design with TailwindCSS

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **Radix UI** components
- **Sonner** for toast notifications
- **CoinGecko API** for crypto data

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── CoinSelector.tsx
│   ├── ExchangeRateDisplay.tsx
│   └── SwapButton.tsx
├── hooks/              # Custom React hooks
│   └── useSwap.ts
├── services/           # API services
│   └── coinApi.ts
├── types/              # TypeScript types
│   └── coin.ts
└── App.tsx             # Main component
```



## Development

Run `npm run dev` and open http://localhost:5173 to get started.