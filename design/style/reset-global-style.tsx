import { createGlobalStyle } from "styled-components";
import { fonts } from "~/design/fonts";

export const ResetGlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    * {
        font-family: '${fonts.poppins}';
        font-weight: 400;
        font-size: 16px;
        color: white;
        user-select: none;
    }

`;
