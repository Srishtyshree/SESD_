# Project Idea: Library-Lite 📚

## Overview

**Library-Lite** is a full-stack Library Management System that enables libraries to digitize their operations — from cataloging books to managing member borrowing, reservations, fines, and notifications. It is designed with a backend-first approach following clean software engineering and system design principles.

---

## Problem Statement

Traditional libraries rely on manual processes for book tracking, member management, and fine collection. This leads to inefficiencies, errors, and a poor user experience. Library-Lite solves this by providing a centralized digital platform for both librarians and members.

---

## Scope

### Core Modules

| Module | Description |
|---|---|
| **User Management** | Registration, login, role-based access (Admin, Librarian, Member) |
| **Book Catalog** | Add, update, delete, and search books by title, author, genre, ISBN |
| **Borrowing System** | Issue books, return books, track due dates |
| **Reservation System** | Reserve books that are currently checked out |
| **Fine Management** | Auto-calculate overdue fines, mark as paid |
| **Notifications** | Email/in-app alerts for due dates, availability, fines |
| **Reports & Analytics** | Most borrowed books, active members, overdue reports |

---

## Key Features

- 🔐 **JWT-based Authentication** with role-based access control (RBAC)
- 📖 **Book Catalog Management** with search, filter, and pagination
- 🔄 **Borrow & Return Workflow** with due date tracking
- 📅 **Reservation Queue** — auto-notify next member when book is returned
- 💰 **Automated Fine Calculation** for overdue books
- 📧 **Email Notifications** for due dates and availability
- 📊 **Admin Dashboard** with analytics and reports
- 🧹 **Clean Architecture** — Controllers → Services → Repositories → Database

---

## Tech Stack

### Backend (75% focus)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (relational data) + Redis (caching/sessions)
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Email**: Nodemailer
- **Testing**: Jest + Supertest
- **Architecture**: Layered (Controller → Service → Repository)

### Frontend (25% focus)
- **Framework**: React.js (TypeScript)
- **State Management**: Redux Toolkit
- **UI Library**: Tailwind CSS + shadcn/ui
- **HTTP Client**: Axios

---

## Software Engineering Principles Applied

- **OOP**: Classes for `User`, `Book`, `BorrowRecord`, `Reservation`, `Fine` with encapsulation and inheritance
- **Design Patterns**:
  - *Repository Pattern* — data access abstraction
  - *Strategy Pattern* — fine calculation strategies (daily, weekly)
  - *Observer Pattern* — notification triggers on borrow/return events
  - *Factory Pattern* — creating different user types (Admin, Librarian, Member)
- **Clean Code**: Single Responsibility, Dependency Injection, Interface Segregation
- **RESTful API**: Proper HTTP methods, status codes, and versioning (`/api/v1/`)

---

## Out of Scope (for this milestone)

- Mobile app
- Payment gateway integration
- Multi-branch library support
- AI-based book recommendations
