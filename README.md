# SESD - Luminary Archive
**A Premium Digital Library & Reading Experience**

The Luminary Archive is a state-of-the-art web application designed for bibliophiles and researchers. It provides a seamless interface for exploring a vast collection of volumes, enriched with real-time metadata from global sources, and offers an integrated, distraction-free reading experience.

---

## 🏛️ Project Vision
To bridge the gap between physical archives and digital accessibility by providing a "Living Library" where metadata is dynamic, reading is immersive, and administration is effortless.

## 🚀 Core Features

### 📖 Immersive Reader
*   **Integrated View**: Read volumes directly in the browser via a customized iframe reader.
*   **Archival Resiliency**: Intelligent fallback mechanisms (PDF -> Web Reader -> External Preview) ensure content is always accessible.
*   **Metadata Enrichment**: Automatically pulls descriptions, authors, and cover art using ISBN-based integration with Google Books.

### 🔍 Smart Archive Search
*   **Genre Navigation**: Explore curated corridors like Fiction, Sci-Fi, Historical, and more.
*   **Real-time Filtering**: Instantly narrow down results by title, author, or category.
*   **Visual Discovery**: Premium card-based layout with high-quality archival imagery.

### 🛡️ Administrative Suite
*   **Catalogue Management**: Full control over the digital archive.
*   **Metadata Overrides**: Manually correct or update reading links (PDF/Web) to bypass embedding restrictions.
*   **User Oversight**: Manage "Archive Fellows" (users) and their roles within the ecosystem.

---

## 🛠️ Technology Stack

### Frontend
*   **Core**: React.js
*   **Styling**: Vanilla CSS (Premium "Archive" Aesthetic)
*   **Routing**: React Router DOM
*   **Icons/Imagery**: Custom-curated archival assets and HSL-based design tokens.

### Backend
*   **Environment**: Node.js & Express
*   **Database**: PostgreSQL (Structured Archival Data)
*   **Integration**: Google Books API (Metadata Engine)
*   **Authentication**: JWT-based Secure Sessions

---

## 🏗️ Architecture
The project follows a clean service-repository pattern to ensure scalability and maintainability.

*   **Models**: Define the structure of books and users.
*   **Repositories**: Handle direct database interactions.
*   **Services**: Implement business logic (e.g., metadata enrichment, reader prioritization).
*   **Controllers**: Bridge the gap between HTTP requests and system logic.

Detailed diagrams are available in the root directory:
*   [Class Diagram](file:///Users/srishtyshree/Desktop/SESD_/classDiagram.md)
*   [ER Diagram](file:///Users/srishtyshree/Desktop/SESD_/ErDiagram.md)
*   [Sequence Diagram](file:///Users/srishtyshree/Desktop/SESD_/sequenceDiagram.md)
*   [Use Case Diagram](file:///Users/srishtyshree/Desktop/SESD_/useCaseDiagram.md)

---

## 🚦 Getting Started

### Prerequisites
*   Node.js (v16+)
*   PostgreSQL
*   A Google Books API key (optional, for metadata enrichment)

### Installation
1.  **Clone the Archive**:
    ```bash
    git clone [repository-url]
    ```
2.  **Setup Backend**:
    ```bash
    cd backend
    npm install
    cp .env.example .env # Configure your database credentials
    npm start
    ```
3.  **Setup Frontend**:
    ```bash
    cd ../frontend
    npm install
    npm start
