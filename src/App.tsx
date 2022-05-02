import React from "react";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import BudgetHomepage from "./components/budget_homepage/BudgetHomepage";

import Bench from "./components/budget_homepage/BudgetHomepage";
import {} from "./utils/array-methods";

export default function App(): JSX.Element {
    /**
     * @TEST custom array methods without declare global
     */
    return (
        <div className="main">
            {/* <h1>uhhhhhhhhhhh</h1>
            <hr /> */}

            {/* <Testing /> */}
            <BudgetHomepage />
        </div>
    );
}

function Testing(): JSX.Element {
    return (
        <div>
            <input type="text" />
        </div>
    );
}

function testred(state: any, { type, payload }: any): any {
    switch (type) {
        case "a":
            return { ...state, some: payload.updated };
        default:
            return state;
    }
}
