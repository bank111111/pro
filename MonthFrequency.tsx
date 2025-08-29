import { Controller } from "react-hook-form";
import { monthOptions, occurrenceOptions } from "../calendar.types";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
export const MonthFrequency = ({ control }: any) => (

    <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Monthly:</h3>
        <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-gray-700">Expected run days of the month:</label>
            <HelpOutlineIcon
                sx={{ fontSize: 16, color: '#9ca3af', cursor: 'help' }}
                titleAccess="Expected run days of the month"
            />
        </div>

        {/* Month selection */}
        <div className="mb-4">
            
            <Controller
                name="runMonths"
                control={control}
                defaultValue={""}
                render={({ field }) => {
                    const selectedValues: string[] = field.value || [];
                    const hasAllSelected = selectedValues.includes("All months");

                    return (
                        <div>
                            {/* Dropdown */}
                            <select
                                className="w-full px-3 py-2 text-sm border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value && !selectedValues.includes(value)) {
                                        // If "all" is picked, reset to only that
                                        if (value === "All months") {
                                            field.onChange(["All months"]);
                                        } else {
                                            // prevent adding months when "all" is active
                                            if (!hasAllSelected) {
                                                field.onChange([...selectedValues, value]);
                                            }
                                        }
                                    }
                                }}
                                //value=""
                            >
                                <option value="">Select the months of run</option>
                                {monthOptions.map(option => (
                                    <option
                                        key={option}
                                        value={option}
                                        disabled={
                                            // If "all" is selected, disable other months
                                            hasAllSelected && option !== "all"
                                        }
                                    >
                                        {option === "All months" ? "All months" : option}
                                    </option>
                                ))}
                            </select>

                            {/* Show chips */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedValues.map(val => (
                                    <span
                                        key={val}
                                        className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-md flex items-center gap-1"
                                    >
                                      
                                        {val !== undefined ? (val === "All months" ? "All months" : val) : ""}
                                        <button
                                            type="button"
                                            className="text-red-500 ml-1"
                                            onClick={() => {
                                                field.onChange(selectedValues.filter(v => v !== val));
                                            }}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                }}
            />

        </div>

        {/* Day selection */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <span className="text-xs text-gray-500 block mb-1">Business day x</span>
                <div className="border border-blue-400 rounded-md p-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Business day</span>
                    </label>
                </div>
            </div>
            <div>
                <span className="text-xs text-gray-500 block mb-1">Calendar day x</span>
                <div className="border border-blue-400 rounded-md p-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Calendar day</span>
                    </label>
                </div>
            </div>
        </div>

        {/* Occurrence selection */}
        <div className="mt-4">
            <Controller
                name="runOccurrences"
                control={control}
                render={({ field }) => {
                    const selectedValues: string[] = field.value || [];

                    return (
                        <div>
                            {/* Dropdown */}
                            <select
                                className="w-full px-3 py-2 text-sm border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value && !selectedValues.includes(value)) {
                                        field.onChange([...selectedValues, value]);
                                    }
                                }}
                                value=""
                            >
                                <option value="">Select the occurrences of run</option>
                                {occurrenceOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {/* Show chips */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedValues.map(val => (
                                    <span
                                        key={val}
                                        className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-md flex items-center gap-1"
                                    >
                                        {val}
                                        <button
                                            type="button"
                                            className="text-red-500 ml-1"
                                            onClick={() =>
                                                field.onChange(selectedValues.filter(v => v !== val))
                                            }
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                }}
            />

        </div>
    </div>


);