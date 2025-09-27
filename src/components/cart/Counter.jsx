// Counter.jsx
import { Button } from "@heroui/react";

const Counter = ({ value, min = 1, max = 10, onChange }) => (
  <div className="flex items-center gap-2">
    <Button
      isIconOnly
      size="sm"
      className="bg-gray-200"
      disabled={value <= min}
      onPress={() => onChange(value - 1)}
      aria-label="Decrease quantity"
    >
      –
    </Button>
    <span className="w-8 text-center">{value}</span>
    <Button
      isIconOnly
      size="sm"
      className="bg-gray-200"
      disabled={value >= max}
      onPress={() => onChange(value + 1)}
      aria-label="Increase quantity"
    >
      +
    </Button>
  </div>
);

export default Counter;
