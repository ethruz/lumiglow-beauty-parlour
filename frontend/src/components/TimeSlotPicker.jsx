// src/components/TimeSlotPicker.jsx
import { motion } from "framer-motion";

const TimeSlotPicker = ({ slots, selectedSlot, onSelect }) => {
  if (!slots || slots.length === 0) {
    return (
      <p className="font-body text-sm text-berry-400 text-center py-4">
        No slots available for this date.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const isSelected = selectedSlot?.id === slot.id;
        const isTaken    = !slot.isAvailable;

        return (
          <motion.button
            key={slot.id}
            whileHover={!isTaken ? { scale: 1.04 } : {}}
            whileTap={!isTaken ? { scale: 0.97 } : {}}
            disabled={isTaken}
            onClick={() => !isTaken && onSelect(slot)}
            className={`
              py-2 px-3 rounded-xl text-xs font-body font-medium
              border transition-all duration-200
              ${isTaken
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                : isSelected
                  ? "bg-berry-500 text-white border-berry-500 shadow-soft"
                  : "bg-white text-berry-500 border-blush-200 hover:border-blush-400 hover:bg-blush-50"
              }
            `}
          >
            {slot.label}
            {isTaken && <span className="block text-gray-400" style={{fontSize:"9px"}}>Booked</span>}
          </motion.button>
        );
      })}
    </div>
  );
};

export default TimeSlotPicker;
