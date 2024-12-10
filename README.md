# Kitco Checkout Form Application

A React-based user registration form with validation and API integration.

## Features

- Full form validation
- Real-time error messages
- API integration
- Responsive design
- Alert notifications

## Form Fields

- Full Name (no symbols allowed)
- Contact Number (Canadian format)
- Birthdate (day, month, year dropdowns)
- Email Address
- Password (8+ chars, uppercase, lowercase, numbers)
- Confirm Password

## API Integration

The form submits to: `https://fullstack-test-navy.vercel.app/api/users/create`

**Request Format:**

{
  "full_name": "string",
  "contact_number": "string",
  "email": "string",
  "date_of_birth": "YYYY-MM-DD",
  "password": "string"
}

