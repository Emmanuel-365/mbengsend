# Implementation Plan: Backend Store API Completion

## Overview

This plan implements product search endpoints and transactional email workflows for the Medusa backend. The implementation builds on existing infrastructure (Meilisearch service, Resend notification service) and follows Medusa patterns for API routes, workflows, and subscribers.

## Tasks

- [x] 1. Implement Meilisearch search method
  - [x] 1.1 Add searchProducts method to MeilisearchService
    - Add async searchProducts(query, options) method
    - Handle limit and offset parameters with defaults (limit: 20, offset: 0, max: 100)
    - Return hits array and estimatedTotalHits from Meilisearch
    - Add error handling for service unavailability
    - _Requirements: 1.1, 1.2, 1.3, 5.1_
  
  - [ ]* 1.2 Write property test for search query passthrough
    - **Property 1: Search query passthrough**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ]* 1.3 Write property test for pagination limits
    - **Property 2: Pagination limits search results**
    - **Validates: Requirements 1.3, 5.3**
  
  - [ ]* 1.4 Write unit tests for search edge cases
    - Test empty query handling
    - Test service unavailability
    - Test invalid pagination parameters
    - _Requirements: 1.5, 1.6_

- [x] 2. Implement store search API route
  - [x] 2.1 Create /store/search route handler
    - Create src/api/store/search/route.ts
    - Implement GET handler with query validation
    - Resolve Meilisearch service from container
    - Call searchProducts with query, limit, offset
    - Return formatted response with products, count, limit, offset
    - Handle 400 errors for missing query
    - Handle 503 errors for service failures
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  
  - [ ]* 2.2 Write property test for search result fields
    - **Property 3: Search results contain required fields**
    - **Validates: Requirements 1.4**
  
  - [ ]* 2.3 Write integration test for search endpoint
    - Test full search flow with Meilisearch
    - Test pagination behavior
    - Test error responses
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 3. Checkpoint - Verify search functionality
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement order confirmation email workflow
  - [x] 4.1 Create workflow directory structure
    - Create src/workflows/order-confirmation-email/ directory
    - Create src/workflows/order-confirmation-email/steps/ directory
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [x] 4.2 Implement retrieve order details step
    - Create steps/retrieve-order-details.ts
    - Use createStep to define step
    - Retrieve order with relations: items, customer, shipping_address
    - Extract required fields: order_number, customer email, items, total, date
    - Handle missing data gracefully
    - _Requirements: 2.2, 2.5_
  
  - [x] 4.3 Implement format order email step
    - Create steps/format-order-email.ts
    - Use createStep to define step
    - Generate HTML email with order details
    - Include order number, items list, total, date, shipping address
    - Use inline CSS for email client compatibility
    - _Requirements: 2.3, 6.1, 6.4_
  
  - [x] 4.4 Implement send email step
    - Create steps/send-email.ts
    - Use createStep to define step (reusable across workflows)
    - Resolve notification service from container
    - Call send method with recipient and HTML content
    - Handle email service failures gracefully
    - _Requirements: 2.4, 2.6_
  
  - [x] 4.5 Create order confirmation workflow
    - Create index.ts with workflow definition
    - Use createWorkflow to compose steps
    - Define input type: { order_id: string }
    - Chain: retrieve → format → send
    - Return WorkflowResponse with success status
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [ ]* 4.6 Write property test for workflow data retrieval
    - **Property 5: Workflow retrieves complete data**
    - **Validates: Requirements 2.2, 3.2, 4.2**
  
  - [ ]* 4.7 Write property test for email content completeness
    - **Property 6: Email formatting includes required content**
    - **Validates: Requirements 2.3, 3.3, 4.3, 6.1, 6.2, 6.3**
  
  - [ ]* 4.8 Write property test for email service invocation
    - **Property 7: Workflow sends email via notification service**
    - **Validates: Requirements 2.4, 3.4, 4.4**

- [x] 5. Implement order placed subscriber
  - [x] 5.1 Create order-placed subscriber
    - Create src/subscribers/order-placed.ts
    - Implement handler function that triggers order confirmation workflow
    - Export config with event: "order.placed"
    - Extract order_id from event data
    - _Requirements: 2.1_
  
  - [ ]* 5.2 Write property test for event triggering
    - **Property 4: Event triggers workflow execution**
    - **Validates: Requirements 2.1, 3.1, 4.1**

- [x] 6. Checkpoint - Verify order confirmation flow
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement shipping notification email workflow
  - [x] 7.1 Create workflow directory structure
    - Create src/workflows/shipping-notification-email/ directory
    - Create src/workflows/shipping-notification-email/steps/ directory
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 7.2 Implement retrieve fulfillment details step
    - Create steps/retrieve-fulfillment-details.ts
    - Retrieve fulfillment with relations: order, labels
    - Extract order number, customer email, tracking number
    - Handle missing tracking information gracefully
    - _Requirements: 3.2, 3.5, 3.6_
  
  - [x] 7.3 Implement format shipping email step
    - Create steps/format-shipping-email.ts
    - Generate HTML email with shipping details
    - Include order number, tracking number, carrier info
    - Handle missing tracking gracefully (send without tracking)
    - _Requirements: 3.3, 3.6, 6.2, 6.4_
  
  - [x] 7.4 Create shipping notification workflow
    - Create index.ts with workflow definition
    - Define input type: { fulfillment_id: string }
    - Chain: retrieve → format → send (reuse send-email step)
    - Return WorkflowResponse with success status
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 7.5 Update fulfillment-created subscriber
    - Modify existing src/subscribers/fulfillment-created.ts
    - Add shipping notification workflow trigger for all fulfillments
    - Keep existing mbengsend workflow logic
    - _Requirements: 3.1_

- [x] 8. Implement welcome email workflow
  - [x] 8.1 Create workflow directory structure
    - Create src/workflows/welcome-email/ directory
    - Create src/workflows/welcome-email/steps/ directory
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 8.2 Implement retrieve customer details step
    - Create steps/retrieve-customer-details.ts
    - Retrieve customer with first_name, last_name, email
    - Handle missing data gracefully
    - _Requirements: 4.2, 4.5_
  
  - [x] 8.3 Implement format welcome email step
    - Create steps/format-welcome-email.ts
    - Generate HTML email with personalized greeting
    - Include customer name and store introduction
    - _Requirements: 4.3, 6.3, 6.4_
  
  - [x] 8.4 Create welcome email workflow
    - Create index.ts with workflow definition
    - Define input type: { customer_id: string }
    - Chain: retrieve → format → send (reuse send-email step)
    - Return WorkflowResponse with success status
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 9. Implement customer created subscriber
  - [x] 9.1 Create customer-created subscriber
    - Create src/subscribers/customer-created.ts
    - Implement handler function that triggers welcome email workflow
    - Export config with event: "customer.created"
    - Extract customer_id from event data
    - _Requirements: 4.1_

- [x] 10. Final checkpoint - Verify all workflows and search
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The send-email step (4.4) is reusable across all three email workflows
- The fulfillment-created subscriber already exists and needs enhancement, not replacement
- All workflows should handle errors gracefully without blocking core operations
- Property tests validate universal correctness across all inputs
- Unit tests validate specific edge cases and error conditions
- Each workflow follows the same pattern: retrieve data → format email → send email

