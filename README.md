# FindYourPalette

## Developed By

**Aditya Yadav**

---

# Project Overview

FindYourPalette is a modern web application built using **React, TypeScript, and Vite** that helps users generate aesthetically pleasing color palettes using color harmony principles. The application also allows users to extract dominant colors from images, save palettes locally, switch between light and dark themes, and export palettes for use in design and development projects.

The project follows a modular component-based architecture and demonstrates the practical use of React Hooks, state management, local storage, and browser APIs.

---

# Features

- Interactive color wheel for selecting a base color
- Automatic palette generation using multiple harmony algorithms
- Support for Complementary, Analogous, Triadic, Tetradic, Split Complementary, and Monochromatic palettes
- Image upload with automatic palette extraction
- Save palettes using browser local storage
- View and reload previously saved palettes
- Dark and Light theme support
- Copy generated palettes as CSS variables
- Download palettes in JSON format
- Display HEX, RGB, and HSL values for selected colors
- Responsive and modern user interface

---

# Technologies Used

- React
- TypeScript
- Vite
- HTML5
- CSS3
- Local Storage API
- Canvas API
- Lucide React

---

# Folder Structure

```text
src/
│
├── components/
│   ├── ColorWheel.tsx
│   ├── ColorInfo.tsx
│   ├── PalettePreview.tsx
│   ├── ImageUploader.tsx
│   ├── SavedPalettes.tsx
│   └── ExportPanel.tsx
│
├── utils/
│   └── harmony.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Key Functionalities

## Color Wheel

Users can choose a base color using an interactive color wheel. The selected color updates instantly and serves as the foundation for palette generation.

## Harmony Generation

The application generates palettes based on common color harmony techniques including:

- Complementary
- Analogous
- Triadic
- Tetradic
- Split Complementary
- Monochromatic

Users can switch between harmony types through a dropdown menu.

## Image Palette Extraction

Users can upload an image and automatically extract dominant colors from it. The extracted palette replaces the generated palette until cleared.

## Color Information

The selected color is displayed with:

- HEX value
- RGB value
- HSL value

This helps users understand and reuse colors in different formats.

## Palette Preview

Generated colors are displayed as individual swatches along with their hexadecimal values for easy visualization.

## Saved Palettes

Users can save generated palettes locally and reload them later from the saved palettes menu. Duplicate palettes are automatically prevented.

## Theme Switching

The application supports both Dark Mode and Light Mode. The selected theme is stored locally and restored automatically when the application is reopened.

## Export Options

Users can:

- Copy palettes as CSS variables
- Download palettes as JSON files

These exports make it easy to integrate generated palettes into development projects.

---

# React Concepts Used

- Functional Components
- useState
- useEffect
- useMemo
- useRef
- Event Handling
- Controlled Components
- Conditional Rendering
- Component Composition
- Local Storage Integration
- Browser Canvas API
- File Upload Handling

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd FindYourPalette
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Suggested GitHub Screenshots

Include screenshots of the following:

1. Home page with the color wheel
2. Generated color palette
3. Dark theme interface
4. Light theme interface
5. Image upload and extracted palette
6. Saved palettes panel
7. Color information section
8. Export functionality

---

# Learning Outcomes

This project demonstrates practical implementation of:

- React component architecture
- TypeScript integration
- State management with React Hooks
- Browser local storage
- Canvas-based image processing
- Dynamic rendering
- File handling
- Data export
- Responsive UI design

---

# Future Improvements

- Direct Figma integration
- Adobe Color export
- AI-powered palette recommendations
- Cloud synchronization
- User authentication
- Accessibility and contrast analysis
- Palette sharing through links
- Drag-and-drop image uploads

---

# Author

**Aditya Yadav**

B.Tech Computer Science Engineering  
ITM Skills University, Kharghar

---

# License

This project was created for educational and learning purposes. It may be modified and extended for personal, academic, or non-commercial use.
