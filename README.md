# Drag-and-Drop Application

This project is a React-based drag-and-drop application built with TypeScript and Vite. It provides a modern and efficient setup for creating interactive user interfaces with drag-and-drop functionality.

## Features

- **React**: A declarative JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool for modern web applications.
- **Drag-and-Drop**: Custom components for managing files and folders with drag-and-drop interactions.
- **State Management**: Global state management using a store.
- **Reusable Components**: Modular and reusable components for better scalability.

## Project Structure

The project is organized as follows:

```
public/          # Static assets
src/             # Source code
  ├── assets/    # Project-specific assets
  ├── components/
  │   ├── Breadcrumbs/  # Breadcrumb navigation component
  │   ├── FileCard/     # Component for displaying file cards
  │   ├── FolderCard/   # Component for displaying folder cards
  │   ├── Sidebar/      # Sidebar navigation component
  │   ├── Layout/       # Layout components
  ├── services/         # API service layer
  ├── store/            # Global state management
  ├── types/            # TypeScript type definitions
  ├── utils/            # Utility functions
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd drag-and-drop
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

The build output will be in the `dist/` directory.

## Backend Setup

This project requires a backend service to be running. Please follow these steps to set up the backend:

1. Clone the backend repository:
   ```bash
   git clone https://github.com/y0h3r/drag-and-drop-be
   ```
2. Navigate to the backend directory:
   ```bash
   cd drag-and-drop-be
   ```
3. Follow the instructions in the backend repository's README to install dependencies and start the server.

Ensure the backend is running before starting the frontend application.

## Limitations and Future Improvements

Due to time constraints, the following aspects of the project were not fully implemented or optimized:

- **State Management**: The current state management approach is not ideal and could be improved for better scalability and maintainability.
- **Service Layer**: The service layer lacks proper abstraction and could benefit from a more structured implementation.
- **Component Logic**: Some components contain business logic, making them less reusable and harder to test.
- **Unit Testing**: No unit tests were implemented, which limits the ability to ensure code reliability and prevent regressions.
- **Authentication**: The application does not include any form of authentication.
- **Environment Variables**: Support for environment variables was not added, which would improve configuration management.
- **Custom Hooks**: The project could benefit from custom hooks to encapsulate and reuse logic across components.

These improvements are planned for future iterations to enhance the overall quality and maintainability of the application.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
