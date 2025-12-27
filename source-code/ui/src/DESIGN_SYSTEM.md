# HelpMe! Design System

## 🎨 Color Palette

### Primary Colors
- **Navy Blue**: `#1E293B` (bg-slate-800)
- **Navy Light**: `#334155` (bg-slate-700)
- **Navy Dark**: `#0F172A` (bg-slate-900)

### Accent Colors
- **Orange Primary**: `#F97316` (bg-orange-500)
- **Orange Hover**: `#EA580C` (bg-orange-600)
- **Orange Light**: `#FB923C` (bg-orange-400)
- **Orange Pale**: `#FED7AA` (bg-orange-200)

### Neutral Colors
- **Background**: `#F9FAFB` (bg-gray-50)
- **Card Background**: `#FFFFFF` (bg-white)
- **Border**: `#E5E7EB` (border-gray-200)
- **Text Primary**: `#111827` (text-gray-900)
- **Text Secondary**: `#6B7280` (text-gray-600)
- **Text Tertiary**: `#9CA3AF` (text-gray-400)

### Status Colors
- **Success**: `#10B981` (bg-green-500)
- **Warning**: `#F59E0B` (bg-yellow-500)
- **Danger**: `#EF4444` (bg-red-500)
- **Info**: `#3B82F6` (bg-blue-500)

---

## 📐 Typography Scale

### Headings
```tsx
// Page Title
<h1 className="text-3xl font-bold text-gray-900">Page Title</h1>

// Section Title
<h2 className="text-xl font-semibold text-gray-900">Section Title</h2>

// Subsection Title
<h3 className="text-lg font-semibold text-gray-900">Subsection</h3>
```

### Body Text
```tsx
// Regular Text
<p className="text-sm text-gray-700">Regular content</p>

// Secondary Text
<p className="text-sm text-gray-600">Secondary info</p>

// Caption/Small Text
<p className="text-xs text-gray-500">Caption or metadata</p>
```

---

## 🔘 Buttons

### Primary Button
```tsx
<button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm">
  Primary Action
</button>
```

### Secondary Button
```tsx
<button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
  Secondary Action
</button>
```

### Tertiary Button
```tsx
<button className="px-4 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors text-sm font-medium">
  Tertiary Action
</button>
```

### Danger Button
```tsx
<button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium shadow-sm">
  Delete
</button>
```

### Button Sizes
- **Small**: `px-3 py-1.5 text-sm`
- **Medium**: `px-4 py-2 text-sm` (default)
- **Large**: `px-6 py-3 text-base`

---

## 📦 Cards

### Standard Card
```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  {/* Content */}
</div>
```

### Hoverable Card
```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
  {/* Content */}
</div>
```

### Card with Header
```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div className="p-6 border-b border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900">Header</h3>
  </div>
  <div className="p-6">
    {/* Body */}
  </div>
</div>
```

---

## 🏷️ Badges

### Status Badges
```tsx
// Success
<span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>

// Warning  
<span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>

// Info
<span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In Progress</span>

// Danger
<span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelled</span>

// Gray
<span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Completed</span>
```

---

## 📥 Form Elements

### Input Field
```tsx
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
  placeholder="Enter text..."
/>
```

### Textarea
```tsx
<textarea
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
  rows={4}
  placeholder="Enter description..."
/>
```

### Select
```tsx
<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

---

## 📏 Spacing System

### Padding
- **xs**: `p-2` (8px)
- **sm**: `p-4` (16px)
- **md**: `p-6` (24px)
- **lg**: `p-8` (32px)
- **xl**: `p-12` (48px)

### Gap (between elements)
- **xs**: `gap-2` (8px)
- **sm**: `gap-3` (12px)
- **md**: `gap-4` (16px)
- **lg**: `gap-6` (24px)
- **xl**: `gap-8` (32px)

### Margin Bottom (between sections)
- **sm**: `mb-4` (16px)
- **md**: `mb-6` (24px)
- **lg**: `mb-8` (32px)
- **xl**: `mb-12` (48px)

---

## 📱 Layout Patterns

### Page Container
```tsx
<div className="min-h-screen bg-gray-50">
  <Header />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Page content */}
  </div>
</div>
```

### Page Header
```tsx
<div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Title</h1>
  <p className="text-gray-600">Page description</p>
</div>
```

### Section Header
```tsx
<div className="mb-6">
  <div className="flex items-start justify-between">
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Section Title</h2>
      <p className="text-sm text-gray-600">Section description</p>
    </div>
    <button className="...">Action</button>
  </div>
</div>
```

### Grid Layouts
```tsx
// 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">...</div>

// 3 columns
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">...</div>

// 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">...</div>
```

---

## 🎯 Interactive States

### Hover States
- Buttons: `hover:bg-orange-600` (darker)
- Cards: `hover:shadow-lg`
- Links: `hover:text-orange-700`

### Active/Focus States
- Inputs: `focus:ring-2 focus:ring-orange-500 focus:border-transparent`
- Buttons: `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`

### Disabled States
- Opacity: `disabled:opacity-50`
- Cursor: `disabled:cursor-not-allowed`

---

## ✅ Component Usage Rules

1. **Always use consistent spacing**: Use `p-6` for card padding, `gap-4` for element spacing
2. **Always use consistent shadows**: Use `shadow-sm` for static, `hover:shadow-lg` for hover
3. **Always use consistent borders**: Use `border-gray-200` for all borders
4. **Always use consistent border radius**: Use `rounded-lg` for buttons/inputs, `rounded-xl` for cards
5. **Always use consistent transitions**: Use `transition-colors` for buttons, `transition-shadow` for cards
6. **Always use orange as primary action color**: Orange for CTAs, Navy for brand
7. **Always use consistent text hierarchy**: Gray-900 for titles, Gray-600 for descriptions, Gray-500 for captions

---

## 🎨 Example Full Page Structure

```tsx
<div className="min-h-screen bg-gray-50">
  <Header user={user} onNavigate={onNavigate} onLogout={onLogout} />
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Page Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Title</h1>
      <p className="text-gray-600">Page description</p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Stat content */}
      </div>
    </div>

    {/* Main Content Card */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Tabs or Header */}
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900">Section Title</h2>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Content items */}
      </div>
    </div>
  </div>
</div>
```

---

**Last Updated**: December 2024
**Version**: 1.0.0
