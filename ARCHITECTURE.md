# Scoreboard Architecture Guide

This document defines the coding standards and patterns for the Scoreboard app. **Follow these rules for all code.**

---

## Good Practices

### Naming & Readability

1. **Descriptive names** - `gameTimeInSeconds` not `t` or `time`
2. **Use `const` by default**, `let` when reassignment needed, **never `var`**
3. **Component names match file names** - `Button.js` exports `Button`
4. **Boolean variables start with is/has/can** - `isRunning`, `hasStarted`

### Code Structure

5. **DRY (Don't Repeat Yourself)** - Reuse components/functions
6. **One component per file**
7. **Keep components small** - Under 100 lines ideally
8. **Group related state together**
9. **Single Responsibility** - Each component/function does ONE thing

### React Native Specific

10. **Styles at bottom of file** in `StyleSheet.create()`
11. **Props destructured at top of component**
12. **Comments explain "why", not "what"**
13. **Use `FlatList` instead of `ScrollView`** for lists (better performance)
14. **Use `StyleSheet.create()`** - It validates styles at compile time
15. **Use Expo's built-in components** when available

### Timers & Cleanup

16. **No `setTimeout` for fake delays** - But `setInterval` IS needed for clocks
17. **Always clean up intervals** in `useEffect` return function
18. **Clean up subscriptions** in `useEffect` cleanup

### Async Code

19. **Use `async/await`** instead of `.then()` chains
20. **Never use `forEach` with async callbacks** - Use `for...of` instead

### Code Quality Tools

21. **Use ESLint + Prettier** for consistent style
22. **Use PropTypes** for type safety (or TypeScript)

---

## Bad Practices (Avoid These)

### Code Smells

1. **Magic numbers** - `if (fouls > 5)` → use `const MAX_FOULS = 5`
2. **Nested ternaries** - `a ? b ? c : d : e` is hard to read
3. **Unnamed colors** - `'#E31837'` everywhere → use `colors.red`
4. **Console.logs left in code** - Remove before committing
5. **Commented-out code** - Delete it, git has history

### State Mistakes

6. **Mutating state directly** - `score++` → `setScore(score + 1)`
7. **Global variable pollution** - Don't store state outside React

### Anti-Patterns

8. **God Object** - One massive component doing everything (break it up)
9. **Copy-pasting instead of reusing** - Make reusable components instead
10. **Cargo Cult Programming** - Using code without understanding how it works
11. **Callback Hell** - Deeply nested callbacks (flatten with async/await)
12. **Premature Optimization** - Don't optimize until you know something is slow
13. **Modifying Built-in Prototypes** - Never modify `Array.prototype` etc.
14. **Hoisting Confusion** - Declare variables at top of scope, not scattered

---

## File Structure

```
assets/                     # Static assets (Expo standard)
├── images/                 # Sport icons, logos, etc.
└── fonts/                  # Custom fonts (if needed)

src/
├── components/             # SHARED reusable components
│   ├── Button.js
│   ├── ScoreDisplay.js
│   ├── TeamLabel.js
│   ├── GameClock.js
│   ├── PeriodDisplay.js
│   ├── Counter.js
│   └── ColorPicker.js
│
├── components/basketball/  # BASKETBALL-SPECIFIC components
│   └── ShotClock.js
│
├── screens/                # All screens
│   ├── HomeScreen.js
│   ├── BasketballSettingsScreen.js
│   └── BasketballScoreboardScreen.js
│
├── constants/              # App-wide values
│   └── colors.js
│
└── utils/                  # Helper functions
    └── formatTime.js
```

**Pattern for adding new sports:**
1. Add sport-specific components in `components/[sport]/`
2. Add `[Sport]SettingsScreen.js` and `[Sport]ScoreboardScreen.js`
3. Reuse shared components wherever possible

---

## Component Template

```javascript
// Good component structure example

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Constants at the top
const MAX_VALUE = 10;

export default function ExampleComponent({ title, initialValue }) {
  // Props destructured above ^

  // State grouped together
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);

  // Functions
  const handleIncrement = () => {
    // Why: Prevent going over maximum
    if (value < MAX_VALUE) {
      setValue(value + 1);
    }
  };

  // Render
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

// Styles at bottom
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 16,
  },
  value: {
    fontSize: 24,
  },
});
```

---

## Quick Reference

| Do This | Not This |
|---------|----------|
| `const score = 0` | `var score = 0` |
| `isRunning` | `running` or `run` |
| `colors.red` | `'#E31837'` |
| `setScore(score + 1)` | `score++` |
| `async/await` | `.then().then()` |
| `for...of` with async | `forEach` with async |
| Delete unused code | Comment it out |
