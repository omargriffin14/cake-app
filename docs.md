[aws-infrastructure.md](https://github.com/user-attachments/files/26914147/aws-infrastructure.md)
# AWS Infrastructure Documentation
**Region:** us-east-1  
**Last Updated:** April 2026  
**Owner:** Omar Griffin  

> This is a living document. Update it whenever infrastructure changes are made.

---

## Table of Contents
1. [Network Foundation](#1-network-foundation)
2. [Security Groups](#2-security-groups)
3. [Compute](#3-compute)
4. [Load Balancing](#4-load-balancing)
5. [Database](#5-database)
6. [Storage](#6-storage)
7. [CDN](#7-cdn)
8. [IAM](#8-iam)
9. [Secrets Manager](#9-secrets-manager)
10. [Email](#10-email-ses)
11. [Monitoring](#11-monitoring)
12. [CI/CD](#12-cicd)
13. [Resource Relationships](#13-resource-relationships)
14. [Traffic Flow](#14-traffic-flow)

---

## 1. Network Foundation

### VPC
| Property | Value |
|---|---|
| VPC ID | vpc-05181aef674299739 |
| CIDR Block | 10.0.0.0/16 |
| DNS Hostnames | Enabled |
| Purpose | Shared network for all project resources |

### Subnets
| Name | Subnet ID | Type | CIDR | Availability Zone | Used By |
|---|---|---|---|---|---|
| project-public-subnet | subnet-07acabb38c230fed5 | Public | 10.0.1.0/24 | us-east-1a | Flask EC2, ALB, NAT Gateway |
| project-public-subnet-2 | subnet-037f1bd6a3d16e6cd | Public | 10.0.3.0/24 | us-east-1b | ALB (multi-AZ) |
| project-private-subnet | subnet-0e508c9690e3c2526 | Private | 10.0.2.0/24 | us-east-1a | Cake App EC2, RDS |
| project-private-subnet-2 | subnet-0008ce95103f5dadd | Private | 10.0.4.0/24 | us-east-1b | RDS (multi-AZ) |

### Gateways & Routing
| Resource | ID/Name | Purpose |
|---|---|---|
| Internet Gateway | Attached to VPC | Allows public subnets to reach the internet |
| NAT Gateway | cake-app-nat-gateway (public subnet) | Allows private subnet resources to reach the internet outbound only |
| NAT Elastic IP | Attached to NAT Gateway | Static public IP used by NAT Gateway for outbound traffic |

### Route Tables
| Name | Associated Subnet | Routes |
|---|---|---|
| Public Route Table | project-public-subnet, project-public-subnet-2 | 0.0.0.0/0 → Internet Gateway |
| cake-app-private-rt | project-private-subnet | 0.0.0.0/0 → NAT Gateway, local VPC traffic |

---

## 2. Security Groups

### ALB Security Group
| Property | Value |
|---|---|
| Name | flask-alb-sg (shared by both apps) |
| Inbound | Port 80 (HTTP) from 0.0.0.0/0, Port 443 (HTTPS) from 0.0.0.0/0 |
| Outbound | All traffic |
| Purpose | Allows public internet traffic into the ALB |

### Flask App EC2 Security Group
| Property | Value |
|---|---|
| Inbound | Port 5000 from ALB Security Group only |
| Outbound | All traffic |
| Purpose | Allows only ALB to reach the Flask EC2 on port 5000 |

### Cake App Backend Security Group
| Name | cake-app-backend-sg |
|---|---|
| Inbound | Port 5000 from ALB Security Group only |
| Outbound | All traffic |
| Purpose | Allows only ALB to reach the cake backend EC2 on port 5000 |

### RDS Security Group
| Property | Value |
|---|---|
| Inbound | Port 3306 (MySQL) from Flask EC2 SG and Cake App Backend SG |
| Outbound | All traffic |
| Purpose | Allows only application EC2s to connect to the database |

---

## 3. Compute

### Flask App EC2
| Property | Value |
|---|---|
| Instance ID | i-0e13bf6d2b83a0f75 |
| Name | flask-app (or similar) |
| AMI | Amazon Linux 2023 |
| Instance Type | t2.micro |
| Subnet | project-public-subnet (public) |
| Elastic IP | Yes |
| Key Pair | Existing key pair |
| IAM Role | Flask app role (Secrets Manager access) |
| Software | Docker, Flask app container |
| Purpose | Hosts the Flask two-tier web application |

### Cake App Backend EC2
| Property | Value |
|---|---|
| Instance ID | i-0ce8a3c95dfa9e78c |
| Name | cake-app-backend |
| AMI | Amazon Linux 2023 |
| Instance Type | t3.micro |
| Subnet | project-private-subnet (private — no public IP) |
| Key Pair | Existing key pair |
| IAM Role | cake-app-backend-role |
| Software | Docker (Node.js/Express container — Milestone 2) |
| Purpose | Hosts the Nela's Bakery cake order API |

---

## 4. Load Balancing

### Application Load Balancer (ALB)
| Property | Value |
|---|---|
| Name | flask-alb |
| ARN | arn:aws:elasticloadbalancing:us-east-1:380821404208:loadbalancer/app/flask-alb/e7a3b75bf9240d8d |
| DNS | flask-alb-1442848183.us-east-1.elb.amazonaws.com |
| Scheme | Internet-facing |
| Subnets | project-public-subnet, project-public-subnet-2 |
| Security Group | ALB Security Group |
| Purpose | Single ALB shared by both Flask app and cake app |

### Target Groups
| Name | Port | Protocol | Health Check Path | Registered Instance |
|---|---|---|---|---|
| Flask Target Group | 5000 | HTTP | /health | Flask EC2 |
| cake-app-backend-tg | 5000 | HTTP | /api/health | Cake App Backend EC2 |

### Listener Rules
| Listener | Priority | Condition | Action |
|---|---|---|---|
| HTTPS:443 | 10 | Path: /api/* | Forward → cake-app-backend-tg |
| HTTPS:443 | Default | All other traffic | Forward → Flask Target Group |

---

## 5. Database

### RDS MySQL Instance
| Property | Value |
|---|---|
| Identifier | flask-db |
| Endpoint | flask-db.c0pocwom8584.us-east-1.rds.amazonaws.com |
| Engine | MySQL 8.x |
| Instance Class | db.t3.micro |
| Subnet | project-private-subnet, project-private-subnet-2 (Multi-AZ) |
| Security Group | RDS Security Group |
| Purpose | Shared RDS instance for both apps |

### Databases (Schemas)
| Database Name | Used By |
|---|---|
| flask_app (or similar) | Flask two-tier app |
| cake_orders | Nela's Bakery cake order app |

### cake_orders Table: orders
| Column | Type | Description |
|---|---|---|
| id | INT AUTO_INCREMENT PK | Unique order ID |
| customer_name | VARCHAR(100) | Customer full name |
| customer_email | VARCHAR(100) | Customer email for confirmation |
| customer_phone | VARCHAR(20) | Customer phone number |
| cake_flavor | VARCHAR(50) | Selected flavor |
| cake_flavor_other | VARCHAR(100) | Custom flavor if "Other" selected |
| shape | VARCHAR(50) | Selected shape |
| shape_other | VARCHAR(100) | Custom shape if "Other" selected |
| height | VARCHAR(50) | Selected height/layers |
| height_other | VARCHAR(100) | Custom height if "Other" selected |
| size | VARCHAR(50) | Selected size |
| size_other | VARCHAR(100) | Custom size if "Other" selected |
| border | VARCHAR(50) | Selected border style |
| border_other | VARCHAR(100) | Custom border if "Other" selected |
| custom_notes | TEXT | Additional customer notes |
| image_url | VARCHAR(255) | S3 URL of uploaded inspiration image |
| order_date | TIMESTAMP | Auto-set on insert |
| status | ENUM | pending / confirmed / completed / cancelled |

---

## 6. Storage

### S3 Buckets
| Name | Purpose | Public Access | Versioning |
|---|---|---|---|
| flask-static-assets-4003 | Flask app static files | Blocked (CloudFront only) | Enabled |
| cake-app-frontend-xxxx | React frontend static files | Blocked (CloudFront only) | Enabled |
| cake-app-uploads-xxxx | Customer inspiration image uploads | Blocked (EC2 IAM role only) | Enabled |

---

## 7. CDN

### CloudFront Distributions
| Purpose | Origin | OAC | SPA Fallback |
|---|---|---|---|
| Flask static assets | flask-static-assets-4003 S3 bucket | Yes | No |
| Cake app frontend | cake-app-frontend-xxxx S3 bucket | Yes | Yes (403/404 → index.html) |

---

## 8. IAM

### Roles
| Role Name | Attached To | Policies |
|---|---|---|
| Flask App Role | Flask EC2 | SecretsManagerReadWrite |
| cake-app-backend-role | Cake App Backend EC2 | SecretsManagerReadWrite, AmazonSSMManagedInstanceCore, cake-app-backend-s3-ses-policy (custom) |

### Custom Policies
| Policy Name | Permissions | Purpose |
|---|---|---|
| cake-app-backend-s3-ses-policy | s3:PutObject, s3:GetObject, s3:DeleteObject on uploads bucket; ses:SendEmail, ses:SendRawEmail | Allows backend EC2 to upload images to S3 and send confirmation emails via SES |

---

## 9. Secrets Manager

### Secrets
| Secret Name | Used By | Contents |
|---|---|---|
| flask-app/db-credentials (or similar) | Flask EC2 | RDS host, database, username, password |
| cake-app/db-credentials | Cake App Backend EC2 | RDS host, database name, username, password, S3 uploads bucket name |

---

## 10. Email (SES)

| Property | Value |
|---|---|
| Verified Identity | nelasbakeryofficial@gmail.com |
| Purpose | Sends order confirmation emails to customers |
| Region | us-east-1 |

---

## 11. Monitoring

### CloudWatch (Flask App)
| Resource | Type | Purpose |
|---|---|---|
| CloudWatch Alarms | CPU, network metrics | Alerts on Flask EC2 health |
| SNS Topic | Email notifications | Delivers alarm notifications |

> Cake app CloudWatch monitoring to be added in a future milestone.

---

## 12. CI/CD

### GitHub Actions
| Repo | Pipeline | Trigger | What It Does |
|---|---|---|---|
| aws-flask-app | deploy.yml | Push to main | Builds Docker image, pushes to EC2, restarts container |
| cake-app (planned) | backend.yml | Push to main | Builds Node.js Docker image, deploys to cake backend EC2 |
| cake-app (planned) | frontend.yml | Push to main | Builds React app, syncs to S3, invalidates CloudFront |
| cake-app-infra (planned) | terraform.yml | Push to main | Runs terraform plan/apply |

---

## 13. Resource Relationships

```
Internet
    │
    ▼
Internet Gateway
    │
    ▼
ALB (flask-alb) ── public subnets ── Security Group (port 80/443 open)
    │
    ├── Listener Rule: /api/* ──────────────────────────────────────────────────────┐
    │                                                                               │
    └── Default Rule ──────────────────────────┐                                   │
                                               ▼                                   ▼
                                    Flask Target Group                 Cake App Target Group
                                               │                                   │
                                               ▼                                   ▼
                                    Flask EC2 (public subnet)       Cake Backend EC2 (private subnet)
                                    i-0e13bf6d2b83a0f75             i-0ce8a3c95dfa9e78c
                                               │                                   │
                                               └──────────────┬────────────────────┘
                                                              │
                                                              ▼
                                                    RDS MySQL (private subnet)
                                                    flask-db.c0pocwom8584...
                                                    ├── flask_app database
                                                    └── cake_orders database

Cake Backend EC2 (private subnet)
    │
    ├── Outbound internet via NAT Gateway ──► Internet (Docker Hub, AWS APIs)
    ├── Secrets Manager ◄── IAM Role (credentials + S3 bucket name)
    ├── S3 uploads bucket ◄── IAM Role (image uploads)
    └── SES ◄── IAM Role (confirmation emails)

React Frontend
    │
    ▼
S3 (cake-app-frontend) ◄── CloudFront (OAC) ◄── Customer Browser
```

---

## 14. Traffic Flow

### Customer Places a Cake Order
```
Customer Browser
    │ HTTPS request to CloudFront URL
    ▼
CloudFront Distribution (cake-app frontend)
    │ Serves React app from S3
    ▼
Customer fills out order form in browser
    │ POST /api/orders (with optional image)
    ▼
ALB (flask-alb)
    │ Listener rule matches /api/*
    ▼
Cake App Target Group
    │
    ▼
Cake Backend EC2 (private subnet, port 5000)
    │ Node.js/Express handles request
    ├── Uploads image ──────────────────► S3 uploads bucket
    ├── Saves order ────────────────────► RDS MySQL (cake_orders)
    └── Sends confirmation email ───────► SES ──► Customer inbox
```

### Flask App Traffic
```
Customer Browser
    │ HTTPS request to ALB DNS
    ▼
ALB (flask-alb)
    │ Default listener rule
    ▼
Flask Target Group
    │
    ▼
Flask EC2 (public subnet, port 5000)
    │
    └── Reads/writes ───────────────────► RDS MySQL (flask_app database)
```

---

*This document is version controlled and should be updated whenever infrastructure changes are made via Terraform or manually in the AWS console.*
