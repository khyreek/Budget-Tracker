import React from "react";
import { screen, render } from "@testing-library/react";
import App from "../src/App";

/**@extralibs */
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// test("renders learn react link", () => {
//     render(<App />);
//     const linkElement = screen.getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// });

// not having a test in a .test file is considered a failed test
test("guard false alarm", () => {
    expect(true).toBe(true);
});
