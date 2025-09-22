# Trivia Question Visualizer

A React application that visualizes data from the Open Trivia DB API. This project allows users to explore trivia questions by category and difficulty level through interactive charts.

## Features

- View a list of trivia categories
- See the distribution of questions by category
- See the distribution of questions by difficulty level
- Filter questions by selecting a specific category
- Interactive charts using Recharts library

## Technologies Used

- React (with functional components and hooks)
- TypeScript
- Recharts for data visualization
- Axios for API requests
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/test-visualization.git
cd test-visualization
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

## Deployment

### GitHub Pages

To deploy this application to GitHub Pages:

1. Add the `homepage` field to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/test-visualization"
}
```

2. Install the `gh-pages` package:
```
npm install --save-dev gh-pages
```

3. Add deployment scripts to `package.json`:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy the application:
```
npm run deploy
```

## Data Source

This application uses data from the [Open Trivia Database](https://opentdb.com), a free-to-use, user-contributed trivia question database.