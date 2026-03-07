# Implementation Plan: Storefront Features Integration

## Overview

This plan integrates three backend features into the Next.js storefront: Reviews (enhancement), Wishlist (new), and CMS Pages (footer links). The implementation follows Next.js 14 App Router patterns with server and client components, building on existing data fetching infrastructure.

Key implementation notes:
- ProductReviews component already exists and is functional
- Data fetching layer (reviews.ts, wishlist.ts) already exists
- CMS pages routing already exists
- Focus on new components: WishlistButton, WishlistToggle, Wishlist page
- Enhance existing components: ProductReviews (sorting/filtering), Footer (CMS links)

## Tasks

- [ ] 1. Create wishlist navigation button component
  - [x] 1.1 Create WishlistButton server component wrapper
    - Fetch wishlist data using getWishlist()
    - Pass item count to client component
    - Handle authentication state
    - _Requirements: 4.1, 4.5_
  
  - [x] 1.2 Create WishlistButtonClient component
    - Render Heart icon from @medusajs/icons
    - Display badge with item count when count > 0
    - Navigate to /wishlist on click
    - Follow CartButton styling patterns
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [ ]* 1.3 Write property test for wishlist button count display
    - **Property 2: Wishlist count badge visibility**
    - **Validates: Requirements 4.2**
  
  - [x] 1.4 Integrate WishlistButton into navigation bar
    - Add to src/modules/layout/templates/nav/index.tsx
    - Place between SearchButton and Account link
    - Wrap in Suspense with fallback
    - _Requirements: 4.1_

- [ ] 2. Create wishlist toggle component for products
  - [x] 2.1 Create WishlistToggle client component
    - Accept productId, variantId, isInWishlist, size props
    - Render Heart/HeartSolid icon based on state
    - Handle add/remove actions with optimistic updates
    - Show loading state during API calls
    - Redirect to /account if not authenticated
    - _Requirements: 6.1, 6.3, 6.6, 7.2, 7.3, 7.4_
  
  - [ ]* 2.2 Write property test for wishlist add operation
    - **Property 7: Wishlist add operation**
    - **Validates: Requirements 6.1, 7.2**
  
  - [ ]* 2.3 Write property test for wishlist remove operation
    - **Property 8: Wishlist remove operation**
    - **Validates: Requirements 6.3**
  
  - [ ]* 2.4 Write property test for wishlist visual state indication
    - **Property 10: Wishlist visual state indication**
    - **Validates: Requirements 6.6, 7.3**

- [ ] 3. Integrate wishlist toggle into product displays
  - [ ] 3.1 Add WishlistToggle to ProductActions component
    - Fetch customer wishlist in ProductTemplate
    - Pass isInWishlist prop to WishlistToggle
    - Position near add to cart button
    - _Requirements: 6.1, 6.6_
  
  - [ ] 3.2 Add WishlistToggle to ProductPreview cards
    - Add wishlist icon overlay on thumbnail (top-right corner)
    - Use size="small" prop for compact display
    - Fetch wishlist data in parent component
    - Pass isInWishlist state to each card
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ]* 3.3 Write unit tests for product card wishlist integration
    - Test icon renders on product cards
    - Test authentication redirect
    - _Requirements: 7.1, 7.4_

- [ ] 4. Create wishlist page
  - [x] 4.1 Create wishlist page route
    - Create src/app/[countryCode]/(main)/wishlist/page.tsx
    - Check authentication and redirect if needed
    - Fetch wishlist with product details
    - Set page metadata
    - _Requirements: 5.1, 5.4_
  
  - [x] 4.2 Create WishlistItems client component
    - Accept wishlist prop with items and product details
    - Render grid layout (responsive: 1 col mobile, 2-3 cols desktop)
    - Handle empty state with call-to-action message
    - Show loading state during initial render
    - _Requirements: 5.1, 5.2, 5.3, 5.5_
  
  - [x] 4.3 Create WishlistCard component
    - Display product thumbnail, title, price
    - Include remove button with loading state
    - Call removeFromWishlist on remove click
    - Update local state after successful removal
    - _Requirements: 5.2, 6.3, 6.4_
  
  - [ ]* 4.4 Write property test for wishlist item display completeness
    - **Property 11: Wishlist item display completeness**
    - **Validates: Requirements 5.2**
  
  - [ ]* 4.5 Write property test for wishlist count reactivity
    - **Property 9: Wishlist count reactivity**
    - **Validates: Requirements 4.4, 6.2, 6.4**

