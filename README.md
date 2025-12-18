# Hotel Reservation System

A full-stack hotel reservation platform built with Spring Boot, React, and MongoDB, deployed on AWS.

## Project Structure

```
hotel-reservation-system/
├── backend/          # Spring Boot REST API
├── frontend/         # React + Redux application
├── docs/             # Project documentation
└── .github/          # CI/CD workflows
```

## Tech Stack

### Backend

- Java 17+
- Spring Boot 3.x
- Spring Security (OAuth2)
- Spring Data MongoDB
- Maven

### Frontend

- React 18+
- Redux Toolkit
- RTK Query
- React Router
- Material-UI

### Database

- MongoDB (local development)
- AWS DocumentDB (production)

### Deployment

- AWS EC2 / Elastic Beanstalk (backend)
- AWS S3 + CloudFront (frontend)
- AWS DocumentDB (database)

## Getting Started

See [docs/SETUP.md](docs/SETUP.md) for detailed setup instructions.

### Quick Start

1. **Clone the repository**

```bash
   git clone https://github.com/YOUR_USERNAME/hotel-reservation-system.git
   cd hotel-reservation-system
```

2. **Backend Setup**

```bash
   cd backend
   ./mvnw spring-boot:run
```

3. **Frontend Setup**

```bash
   cd frontend
   npm install
   npm start
```

## Development Workflow

- `main` branch: Production-ready code
- `develop` branch: Integration branch
- Feature branches: `feature/your-feature-name`

### Branch Naming Convention

- `feature/guest-booking`
- `feature/room-management`
- `feature/payment-integration`
- `bugfix/fix-description`

## Team Members

- Jevaughn Steward - [Assignment TBD]
- Mason Malone - [Assignment TBD]
- Brandon Newman - [Assignment TBD]

## Documentation

- [Setup Guide](docs/SETUP.md)
- [API Contracts](docs/API_CONTRACTS.md)
- [AWS Deployment](docs/AWS_DEPLOYMENT.md)

## License
