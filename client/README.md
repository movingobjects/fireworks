# Fireworks (client)

## Contents

- [Development](#development)
- [Build](#build)
- [Folder Structure](#folder-structure)

## Development

Start the development server:

```sh
yarn dev
```

## Build

To create an optimized production build:

```sh
yarn build
```

Run the production build:

```sh
yarn start
```

## Folder Structure

```
.
│── public/             # Static assets
└── src/                # Source code
    ├── app/            # Next.js app router files
    ├── atoms/          # Jotai atomic state management
    ├── components/     # React components
    ├── config/         # Configurable settings
    |  ├── constant.ts  # Handful of global constants
    |  └── modes.ts     # Firework display mode definitions
    ├── pixi/           # PIXI views
    ├── styles/         # Global styles
    ├── types/          # TypeScript type definitions
    └── utils/          # Utility functions
       ├── collapse.ts  # Utils relating to "collapsing" options/ranges
       ├── color.ts     # Utils relating to color
       └── math.ts      # Utils relating to math and geometry
```
