# Nela's Bakery — Cake Order App

A full-stack custom cake ordering web application built for Nela's Bakery, a home bakery based in Raleigh, NC. Live at [nelasbakery.com](https://nelasbakery.com).

---

## Overview

Customers can browse the site, view the gallery, learn about the baker, and place custom cake orders or seasonal special orders. Onela receives an email notification for every order placed.

---

## Tech Stack

### Frontend
- **React** (Vite)
- **Hosted on:** AWS S3 + CloudFront
- **Domain:** nelasbakery.com (Route 53 + ACM SSL)

### Backend
- **Node.js + Express**
- **Containerized with:** Docker
- **Hosted on:** AWS EC2 (private subnet, behind ALB)

### Database
- **AWS RDS MySQL** (private subnet)
- Tables: `orders`, `specials_orders`

### Infrastructure
- **IaC:** Terraform
- **Networking:** VPC, public/private subnets, ALB, NAT Gateway
- **Security:** IAM roles, Secrets Manager, Security Groups, ACM
- **Email:** AWS SES
- **DNS:** Route 53
- **CDN:** CloudFront with OAC

### CI/CD
- **GitHub Actions**
  - Frontend: build → S3 sync → CloudFront invalidation
  - Backend: git pull → Docker rebuild → container restart via SSM

---

## Project Structure

In Progress...

---

## API Routes

### Cake Orders
| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | ALB health check |
| POST | `/api/orders` | Submit a custom cake order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get a single order |
| PATCH | `/api/orders/:id` | Update order status |

### Specials Orders
| Method | Route | Description |
|---|---|---|
| POST | `/api/specials/orders` | Submit a special order |
| GET | `/api/specials/orders` | Get all special orders |

---

## AWS Architecture

In Progress...

---

## Environment Variables

### Frontend (GitHub Secrets)
| Secret | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |
| `AWS_ACCESS_KEY` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_REGION` | AWS region |
| `S3_BUCKET` | Frontend S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |

### Backend (AWS Secrets Manager)
Stored in `cake-app/db-credentials`:
- `host` — RDS endpoint
- `database` — Database name
- `username` — DB username
- `password` — DB password
- `s3_uploads_bucket` — Uploads bucket name

---

## Infrastructure

Infrastructure is managed with Terraform in a separate repository: [cake-app-infra](https://github.com/omargriffin14/cake-app-infra)

Key resources:
- VPC with public and private subnets
- EC2 (t3.micro, Amazon Linux 2023, private subnet)
- RDS MySQL (private subnet, shared with Flask project)
- ALB (shared, path-based routing)
- S3 buckets (frontend, uploads, email storage)
- CloudFront distributions
- Route 53 hosted zone
- ACM SSL certificate
- SES domain identity
- Lambda (email forwarding)
- Secrets Manager

---

## Local Development

The backend requires AWS credentials with access to Secrets Manager. Without those, the app cannot connect to RDS.

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm start
```

---

## CI/CD

**Frontend pipeline** triggers on push to `main` when files in `frontend/` change:
1. Install dependencies
2. Build with Vite (injects `VITE_API_URL`)
3. Sync `dist/` to S3
4. Invalidate CloudFront cache

**Backend pipeline** triggers on push to `main` when files in `backend/` change:
1. Send SSM command to EC2
2. `git pull` latest code
3. `docker build --no-cache`
4. Stop and remove old container
5. Start new container with `--restart always`

---

## About Nela's Bakery

Nela's Bakery is a custom cake business based in Raleigh, NC. Every cake is handcrafted to order with attention to detail, balance of flavor, and love.

- **Instagram:** [@nelasbakeryofficial](https://instagram.com/nelasbakeryofficial)
- **TikTok:** [@nelasbakeryofficial](https://tiktok.com/@nelasbakeryofficial)
- **Email:** orders@nelasbakery.com
- **Website:** [nelasbakery.com](https://nelasbakery.com)

---

*Built with AWS, React, Node.js, Docker, Terraform, and GitHub Actions.*
