# FinWiz Banking Dashboard

A modern, colourful, and engaging banking web app dashboard built with React, TypeScript, and Tailwind CSS. This dashboard provides a comprehensive view of financial data with beautiful visualizations and an intuitive user interface.

## Features

### 🎨 **Modern Design**
- Clean, colourful interface with playful accent colours
- Responsive design that works on all devices
- Smooth hover states and card shadows
- Beautiful gradients and typography

### 📊 **Dashboard Sections**
- **Top Navigation**: Logo, search, notifications, chat, and profile
- **Page Header**: Large title, tagline, and explanatory text
- **Partner Brand Logos**: Visa, Mastercard, Amex, PayPal
- **Cards Overview**: Monthly budget progress with increase/decrease buttons
- **Date Card**: Current month spending vs budget
- **Previous Months Summary**: Grid of monthly spending cards
- **Category Spend Overview**: 8 spending categories with icons and trends
- **Charts Section**: Multiple chart types using Recharts
- **Newsletter Signup**: Footer with email subscription

### 📈 **Data Visualizations**
- Line charts for expense trends
- Pie charts for category breakdown
- Bar charts for savings vs income vs expenses
- Area charts for annual expense trends
- Progress bars for budget tracking

### 🎯 **Key Components**
- Responsive grid layouts
- Interactive cards with hover effects
- Real-time data display
- Professional financial terminology
- GBP currency formatting

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts library
- **Icons**: Lucide React
- **UI Components**: Custom shadcn/ui-inspired components
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finwiz-banking-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx     # Button component
│   │   ├── Card.tsx       # Card components
│   │   └── Select.tsx     # Select dropdown
│   └── BankingDashboard.tsx # Main dashboard component
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Customization

### Colors
The dashboard uses a custom color palette defined in `tailwind.config.js`:
- Primary: Blue tones
- Accent: Purple, yellow, teal, orange, pink, blue, green, red
- Background: White and light grays

### Data
All financial data is currently mocked in the `mockData` object within `BankingDashboard.tsx`. You can:
- Replace with real API calls
- Modify amounts and categories
- Add new data sources
- Customize the data structure

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Edit component-specific styles in each component file

## Features in Detail

### Navigation Bar
- FinWiz logo with gradient branding
- Search, notifications, and chat icons
- User profile picture (initials)

### Budget Overview
- Visual progress bar showing monthly spending
- Percentage comparison with previous month
- Interactive buttons to adjust budget
- Real-time calculations

### Category Cards
- 8 spending categories with relevant icons
- Amount display in GBP
- Percentage change indicators
- Hover animations and scaling effects

### Charts
- **Top Expenses**: Line chart showing 3 main categories over time
- **Category Breakdown**: Pie chart with percentages and legend
- **Savings Analysis**: Bar chart comparing savings, income, and expenses
- **Annual Trend**: Area chart showing yearly expense patterns

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized for all device types

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspired by modern fintech applications
- Icons provided by Lucide React
- Charts powered by Recharts
- Styling framework by Tailwind CSS

---

Built with ❤️ for modern banking experiences
