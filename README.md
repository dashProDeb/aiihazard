# AI Hazard Detection Dashboard

A comprehensive IoT-powered road hazard detection and visualization system built with React, TypeScript, and modern web technologies. This dashboard monitors potholes and cracks through ESP32 LoRa connectivity and provides real-time data visualization.

## 🚀 Features

- **Real-time IoT Monitoring**: ESP32 LoRa connectivity simulation with live status updates
- **Interactive Map View**: Coordinate-based hazard plotting with severity indicators
- **Data Table**: Comprehensive hazard listing with sorting and filtering
- **Analytics Dashboard**: Charts and statistics for hazard analysis
- **Image Gallery**: Visual evidence of detected hazards
- **Offline Capability**: Runs completely offline without internet dependencies
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui + Tailwind CSS + Radix UI
- **Maps**: Leaflet with coordinate-based plotting
- **Charts**: Recharts for data visualization
- **State Management**: React Query (configured for future use)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_REPOSITORY_URL>
cd aiihazard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080/`

### 4. Build for Production (Optional)

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📱 Usage

### Navigation

- **Map View**: Interactive coordinate-based hazard visualization
- **Table View**: Detailed hazard data with sorting and selection
- **Analytics**: Statistical overview with charts and metrics
- **Images**: Gallery of hazard visual evidence

### Key Features

- **Hazard Selection**: Click on table rows or map markers to focus
- **Severity Coding**: Color-coded hazards (Red=High, Yellow=Medium, Green=Low)
- **Live Status**: Real-time IoT connection monitoring
- **Data Export**: CSV export functionality (when implemented)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── AnalyticsChart.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── DataTable.tsx
│   │   ├── HazardMap.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── LiveStatusPanel.tsx
│   │   └── StatsCard.tsx
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   └── NavLink.tsx
├── data/
│   └── mockData.ts         # Sample hazard data
├── hooks/                  # Custom React hooks
├── integrations/
│   └── supabase/           # Supabase configuration (offline-ready)
├── lib/
│   └── utils.ts            # Utility functions
├── pages/                  # Page components
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/                  # TypeScript type definitions
│   └── hazard.ts
└── App.tsx                 # Main application component
```

## 🔌 IoT Integration

This dashboard is designed to work with ESP32 LoRa modules for road hazard detection. The system simulates:

- **LoRa Communication**: Wireless data transmission
- **GPS Positioning**: Coordinate-based hazard mapping
- **Image Capture**: Visual evidence collection
- **Real-time Monitoring**: Live connection status

### Data Flow Architecture

```
ESP32 (LoRa TX) → LoRa Receiver → Local Server → React Dashboard
```

## 🌐 Offline Capability

This project is specifically designed to run **completely offline**:

- ✅ **No internet dependencies** for core functionality
- ✅ **Local data storage** using mock data
- ✅ **Coordinate-based mapping** without tile servers
- ✅ **Local image placeholders** instead of external URLs
- ✅ **No cloud services** required

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests (if configured)
```

## 🎯 System Requirements

- **Browser**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Display**: Minimum 1024x768 resolution recommended
- **Memory**: 512MB RAM minimum
- **Storage**: 50MB free space

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built UI with the help of [Lovable](https://lovable.dev) for rapid prototyping
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Maps powered by [Leaflet](https://leafletjs.com/)