- [ ] 5. Checkpoint - Test wishlist functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Enhance ProductReviews component
  - [ ] 6.1 Add review sorting options
    - Add dropdown for sort selection (newest, highest rated, lowest rated)
    - Implement client-side sorting logic
    - Default to newest first
    - _Requirements: 1.1_
  
  - [ ] 6.2 Add review filtering options
    - Add filter buttons for rating (5 stars, 4+, 3+, etc.)
    - Implement client-side filtering logic
    - Show count of filtered results
    - _Requirements: 1.1_
  
  - [ ]* 6.3 Write property test for reviews display filtering
    - **Property 1: Reviews display only approved status**
    - **Validates: Requirements 1.1**
  
  - [ ]* 6.4 Write property test for review rendering completeness
    - **Property 2: Review rendering completeness**
    - **Validates: Requirements 1.3**
  
  - [ ]* 6.5 Write property test for average rating calculation
    - **Property 3: Average rating and count display**
    - **Validates: Requirements 1.2, 13.1, 13.2**

- [ ] 7. Enhance review form validation and submission
  - [ ] 7.1 Add form validation logic
    - Validate title is non-empty before submission
    - Validate comment is non-empty before submission
    - Validate rating is between 1-5
    - Display field-specific error messages
    - _Requirements: 3.1, 3.2, 3.4_
  
  - [ ]* 7.2 Write property test for review form validation
    - **Property 5: Review form validation**
    - **Validates: Requirements 3.1, 3.2, 3.4**
  
  - [ ]* 7.3 Write property test for review submission
    - **Property 4: Review submission API invocation**
    - **Validates: Requirements 2.3**
  
  - [ ]* 7.4 Write property test for star rating feedback
    - **Property 6: Star rating visual feedback**
    - **Validates: Requirements 3.3**

- [ ] 8. Add CMS page links to footer
  - [ ] 8.1 Update footer component with CMS links
    - Add new section for "À propos" links
    - Include links to: /pages/about, /pages/terms, /pages/privacy
    - Organize into logical groups
    - Use LocalizedClientLink for routing
    - _Requirements: 10.1, 10.2_
  
  - [ ]* 8.2 Write unit tests for footer CMS links
    - Test links render correctly
    - Test navigation behavior
    - _Requirements: 10.1, 10.2_

- [ ] 9. Implement error handling and resilience
  - [ ] 9.1 Add error boundaries for review components
    - Wrap ProductReviews in error boundary
    - Display fallback UI on error
    - Log errors without exposing details
    - _Requirements: 14.1, 14.4_
  
  - [ ] 9.2 Add error handling for wishlist operations
    - Implement try-catch in all wishlist API calls
    - Display user-friendly error messages
    - Revert optimistic updates on failure
    - Log errors for debugging
    - _Requirements: 14.2, 14.4_
  
  - [ ]* 9.3 Write property test for error state preservation
    - **Property 12: Error state preservation**
    - **Validates: Requirements 2.6, 6.5**
  
  - [ ]* 9.4 Write property test for API error graceful degradation
    - **Property 13: API error graceful degradation**
    - **Validates: Requirements 14.1, 14.2, 14.4**

- [ ] 10. Implement responsive design
  - [ ] 10.1 Add responsive styles to wishlist page
    - Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
    - Adjust spacing for mobile: gap-4 md:gap-6
    - Test on mobile viewport
    - _Requirements: 11.2_
  
  - [ ] 10.2 Verify review component responsiveness
    - Ensure single-column layout on mobile
    - Verify form inputs are touch-friendly (min 44px)
    - Test star rating on mobile devices
    - _Requirements: 11.1, 11.3_
  
  - [ ]* 10.3 Write unit tests for responsive layouts
    - Test mobile viewport rendering
    - Test desktop viewport rendering
    - _Requirements: 11.1, 11.2_

- [ ] 11. Final integration and polish
  - [ ] 11.1 Add wishlist count to product metadata
    - Update product queries to include wishlist status
    - Optimize wishlist checks for product lists
    - _Requirements: 6.6, 7.3_
  
  - [ ] 11.2 Add loading states and skeletons
    - Create skeleton loader for wishlist page
    - Add loading spinner to wishlist buttons
    - Ensure smooth transitions
    - _Requirements: 1.5, 5.5_
  
  - [ ] 11.3 Verify all components follow accessibility standards
    - Add aria-labels to icon buttons
    - Ensure keyboard navigation works
    - Test with screen reader
    - _Requirements: All_

- [ ] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- ProductReviews component already exists and is functional - tasks 6-7 are enhancements
- CMS pages routing already exists - task 8 only adds footer links
- Focus implementation effort on wishlist components (tasks 1-5)
- Each task references specific requirements for traceability
- Property tests validate universal correctness across all inputs
- Unit tests validate specific examples and edge cases
