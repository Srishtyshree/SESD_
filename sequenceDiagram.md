# Sequence Diagram — Library-Lite

## Main Flow: Member Borrows a Book (End-to-End)

This sequence diagram shows the complete flow from a member searching for a book to successfully borrowing it, including the librarian's role and system-side processing.

```mermaid
sequenceDiagram
    actor Member
    actor Librarian
    participant Frontend
    participant AuthService
    participant BookService
    participant BorrowService
    participant FineService
    participant NotificationService
    participant Database
    participant EmailServer

    %% Step 1: Member Login
    Member->>Frontend: Enter credentials (email + password)
    Frontend->>AuthService: POST /api/v1/auth/login
    AuthService->>Database: Query user by email
    Database-->>AuthService: Return user record
    AuthService->>AuthService: Verify password (bcrypt)
    AuthService-->>Frontend: Return JWT token
    Frontend-->>Member: Login successful, redirect to dashboard

    %% Step 2: Member Searches for a Book
    Member->>Frontend: Search book by title/author/ISBN
    Frontend->>BookService: GET /api/v1/books?search=...
    BookService->>Database: Query books with filters
    Database-->>BookService: Return matching books
    BookService-->>Frontend: Return paginated book list
    Frontend-->>Member: Display search results with availability

    %% Step 3: Member Requests to Borrow
    Member->>Frontend: Click "Request Borrow" on available book
    Frontend->>BorrowService: POST /api/v1/borrows/request
    Note over BorrowService: Validate: member has no unpaid fines
    BorrowService->>FineService: Check member's outstanding fines
    FineService->>Database: Query unpaid fines for member
    Database-->>FineService: Return fine records
    FineService-->>BorrowService: No outstanding fines

    %% Step 4: Librarian Issues the Book
    BorrowService->>Database: Create borrow request (PENDING)
    Database-->>BorrowService: Borrow request created
    BorrowService-->>Frontend: Request submitted, awaiting librarian
    Frontend-->>Member: "Borrow request submitted"

    Librarian->>Frontend: View pending borrow requests
    Frontend->>BorrowService: GET /api/v1/borrows/pending
    BorrowService->>Database: Query pending borrow requests
    Database-->>BorrowService: Return pending list
    BorrowService-->>Frontend: Display pending requests

    Librarian->>Frontend: Approve and issue book
    Frontend->>BorrowService: PATCH /api/v1/borrows/:id/issue
    BorrowService->>Database: Update borrow status to ACTIVE
    BorrowService->>Database: Set dueDate = today + 14 days
    BorrowService->>Database: Update book availability to FALSE
    Database-->>BorrowService: Records updated

    %% Step 5: Notification Sent
    BorrowService->>NotificationService: Trigger BOOK_ISSUED event
    NotificationService->>EmailServer: Send "Book Issued" email to member
    EmailServer-->>NotificationService: Email sent
    NotificationService-->>BorrowService: Notification dispatched
    BorrowService-->>Frontend: Book issued successfully
    Frontend-->>Librarian: Confirmation displayed
    Frontend-->>Member: Email notification received
```

---

## Secondary Flow: Member Returns a Book

```mermaid
sequenceDiagram
    actor Member
    actor Librarian
    participant Frontend
    participant BorrowService
    participant FineService
    participant ReservationService
    participant NotificationService
    participant Database
    participant EmailServer

    %% Return Process
    Librarian->>Frontend: Process book return (scan/select)
    Frontend->>BorrowService: PATCH /api/v1/borrows/:id/return
    BorrowService->>Database: Get borrow record
    Database-->>BorrowService: Return borrow details (dueDate, memberId, bookId)

    %% Fine Calculation
    BorrowService->>FineService: Calculate fine (returnDate vs dueDate)
    FineService->>FineService: Apply fine strategy (₹5/day overdue)
    alt Book returned late
        FineService->>Database: Create fine record
        Database-->>FineService: Fine created
        FineService->>NotificationService: Send overdue fine notification
        NotificationService->>EmailServer: Email member about fine
    else Book returned on time
        FineService-->>BorrowService: No fine applicable
    end

    %% Update Book Status
    BorrowService->>Database: Update borrow status to RETURNED
    BorrowService->>Database: Update book availability to TRUE
    Database-->>BorrowService: Updated

    %% Check Reservation Queue
    BorrowService->>ReservationService: Check reservation queue for this book
    ReservationService->>Database: Query next reservation in queue
    Database-->>ReservationService: Return next reservation (if any)
    alt Reservation exists
        ReservationService->>NotificationService: Notify next member in queue
        NotificationService->>EmailServer: Send "Book Available" email
        EmailServer-->>NotificationService: Email sent
    else No reservation
        ReservationService-->>BorrowService: No pending reservations
    end

    BorrowService-->>Frontend: Return processed successfully
    Frontend-->>Librarian: Confirmation displayed
```

---

## Flow Summary

| Step | Actor | Action |
|---|---|---|
| 1 | Member | Login with JWT authentication |
| 2 | Member | Search books via catalog |
| 3 | Member | Submit borrow request |
| 4 | Librarian | Approve and issue book |
| 5 | System | Send email notification |
| 6 | Librarian | Process return |
| 7 | System | Calculate fine if overdue |
| 8 | System | Notify next member in reservation queue |
