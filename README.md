# Parking Lot Booking System

A modern web application that allows users to find, view, and book parking spaces in different cities. The system features an interactive map, payment integration, and a user-friendly interface.

## Features

### Current Features

- **Interactive Map Interface**
  - Google Maps integration with custom parking spot markers
  - Traffic layer visualization for real-time traffic conditions
  - Map type switching (roadmap, satellite, hybrid, terrain)
  - 360° street view for visualizing parking locations

- **Extensive Location Coverage**
  - Support for multiple cities (Nairobi, Mombasa, Kisumu, Nakuru)
  - Detailed street database with over 100 streets across all cities
  - Thousands of potential parking spaces

- **User Authentication**
  - Phone number-based login/registration
  - Secure authentication via Supabase

- **Booking System**
  - Real-time parking space availability
  - Price information for each parking spot
  - Booking confirmation with details

- **Payment Integration**
  - M-Pesa payment integration for mobile payments
  - Secure payment processing
  - Payment confirmation and receipt

- **Admin Dashboard**
  - Overview of parking space usage
  - Revenue analytics with charts
  - Booking management interface

- **User Experience**
  - Responsive design for all devices
  - Visual feedback with animations
  - Intuitive interface with minimal learning curve

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Google Maps API key
- Supabase account and API keys
- M-Pesa API credentials (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/parking-lot-booker.git
   cd parking-lot-booker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Start the backend server**
   ```bash
   cd backend
   python mpesa.py
   ```

6. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite)

## Technologies Used

- **Frontend**
  - React with TypeScript
  - Material UI for component library
  - Google Maps JavaScript API
  - Framer Motion for animations

- **Backend**
  - Flask (Python) for M-Pesa integration
  - Supabase for authentication and database

- **APIs**
  - Google Maps API
  - Safaricom M-Pesa API

## Areas for Improvement

- **Additional Features**
  - Push notifications for booking confirmations and reminders
  - Multi-language support
  - User profile management
  - Booking history
  - Favorite/saved parking spots
  - Ratings and reviews for parking locations

- **Technical Improvements**
  - Enhance error handling and validation
  - Implement comprehensive unit and integration tests
  - Optimize for performance with larger datasets
  - Add offline support with service workers
  - Implement server-side rendering for improved SEO

- **Infrastructure**
  - Containerize the application using Docker
  - Set up CI/CD pipelines
  - Implement monitoring and logging
