import { createGlobalStyle } from "styled-components";

export const CustomGlobalStyle = createGlobalStyle`
    body {
        background-image: linear-gradient(to right bottom, #051937,  #008793);
        min-width: 100vw;
        min-height: 100vh;
    }


    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }

    select {
        background-color: transparent !important;
        outline: 'none' !important;
        border: 'none' !important;
        /* -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important; */
    }
    
    select option {
        color: black !important;
        
        background-color: transparent !important;
        outline: 'none' !important;
        border: 'none' !important;
        /* -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important; */
    }
`;
