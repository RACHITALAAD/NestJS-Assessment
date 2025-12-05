# NestJS Assessment 

A NestJS backend API with PostgreSQL and JWT authentication for managing users and tasks

---


## Features 
- User registration & login
- CRUD operations for users and tasks
- JWT-based authetication
- Validation and Error Handling
- Unit tests with Jest

---

## Tech Stack
- Nodejs & NestJS
- TypeORM
- PostgreSQL
- JWT
- Jest

---


## Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env file

```bash
PORT = 3000
DATABASE_HOST = localhost
DATABASE_USER = postgres
DATABASE_PASSWORD = <your-password>
DATABASE_NAME = task_db
JWT_SECRET=supersecret123 
JWT_EXPIRES_IN=3600s
```

### 4. Run the server

```bash
npm run start:dev
```

---

## API Endpoints

- Auth : /auth/register , /auth/login
- Users : /users
- Tasks : /tasks

---

## Testing

```bash
npm run test
```

---

## Author

Rachita Laad