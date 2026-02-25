<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  Medusa Next.js Starter Template
</h1>

<p align="center">
Combine Medusa's modules for your commerce backend with the newest Next.js 15 features for a performant storefront.</p>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

### Prerequisites

To use the [Next.js Starter Template](https://medusajs.com/nextjs-commerce/), you should have a Medusa server running locally on port 9000.
For a quick setup, run:

```shell
npx create-medusa-app@latest
```

Check out [create-medusa-app docs](https://docs.medusajs.com/learn/installation) for more details and troubleshooting.

# Overview

The Medusa Next.js Starter is built with:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Medusa](https://medusajs.com/)

## Premium Storefront Redesign

This storefront has been completely redesigned with a premium, mobile-first approach featuring:

### Design System
- **Comprehensive Design Tokens**: Colors, typography, spacing, shadows, border radius, and animations
- **Consistent Styling**: All components use design system tokens for visual consistency
- **Tailwind Integration**: Design tokens integrated with Tailwind CSS configuration

### Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices with progressive enhancement for larger screens
- **Breakpoints**: xs (320px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Touch-Friendly**: Minimum 44px touch targets on all interactive elements
- **Responsive Components**: Grid, Flex, and Stack layout components with responsive props

### Component Library
- **Base Components**: Button, Input, Card, Badge, Tag with multiple variants
- **Product Components**: ProductCard, ProductGrid, ImageGallery, VariantSelector
- **Layout Components**: Header, Footer, MobileMenu, Search with autocomplete
- **Loading States**: Skeleton loaders for all major content types
- **Empty States**: Helpful empty states for cart, orders, addresses, search results

### Animations & Interactions
- **Framer Motion**: Smooth page transitions and component animations
- **Hover Effects**: Scale, lift, and color transitions on interactive elements
- **Stagger Animations**: Sequential animations for grids and lists
- **Reduced Motion**: Respects user's prefers-reduced-motion setting

### Accessibility
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **ARIA Attributes**: Proper ARIA labels, roles, and live regions
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Screen Reader Support**: Semantic HTML and descriptive labels

### Performance
- **Next.js Image Optimization**: Automatic image optimization with lazy loading
- **Code Splitting**: Dynamic imports for large components
- **Caching**: SWR/React Query for API data caching
- **Layout Shift Prevention**: Explicit dimensions and skeleton loaders

### Key Features

Features include:

- Full ecommerce support:
  - Product Detail Page with image gallery and zoom
  - Product Overview Page with filtering and sorting
  - Product Collections with responsive grids
  - Cart with real-time updates
  - Checkout with Stripe and step indicator
  - User Accounts with dashboard
  - Order Details with tracking
  - Address Management
- Full Next.js 15 support:
  - App Router
  - Next fetching/caching
  - Server Components
  - Server Actions
  - Streaming
  - Static Pre-Rendering
- Premium UI/UX:
  - Mobile-first responsive design
  - Smooth animations and transitions
  - Accessibility compliance
  - Performance optimized
  - Professional visual polish

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   └── [countryCode]/
│       ├── (main)/              # Main storefront pages
│       └── (checkout)/          # Checkout flow pages
├── modules/                      # Feature modules
│   ├── common/                  # Shared components
│   │   └── components/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── badge/
│   │       └── layout/          # Grid, Flex, Stack
│   ├── layout/                  # Layout components
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── mobile-menu/
│   │   │   └── search/
│   │   └── templates/
│   ├── home/                    # Home page components
│   │   └── components/
│   │       ├── hero/
│   │       ├── featured-collections/
│   │       ├── featured-products/
│   │       └── category-grid/
│   ├── products/                # Product components
│   │   └── components/
│   │       ├── product-card/
│   │       ├── product-grid/
│   │       ├── image-gallery/
│   │       ├── variant-selector/
│   │       └── add-to-cart/
│   ├── cart/                    # Cart components
│   ├── checkout/                # Checkout components
│   ├── account/                 # Account components
│   ├── store/                   # Store/listing components
│   └── skeletons/               # Loading skeletons
├── lib/
│   ├── design-system/           # Design tokens
│   │   └── tokens/
│   │       ├── colors.ts
│   │       ├── typography.ts
│   │       ├── spacing.ts
│   │       ├── shadows.ts
│   │       ├── breakpoints.ts
│   │       └── animations.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-breakpoint.tsx
│   │   ├── use-media-query.tsx
│   │   ├── use-touch-device.tsx
│   │   └── use-reduced-motion.ts
│   ├── data/                    # Data fetching
│   └── util/                    # Utility functions
└── styles/
    └── globals.css              # Global styles
```

### Design System Tokens

Access design tokens in your components:

```typescript
import { colors } from '@lib/design-system/tokens/colors'
import { typography } from '@lib/design-system/tokens/typography'
import { spacing } from '@lib/design-system/tokens/spacing'
import { shadows } from '@lib/design-system/tokens/shadows'
import { breakpoints } from '@lib/design-system/tokens/breakpoints'

// Use in components
<div style={{
  color: colors.primary[500],
  fontSize: typography.fontSize.lg,
  padding: spacing[4],
  boxShadow: shadows.md
}}>
  Content
</div>
```

### Responsive Hooks

```typescript
import useBreakpoint from '@lib/hooks/use-breakpoint'
import useMediaQuery from '@lib/hooks/use-media-query'
import useTouchDevice from '@lib/hooks/use-touch-device'

function MyComponent() {
  const breakpoint = useBreakpoint() // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTouchDevice = useTouchDevice()
  
  return <div>{/* Responsive content */}</div>
}
```

### Layout Components

```typescript
import Grid from '@modules/common/components/layout/grid'
import Flex from '@modules/common/components/layout/flex'
import Stack from '@modules/common/components/layout/stack'

// Responsive grid
<Grid columnsMobile={2} columnsTablet={3} columnsDesktop={4} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>

// Flexible layout
<Flex direction="row" justify="between" align="center" gap={4}>
  <div>Left</div>
  <div>Right</div>
</Flex>

// Vertical/horizontal stack
<Stack direction="vertical" spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

# Quickstart

### Setting up the environment variables

Navigate into your projects directory and get your environment variables ready:

```shell
cd nextjs-starter-medusa/
mv .env.template .env.local
```

### Install dependencies

Use Yarn to install all dependencies.

```shell
yarn
```

### Start developing

You are now ready to start up your project.

```shell
yarn dev
```

### Open the code and start customizing

Your site is now running at http://localhost:8000!

# Payment integrations

By default this starter supports the following payment integrations

- [Stripe](https://stripe.com/)

To enable the integrations you need to add the following to your `.env.local` file:

```shell
NEXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
```

You'll also need to setup the integrations in your Medusa server. See the [Medusa documentation](https://docs.medusajs.com) for more information on how to configure [Stripe](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe#main).

# Resources

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Documentation](https://docs.medusajs.com/)

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)
