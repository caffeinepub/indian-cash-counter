# Indian Cash Counter

## Current State
New project with no existing frontend or backend.

## Requested Changes (Diff)

### Add
- Cash counting UI with rows for denominations: 500, 200, 100, 50, 20, 10, 5, 2, 1
- Each row: denomination label, number-of-notes input, auto-calculated subtotal
- Grand Total display at the bottom
- Reset button to clear all inputs

### Modify
- None

### Remove
- None

## Implementation Plan
- Single-page React app (no backend needed)
- Local state (useState) to track count per denomination
- Subtotal = denomination value x count, computed on the fly
- Grand Total = sum of all subtotals
- White and green theme
- Reset clears all counts to 0
