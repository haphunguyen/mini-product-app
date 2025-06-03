# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Project Structure

```
mini-product-app/
├── app/                  # Main application screens and navigation
│   ├── cart-detail.tsx   # Cart detail screen
│   ├── _layout.tsx       # Root layout configuration
│   └── tabs/            # Tab-based navigation screens
├── assets/              # Static assets
│   ├── fonts/          # Custom fonts
│   └── images/         # Image assets
├── components/          # Reusable UI components
│   ├── product/        # Product-related components
│   ├── ui/             # Common UI components
│   ├── HapticTab.tsx   # Haptic feedback tab component
│   ├── ThemedText.tsx  # Themed text component
│   └── ThemedView.tsx  # Themed view component
├── constants/          # Application constants
│   ├── Colors.ts       # Color definitions
│   └── TabBar.ts       # Tab bar configuration
├── hooks/              # Custom React hooks
│   ├── useThemeColor.ts        # Theme color hook
│   ├── useColorScheme.web.ts   # Web color scheme hook
│   └── useColorScheme.ts       # Native color scheme hook
└── stores/             # State management
    └── useProductsStore.tsx    # Products state store
```

## Get started - How to run the app

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Run on Real Device:
   - Download the Expo Go app from:
     - [App Store](https://apps.apple.com/app/expo-go/id982107779) for iOS
     - [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) for Android
   - Scan the QR code shown in your terminal with:
     - iOS: Use your phone's camera
     - Android: Use the Expo Go app's QR scanner

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Debugging

To debug your application:

1. Open JavaScript Debugger:
   - Press `Command + Control + Z` in the simulator
   - Select "Open JS Debugger" from the debug modal
   - React Native DevTools will open in your browser

2. For API debugging:
   - In React Native DevTools, navigate to the "Network" tab
   - Monitor and debug your API calls here

## How to Use the App

### Adding Items to Cart

1. Browse Products:
   - Click on any product item to view its details
   - The app will navigate to the product detail screen

2. Add to Cart:
   - Click the "Add to Cart" button on the product detail screen
   - The item will be added to your shopping cart

3. View Cart:
   - Option 1: Click the quantity indicator in the Header
   - Option 2: Navigate to the Cart tab
   - The Cart screen will display:
     - All items in your cart
     - Quantity of each item
     - Summary of total price

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## 📝 Future Enhancements

### High Priority
- [ ] **App Branding**
  - Update App Icon with custom design
  - Create splash screen
  - Add app store screenshots

### Deployment & CI/CD
- [ ] **Fastlane Integration**
  - Set up Fastlane for iOS deployment
  - Configure Fastlane for Android deployment
  - Automate build and release process

- [ ] **CI/CD Pipeline**
  - Set up GitHub Actions workflow
  - Configure automated testing
  - Implement automated deployment
  - Add version management

### Medium Priority
- [ ] **Performance Optimization**
  - Implement image caching
  - Optimize bundle size
  - Add performance monitoring

- [ ] **Testing**
  - Implement E2E testing
  - Set up test coverage reporting

### Low Priority
- [ ] **User Experience**
  - Add pull-to-refresh
  - Implement skeleton loading