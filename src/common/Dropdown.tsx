import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  label: string;
  selected: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, selected, options, onSelect }: DropdownProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <Menu as="div" className="relative w-full">
      <MenuButton className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500">
        <span>{selected}</span>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
      <MenuItems className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {options.map((opt) => (
            <MenuItem key={opt.value}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => onSelect(opt.value)}
                  className={`${
                    active ? "bg-cyan-600 text-white" : "text-gray-700"
                  } block w-full px-4 py-2 text-left text-sm`}
                >
                  {opt.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  </div>
);

export default Dropdown;
