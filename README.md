# GreenImpactFund

# Frontend Service
 
This is the frontend service for GREENIMPACTFUND, built with React and Redux.
## Prerequisites
 
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
 
## Setup
 
1. Install dependencies:
   ```bash
   npm install
   ```
 
## Available Scripts
 
In the project directory, you can run:
 
### `npm start`
 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
 
The page will reload when you make changes.\
You may also see any lint errors in the console.
 
### `npm test`
 
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
 
### `npm run build`
 
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
 
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
 
## Project Structure Explained
 
- `src/`: Source files
  - `redux/`: Redux state management
    - `store.js`: Redux store configuration
    - `slices/`: Redux toolkit slices
      - `uiSlice.js`: UI-related state management
  - `App.js`: Main application component
  - `index.js`: Application entry point
 
## State Management
 
This project uses Redux Toolkit for state management. The store is configured in `src/redux/store.js`, and individual slices of state are managed in the `src/redux/slices/` directory.
 
### Available Slices:
- `uiSlice`: Manages UI-related state
 
## Development
 
### Code Style
 
- Follow the existing code style
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
 
### Adding New Features
 
1. Create new components in the `src/components` directory
2. Add new Redux slices in `src/redux/slices` if needed
3. Update tests accordingly
4. Update documentation as necessary


# Backend Service-----------------------------------------------------
 
This is the backend service for GREENIMPACTFUND, built with Flask and SQLAlchemy.
 
## Project Structure
 
- `app/`: Main application package
  - `routes/`: API endpoint definitions
    - `organizations.py`: Organization-related endpoints
    - `stories.py`: Story-related endpoints
  - `models/`: Database models and schemas
    - `models.py`: Database model definitions
  - `extensions/`: Flask extensions
    - `extensions.py`: Extension initialization
  - `app.py`: Application factory and configuration
  - `config.py`: Configuration settings
- `migrations/`: Database migration files
  - `versions/`: Contains all database migrations
  - `env.py`: Alembic environment configuration
  - `alembic.ini`: Alembic configuration file
  - `README`: Migration documentation
  - `script.py.mako`: Migration script template
 
## Prerequisites
 
- Python 3.8 or higher
- pip (Python package manager)
- PostgreSQL (or your database of choice)
 
## Setup
 
1. Create a virtual environment:
 
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```
 
2. Install dependencies:
```bash
pip install -r requirements.txt
```
 
3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```
 
4. Initialize the database:
```bash
flask db upgrade
```
 
## Running the Application
 
To run the development server:
```bash
flask run
```
 
The API will be available at `http://localhost:5000`
 
## Database Migrations
 
This project uses Flask-Migrate (Alembic) for database migrations.
 
- Create a new migration:
```bash
flask db migrate -m "Description of changes"
```
 
- Apply migrations:
```bash
flask db upgrade
```
 
- Rollback migrations:
```bash
flask db downgrade
```
 
## API Endpoints
 
### Organizations
- `GET /api/organizations` - List all organizations
- `POST /api/organizations` - Create a new organization
- `GET /api/organizations/<id>` - Get organization details
- `PUT /api/organizations/<id>` - Update organization
- `DELETE /api/organizations/<id>` - Delete organization
 
### Stories
- `GET /api/stories` - List all stories
- `POST /api/stories` - Create a new story
- `GET /api/stories/<id>` - Get story details
- `PUT /api/stories/<id>` - Update story
- `DELETE /api/stories/<id>` - Delete story
 
## Development
 
### Project Structure
- `app/`: Main application package
  - `routes/`: API endpoint definitions
    - `organizations.py`: Organization-related endpoints
    - `stories.py`: Story-related endpoints
  - `models/`: Database models and schemas
    - `models.py`: Database model definitions
  - `extensions/`: Flask extensions
    - `extensions.py`: Extension initialization
  - `app.py`: Application factory and configuration
  - `config.py`: Configuration settings
- `migrations/`: Database migration files
  - `versions/`: Contains all database migrations
  - `env.py`: Alembic environment configuration
  - `alembic.ini`: Alembic configuration file
 
### Adding New Routes
1. Create a new route file in `app/routes/`
2. Define your route handlers
3. Register the blueprint in `app.py`
 
## Testing
 
To run tests:
```bash
pytest
```
 
## Contributing
 
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
 
## License
 
MIT License
 
Copyright (c) 2024 GREENIMPACTFUND
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
