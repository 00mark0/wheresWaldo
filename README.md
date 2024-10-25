# Where's Waldo Game

Welcome to the "Where's Waldo" game! This project is a web-based game where players can search for characters hidden in various images. The game includes features such as zooming, panning, and tracking scores.

## Features

- **Image Selection**: Choose from a variety of images to play the game.
- **Zoom and Pan**: Zoom in and out of the image and drag to pan for better navigation.
- **Character Detection**: Click on the image to find hidden characters.
- **Score Tracking**: Track and save your scores, and view the leaderboard.
- **Responsive Design**: The game is designed to be responsive and works on various screen sizes.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **API**: Axios for making HTTP requests

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Installation

1. **Fork and Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/wheresWaldo.git
   cd wheresWaldo
   ```

2. **Install dependencies**:

   ```sh
     cd api
   npm install
   npm start

    cd client
    npm install
   ```

3. **Set up the database**:

   - Create a PostgreSQL database.
   - Add a .env variable DATABASE_URL.
   - DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<db_name>

4. **Run database migrations**:

   ```sh
   npx prisma migrate dev
   ```

5. **Start the development server**:

   ```sh
   cd client
   npm run dev
   ```

6. **Open the application**:
   - Open your browser and navigate to `http://localhost:5173`.

## Usage

1. **Select an Image**: Choose an image from the menu to start the game.
2. **Find Characters**: Click on the image to find hidden characters. Use the zoom and pan features to navigate the image.
3. **Submit Score**: Once all characters are found, submit your score and view the leaderboard.

## Project Structure

- **client**: Contains the frontend code (React components, styles, etc.).
- **server**: Contains the backend code (Express server, API routes, database models, etc.).

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

## Contact

If you have any questions or feedback, feel free to reach out:

- Email: 00marko.r@gmail.com
- GitHub: [00mark0](https://github.com/00mark0)

Enjoy playing "Where's Waldo"!
