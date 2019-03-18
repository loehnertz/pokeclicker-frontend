import React from "react";
import ReactDOM from "react-dom";

export function abbreviate (x : number, decPlaces : number) : string {
        var units = ['k', 'm', 'b', 't'];
        var isNegative = x < 0
        var abbreviatedNumber = "";
        decPlaces = Math.pow(10, decPlaces)

        for (var i = units.length - 1; i >= 0; i--) {

          var size = Math.pow(10, (i + 1) * 3)

          if (size <= x) {
            x = Math.round(x * decPlaces / size) / decPlaces

            if ((x === 1000) && (i < units.length - 1)) {
              x = 1
              i++
            }
            
            //var abbNumber = x.toString();
            //if(abbNumber.indexOf(".")==-1)
			//	abbNumber += ".000";

            abbreviatedNumber = x + units[i]

            break
          }
        }

        return isNegative ? '-' + abbreviatedNumber : abbreviatedNumber;
    }