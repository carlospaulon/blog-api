# Blog API

Personal blogging platform REST API built with NestJS, TypeORM and PostgreSQL.

## Features

- ✅ Complete CRUD operations for articles
- ✅ Advanced filtering and pagination
- ✅ Full-text search in title and content
- ✅ SEO-friendly slug URLs
- ✅ PostgreSQL with TypeORM
- ✅ Data validation with class-validator
- ✅ Database migrations
- ✅ Database seeding
- ✅ Rate limiting (10 requests/minute)
- ✅ Security headers with Helmet
- ✅ CORS configured
- ✅ Interactive API documentation (Swagger)
- ✅ Global exception handling
- ✅ Structured logging (exceptions)

## Stack

- **Framework:** NestJS 10.x
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL 14+
- **ORM:** TypeORM 0.3.x
- **Validation:** class-validator
- **Documentation:** Swagger/OpenAPI
- **Security:** Helmet, Throttler, Dotenv

## Requirements

- Node.js 18+ or 20+
- PostgreSQL 14+
- npm or yarn

## Quick Start

### 1. Clone repository

```bash
git clone https://github.com/carlospaulon/blog-api.git
cd blog-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create env file

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=blog_api
PORT=3000
NODE_ENV=development
```

### 4. Create database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE blog_api;

# Exit
\q
```

### 5. Run migrations

```bash
npm run migration:run
```

### 6. Seed database (optional)

```bash
npm run seed:run
```

This will create 10 sample articles with tags.

### 7. Start development server

```bash
npm run start:dev
```

### 8. Access the application

- **API:** http://localhost:3000
- **Swagger Documentation:** http://localhost:3000/api/docs

## API Endpoints

### Articles

| Method   | Endpoint                      | Description                    |
| -------- | ----------------------------- | ------------------------------ |
| `POST`   | `/api/v1/articles`            | Create new article             |
| `GET`    | `/api/v1/articles`            | List all articles with filters |
| `GET`    | `/api/v1/articles/:id`        | Get article by ID              |
| `GET`    | `/api/v1/articles/slug/:slug` | Get article by slug            |
| `PUT`    | `/api/v1/articles/:id`        | Update article (full)          |
| `PATCH`  | `/api/v1/articles/:id`        | Update article (partial)       |
| `DELETE` | `/api/v1/articles/:id`        | Delete article                 |

### Query Parameters (GET /articles)

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `published` - Filter by published status (true/false)
- `author` - Filter by author name (case-insensitive)
- `tag` - Filter by tag
- `search` - Search in title or content
- `sortBy` - Sort field (createdAt, updatedAt, title, publishedAt, viewCount)
- `order` - Sort order (ASC, DESC)

### Example Usage

**Create Article:**

```bash
POST http://localhost:3000/api/v1/articles
Content-Type: application/json

{
  "title": "My First Article",
  "content": "This is the content of my first article...",
  "author": "Carlos P.",
  "summary": "A brief summary",
  "tags": ["nodejs", "nestjs", "typescript"],
  "published": true
}
```

**List Articles with Filters:**

```bash
GET http://localhost:3000/api/v1/articles?published=true&tag=nodejs&page=1&limit=10
```

**Search Articles:**

```bash
GET http://localhost:3000/api/v1/articles?search=nestjs&sortBy=createdAt&order=DESC
```

**Get Article by Slug:**

```bash
GET http://localhost:3000/api/v1/articles/slug/my-first-article
```

## Database

```bash
# Generate new migration
npm run migration:generate src/database/migrations/<Name>

# Run / Revert migrations
npm run migration:run
npm run migration:revert

# Run seed or reset
npm run seed:run
npm run db:reset
```

## Testing

```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run test:cov    # Coverage
```

## Environment Variables

| Variable         | Description                          | Default               |
| ---------------- | ------------------------------------ | --------------------- |
| `DB_HOST`        | PostgreSQL host                      | localhost             |
| `DB_PORT`        | PostgreSQL port                      | 5432                  |
| `DB_USERNAME`    | PostgreSQL username                  | postgres              |
| `DB_PASSWORD`    | PostgreSQL password                  | -                     |
| `DB_DATABASE`    | Database name                        | blog_api_dev          |
| `PORT`           | Application port                     | 3000                  |
| `NODE_ENV`       | Environment (development/production) | development           |
| `CORS_ORIGIN`    | Allowed CORS origin                  | http://localhost:3000 |
| `THROTTLE_TTL`   | Rate limit time window (ms)          | 60000                 |
| `THROTTLE_LIMIT` | Max requests per TTL                 | 10                    |

## Security

- **Helmet:** HTTP Security headers
- **CORS:** Cross-origin configuration
- **Throttler:** Request rate limiting(10 req/min)
- **Input Validation:** class-validator on all DTOs
- **SQL Injection Prevention:** TypeORM parameterized queries
- **Error Handling:** No sensitive data exposure in production

## Scripts

| Command                      | Description                            |
| ---------------------------- | -------------------------------------- |
| `npm run start`              | Start production server                |
| `npm run start:dev`          | Start development server with watch    |
| `npm run build`              | Build for production                   |
| `npm run migration:generate` | Generate migration from entity changes |
| `npm run migration:run`      | Run pending migrations                 |
| `npm run migration:revert`   | Revert last migration                  |
| `npm run seed:run`           | Populate database with sample data     |
| `npm run db:reset`           | Reset and repopulate database          |
| `npm run test`               | Run unit tests                         |
| `npm run test:e2e`           | Run end-to-end tests                   |


## Author

Carlos Paulon

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carlospaulon/)
[![github](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/carlospaulon)
