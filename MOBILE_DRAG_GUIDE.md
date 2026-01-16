# Mobile Drag-and-Drop Implementation Guide

## Overview
The Kanban board now supports both desktop HTML5 drag-and-drop and mobile touch drag. The mobile implementation uses a long-press gesture to initiate drag operations.

## How It Works

### Desktop (HTML5 Drag & Drop)
1. User clicks and holds on a card
2. `handleDragStart` fires on the card
3. Drag data is stored in `dataTransfer`
4. User drags over columns
5. `handleDragOver` prevents default behavior on target column
6. User releases on column
7. `handleDrop` executes the status update

### Mobile (Long-Press Gesture)
1. User touches and holds on a card for 500ms (long-press)
2. Haptic feedback is triggered (vibration on supported devices)
3. `handleTouchStart` timer completes and calls `onDragStart`
4. Drag state is stored in `draggedItem` (StatsColumn state)
5. User continues to hold and drag finger across columns
6. When releasing on a column, `handleDrop` uses the `draggedItem` state
7. Status is updated via API

## Key Components

### StatsCard.jsx
- Detects long-press (500ms) on touch devices
- Sets `draggedItem` state via callback when long-press triggers
- Provides haptic feedback via `navigator.vibrate`
- CSS property `touchAction: "none"` prevents browser defaults

### StatsColumn.jsx
- Receives `setDraggedItem` callback from StatsContainer
- Stores `draggedItem` state for mobile drag operations
- `handleDrop` checks both `dataTransfer` (desktop) and `draggedItem` (mobile)
- Opens interview date modal for INTERVIEW column drops
- Calls API to update application status

## Testing Mobile Drag

### In Browser DevTools
1. Open Chrome DevTools
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Select a mobile device (iPhone, Android)
4. Long-press (500ms) on a job card
5. Drag and hold to move to another column

### On Real Device
1. Open on Safari (iOS) or Chrome (Android)
2. Long-press (500ms) on a job card
3. Drag to target column while continuing to hold
4. Release to drop

## Browser Compatibility

| Browser | Desktop Drag | Mobile Drag |
|---------|--------------|-------------|
| Chrome  | ✅ HTML5     | ✅ Long-press |
| Firefox | ✅ HTML5     | ✅ Long-press |
| Safari  | ✅ HTML5     | ✅ Long-press |
| Edge    | ✅ HTML5     | ✅ Long-press |

## Haptic Feedback

The long-press gesture triggers a 50ms vibration on supported devices:
```javascript
if (navigator.vibrate) {
    navigator.vibrate(50);
}
```

Note: Only works on:
- Android devices with vibration
- Some iOS devices with haptic feedback
- Devices that support the Vibration API

## Interview Date Interaction

When dragging a card to the INTERVIEW column:
1. `handleDrop` detects `column.id === "INTERVIEW"`
2. Opens `InterviewDateModal` component
3. User selects a date
4. `handleInterviewDateConfirm` updates API with date
5. Card moves to INTERVIEW column with scheduled date

## Troubleshooting

### Mobile drag not working
- **Issue**: Long-press not being detected
- **Solution**: Ensure `touchAction: "none"` is set on card
- **Check**: Haptic feedback indicates long-press was detected

### Card not moving after release
- **Issue**: Drop handler not executing
- **Solution**: Ensure column has `onDrop` handler
- **Check**: Console for API errors

### Accidental drag on scroll
- **Issue**: Long-press triggers while scrolling
- **Solution**: 500ms timeout may overlap with scroll gesture
- **Workaround**: Touch gesture differentiation - calculate move distance vs time

### Date modal not opening on mobile
- **Issue**: INTERVIEW column drop not detected
- **Solution**: Verify `column.id` matches exactly
- **Check**: Browser console for errors in handleDrop

## Future Enhancements

1. **Visual Drag Indicator**: Show semi-transparent card during drag on mobile
2. **Scroll During Drag**: Auto-scroll columns horizontally while dragging
3. **Tap to Cancel**: Quick double-tap to cancel active drag
4. **Touch Feedback**: Visual outline of target column during drag
5. **Multi-touch**: Support for two-finger drag on supported devices

## Implementation Details

### Touch Event Flow
```
User Touch Start (500ms timeout starts)
    ↓
Long-Press Detected → Haptic Feedback
    ↓
onDragStart Callback (draggedItem set)
    ↓
User Drags Finger Across Columns
    ↓
handleDrop Fires on Release
    ↓
Check draggedItem State → Update API
    ↓
draggedItem Cleared, UI Updated
```

### CSS Classes
- `.stats-card-wrapper` - Main card wrapper with `touchAction: "none"`
- Uses inline styles for touch-action property

### State Management
- `draggedItem` state in StatsColumn for mobile tracking
- Desktop uses `dataTransfer` for HTML5 drag
- Interview modal state for date selection
