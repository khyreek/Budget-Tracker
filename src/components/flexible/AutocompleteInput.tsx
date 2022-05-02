import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface AutocompleteInputProps {
    className?: string;
    extraProps?: { [key: string]: any };
    placeholder?: string;
    options: Array<{
        label: string;
        id: any;
    }>;

    /**
     * Used to see the default parameters sent by the
     * MUI Autocomplete component.
     */
    seeDefaultParams?: boolean | undefined;
}

function AutocompleteInput({
    options,

    className,
    placeholder,
    extraProps,
    seeDefaultParams,
}: AutocompleteInputProps): JSX.Element {
    return (
        <Autocomplete
            renderInput={(params) => {
                if (seeDefaultParams) console.log(params);

                return (
                    <TextField
                        className={className}
                        {...{ ...params, fullWidth: false }}
                        /**
                         * After the 'params' are set to allow overriding from outside
                         * this abstraction.
                         */
                        label={placeholder}
                        {...extraProps}
                    />
                );
            }}
            options={options}
        />
    );
}

export default AutocompleteInput;
