import React, { useEffect, useRef } from "react";

function useRenderCount() {
    const counter = useRef(1);
    useEffect(() => {
        counter.current++;
    });

    return counter.current;
}

export default useRenderCount;
