# User Access Management System

A complete user access management system with role-based access control (RBAC), JWT authentication, and integration with Slack and AI analysis.

## Features

- **User Authentication**
  - Sign up with username/password
  - Login with JWT token generation
  - Password encryption with bcrypt

- **Role-Based Access Control**
  - Three user roles: Employee, Manager, Admin
  - Different views and permissions for each role

- **Software Access Management**
  - Employees can request access to software
  - Managers can approve/reject requests
  - Admins can create new software entries

- **Integrations**
  - Slack notifications for new requests and approvals
  - AI-powered request reason analysis (LLM integration)

## Tech Stack

**Frontend:**
- React.js
- React Router
- Axios for API calls
- Context API for state management

**Backend:**
- Node.js
- Express.js
- TypeORM
- PostgreSQL
- JWT authentication
- Bcrypt for password hashing

**Integrations:**
- Slack Webhook API
- OpenAI API (or similar LLM service)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nithin849/user-access-management.git
cd user-access-management.
```

3. 2. Install dependencies for both frontend and backend:
```bash
npm install
```

3. Set up your PostgreSQL database:
```sql
CREATE DATABASE access_management;
```

### Configuration

1. Create a `.env` file in the root directory with the following variables:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=access_management

# Authentication
JWT_SECRET=your_jwt_secret_key

# Integrations
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
LLM_API_KEY=your_openai_api_key
```

2. For frontend, create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server:
```bash
node backend.js
```

2. In a separate terminal, start the frontend:
```bash
npm start
```


## Testing Accounts

For quick testing, you can use these default accounts after first run:

- **Admin**
- **Manager**
- **Employee**


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Name - mnithinmangali@gmail.com

Project Link: [Link](https://github.com/nithin849/user-access-management)
```





