# OctoKus Item Management App

This project is a dynamic web application for managing a list of items. It is built using the PatternFly design system for a modern, enterprise-grade look and feel, with jQuery handling the DOM manipulation and user interactions.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Directory Structure](#directory-structure)
- [Core Technologies](#core-technologies)
- [Running Tests](#running-tests)
- [File Descriptions](#file-descriptions)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (which comes with Node.js) installed on your system.

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repository-url>
    cd my-dynamic-project
    \`\`\`

2.  **Install dependencies:**
    This command will download all necessary dependencies and automatically run the `postinstall` script to copy PatternFly and jQuery assets to the correct directories.
    \`\`\`bash
    npm install
    \`\`\`

4.  **Open \`index.html\` in your browser:**
    You can now open the \`index.html\` file directly in your web browser to see the application running.

## Directory Structure

The project follows a structured layout to keep code organized and maintainable.

\`\`\`
/my-dynamic-project
|-- /css
|   |-- patternfly.min.css 
|   \`-- styles.css
|-- /js
|   |-- jquery.min.js
|   \`-- app.js
|-- /node_modules
|-- /__tests__
|   \`-- app.test.js
|-- .gitignore
|-- index.html
|-- package.json
\`-- README.md
\`\`\`

## Core Technologies

- **PatternFly**: A comprehensive design system for enterprise web applications.
- **jQuery**: A fast, small, and feature-rich JavaScript library for DOM manipulation and event handling.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.

## Running Tests

This project uses Jest for unit testing. To run the tests, execute the following command in your terminal:

\`\`\`bash
npm test
\`\`\`

This command will look for test files in the \`__tests__\` directory and run them.

## File Descriptions

-   **\`/css\`**: Contains all stylesheets.
    -   \`patternfly.min.css\` & \`patternfly-additions.min.css\`: The core PatternFly library styles.
    -   \`styles.css\`: Custom styles for the application, including table and logo styling.

-   **\`/js\`**: Contains all JavaScript files.
    -   \`jquery.min.js\`: The jQuery library.
    -   \`app.js\`: The main application logic, including event handling for the table (add, edit, delete) and modal interactions.

-   **\`/__tests__\`**: Contains all unit tests.
    -   \`app.test.js\`: Unit tests for the application's core logic.

-   **\`index.html\`**: The main entry point of the application.

-   **\`package.json\`**: Defines project metadata, dependencies, and scripts.

-   **\`.gitignore\`**: Specifies which files and directories to ignore in version control (e.g., \`node_modules\`).
