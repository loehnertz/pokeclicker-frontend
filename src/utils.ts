import React from "react";
import ReactDOM from "react-dom";

export function abbreviate(x: number | null, decPlaces: number): string {
       if(x == null) {
           return "0";
       }

             let units = ['k', 'm', 'b', 't'];
       let isNegative = x < 0;
       let abbreviatedNumber = x.toString();
       decPlaces = Math.pow(10, decPlaces);


       for (let i = units.length - 1; i >= 0; i--) {

          let size = Math.pow(10, (i + 1) * 3);

          if (size <= x) {
            x = Math.round(x * decPlaces / size) / decPlaces;

            if ((x === 1000) && (i < units.length - 1)) {
              x = 1;
              i++;
            }

                     let abbStr = x.toString();
                     let indexOfDot = abbStr.indexOf(".");
                     if(indexOfDot == -1) {
                abbStr += ".000";
                     }
              else if (indexOfDot == abbStr.length - 2) {
                  abbStr += "00";
 }
              else if (indexOfDot == abbStr.length - 3) {
                  abbStr += "0";
 }
            abbreviatedNumber = abbStr + units[i];

            break;
          }
        }

       return isNegative ? '-' + abbreviatedNumber : abbreviatedNumber;
    }
