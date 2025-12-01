---
sidebar_position: 2
---

# Installation

This guide will help you set up the DOTA Server for local development or deployment.

::::tip Quick Checklist
- Docker and Docker Compose installed
- Node.js 18+ and Git installed
- Copy `.env` from `.env.example` and update values
- Start services: `docker-compose up`
- Verify: `curl http://localhost:3010/health` returns status ok
::::

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher
- **Docker** and Docker Compose (for local development)
- **Git** for cloning the repository
- **MySQL** or **PostgreSQL** (or use Docker containers)
- **Redis** (optional, for analytics)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/dream-horizon-org/delivr.git
cd delivr/delivr-server-ota
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration. See [Configuration Guide](/dota/server/configuration) for detailed options.

### 4. Start with Docker (Recommended)

The easiest way to get started is using Docker Compose:

```bash
docker-compose up
```

This will start:
- DOTA Server API
- MySQL database
- Redis cache
- LocalStack (for S3 emulation)

The server will be available at `http://localhost:3010`

::::success Server Ready
✅ Your DOTA Server is now running! Keep it running for the rest of the setup.
::::

## Manual Setup

If you prefer to run services manually:

### 1. Database Setup

#### Using MySQL

```bash
# Create database
mysql -u root -p
CREATE DATABASE delivr_ota;
```

#### Using PostgreSQL

```bash
# Create database
createdb delivr_ota
```

### 2. Configure Environment Variables

Set the following in your `.env`:

```bash
# Database Configuration
DB_DIALECT=mysql  # or 'postgres'
DB_HOST=localhost
DB_PORT=3306      # 5432 for PostgreSQL
DB_NAME=delivr_ota
DB_USER=your_username
DB_PASSWORD=your_password

# Server Configuration
PORT=3010
NODE_ENV=development

# Storage Configuration
STORAGE_PROVIDER=local  # or 's3', 'azure'
```

### 3. Run Migrations

Initialize the database schema:

```bash
npm run migrate
```

### 4. Start the Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

## Development Mode

For active development with auto-reload:

```bash
npm run dev
```

This starts the server with:
- Hot reloading on code changes
- Detailed logging
- Source maps for debugging

## Verification

Test that the server is running:

```bash
curl http://localhost:3010/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Docker Setup Details

### Services Included

The `docker-compose.yml` includes:

```yaml
services:
  app:        # DOTA Server API
  mysql:      # Database
  redis:      # Cache & Analytics
  localstack: # AWS S3 Emulation
```

### Accessing Services

- **API Server**: http://localhost:3010
- **MySQL**: localhost:3306
- **Redis**: localhost:6379
- **LocalStack S3**: http://localhost:4566

### Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app

# Rebuild containers
docker-compose up --build
```

## Environment Modes

### Local Development

Uses emulated services for easy development:

```bash
NODE_ENV=development
STORAGE_PROVIDER=local
DB_DIALECT=mysql
```

### AWS Deployment

Configure for AWS services:

```bash
NODE_ENV=production
STORAGE_PROVIDER=s3
DB_DIALECT=mysql
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
```

### Azure Deployment

Configure for Azure services:

```bash
NODE_ENV=production
STORAGE_PROVIDER=azure
AZURE_STORAGE_CONNECTION_STRING=your_connection_string
```

## Database Seeding

For development, you can seed the database with sample data:

```bash
npm run seed
```

## Troubleshooting

### Port Already in Use

If port 3010 is in use, change it in `.env`:

```bash
PORT=3011
```

### Database Connection Failed

Verify database credentials and that the database server is running:

```bash
# Test MySQL connection
mysql -h localhost -u your_user -p

# Test PostgreSQL connection
psql -h localhost -U your_user -d delivr_ota
```

### Docker Issues

If Docker services won't start:

```bash
# Clean up containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up
```

### Migration Errors

If migrations fail:

```bash
# Revert migrations
npm run migrate:undo

# Re-run migrations
npm run migrate
```

## Next Steps

- [Configure your deployment](/dota/server/configuration)
- [Learn about deployment strategies](/dota/server/deployment)
- [Explore the API](/dota/server/api-reference)
- [Set up the Web Panel](/dota/web-panel/overview)

