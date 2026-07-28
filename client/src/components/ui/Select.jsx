import { useEffect, useMemo, useRef, useState } from "react";

function Select({ options = [], value, onChange, name, className = "" }) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);
  const listRef = useRef(null);
  const optionRefs = useRef([]);

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value == value),
    [options, value]
  );

  const [highlightedIndex, setHighlightedIndex] = useState(
    Math.max(selectedIndex, 0)
  );

  useEffect(() => {
    setHighlightedIndex(Math.max(selectedIndex, 0));
  }, [selectedIndex]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;

    const element = optionRefs.current[selectedIndex];

    element?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [open, selectedIndex]);

  function selectOption(option) {
    onChange?.({
      target: {
        name,
        value: option.value,
      },
    });

    setOpen(false);
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();

        if (!open) {
          setOpen(true);
        } else {
          selectOption(options[highlightedIndex]);
        }
        break;

      case "ArrowDown":
        event.preventDefault();

        if (!open) {
          setOpen(true);
          return;
        }

        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));

        break;

      case "ArrowUp":
        event.preventDefault();

        if (!open) {
          setOpen(true);
          return;
        }

        setHighlightedIndex((prev) => Math.max(prev - 1, 0));

        break;

      case "Escape":
        setOpen(false);
        break;

      default:
        break;
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          h-14
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          px-5
          text-white
          transition-all
          duration-200

          hover:border-indigo-500

          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-500/20
          focus:outline-none
        "
      >
        <span>{options[selectedIndex]?.label}</span>

        <svg
          className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}

      <div
        className={`
          absolute
          left-0
          right-0
          z-50
          mt-2
          origin-top
          overflow-hidden
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          shadow-2xl
          transition-all
          duration-200

          ${
            open
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }
        `}
      >
        <ul
          ref={listRef}
          className="
            max-h-72
            overflow-y-auto
            py-2

            scrollbar-thin
            scrollbar-thumb-slate-700
            scrollbar-track-transparent
          "
        >
          {options.map((option, index) => {
            const selected = option.value == value;
            const highlighted = index === highlightedIndex;

            return (
              <li
                key={option.value}
                ref={(el) => (optionRefs.current[index] = el)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(option)}
                className={`
                  mx-2
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-150

                  ${highlighted ? "bg-indigo-600 text-white" : "text-slate-300"}

                  ${selected ? "font-semibold" : ""}
                `}
              >
                {option.label}

                {selected && <span className="text-lg">✓</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Select;
