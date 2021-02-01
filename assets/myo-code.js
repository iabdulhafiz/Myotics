function processJSON(jsn) {
    var conds = null;
    if (typeof jsn === 'string' || jsn instanceof String) {
        let code = jsn.match(/\[(.*?)\]/);
        return code[1];
    }
    let intent = jsn.prediction.topIntent;
    let code = "";
    let arr = [];
    switch (intent) {
        case "p5.Background":
            code += "_p.background(";
            let _r = 0;
            let _g = 0;
            let _b = 0;
            arr = jsn.prediction.entities.param;
            for (var i = 0; i < arr.length; i++) {
                //console.log(arr[i].name);
                if (arr[i].hasOwnProperty('name') && arr[i].hasOwnProperty('value')) {
                    switch (arr[i].name[0].toLowerCase()) {
                        case "red":
                        case "r":
                            _r = arr[i].value[0];
                            break;
                        case "green":
                        case "g":
                            _g = arr[i].value[0];
                            break;
                        case "blue":
                        case "b":
                            _b = arr[i].value[0];
                            break;
                    }
                }
            }
            console.log(_r + "," + _g + "," + _b + ");\n");
            code += _r + "," + _g + "," + _b + ");\n";
            break;
        case "p5.Fill":
            code += "_p.fill(";
            let _rf = 0;
            let _gf = 0;
            let _bf = 0;
            arr = jsn.prediction.entities.param;
            for (var i = 0; i < arr.length; i++) {
                //console.log(arr[i].name);
                if (arr[i].hasOwnProperty('name') && arr[i].hasOwnProperty('value')) {
                    switch (arr[i].name[0].toLowerCase()) {
                        case "red":
                        case "r":
                            _rf = arr[i].value[0];
                            break;
                        case "green":
                        case "g":
                            _gf = arr[i].value[0];
                            break;
                        case "blue":
                        case "b":
                            _bf = arr[i].value[0];
                            break;
                    }
                }
            }
            console.log(_rf + "," + _gf + "," + _bf + ");\n");
            code += _rf + "," + _gf + "," + _bf + ");\n";
            break;
        case "p5.Rect":
            let _xr = 0;
            let _yr = 0;
            let _wr = 0;
            let _hr = 0;

            arr = jsn.prediction.entities;
            console.log(arr);
            if (arr.hasOwnProperty('condition') && arr.hasOwnProperty('Conditionals')) {
                conds = arr.Conditionals[0];
                arr = arr.condition[0];
                if (arr.hasOwnProperty('item1')) { // arr.hasOwnProperty('compare') && 
                    code += " if (" + arr.item1[0];
                    switch(conds[0]) {
                        case "equal":
                            code += " == "
                            break;
                        case "not equal":
                            code += " != "
                            break;
                        case "greater than":
                            code += " > "
                            break;
                        case "greater than or equal to":
                            code += " >= "
                            break;
                        case "less than":
                            code += " < "
                            break;
                        case "less than or equal to":
                            code += " <= "
                            break;
                    }
                    if ( arr.hasOwnProperty('item2') ) {
                        code += arr.item2[0] + ") ";
                    }
                    else if (arr.item1.length > 1) {
                        code += arr.item1[1] + ") ";
                    }
                    else {
                        code += " 0 ) ";
                    }
                }
                else {
                    console.log("NOT WORKS");                }
            }

            code += "_p.rect(";
            arr = jsn.prediction.entities.param;
            for (var i = 0; i < arr.length; i++) {
                //console.log(arr[i].name);
                if (arr[i].hasOwnProperty('name') && arr[i].hasOwnProperty('value')) {
                    switch (arr[i].name[0].toLowerCase()) {
                        case "horizontal":
                        case "x":
                        case "right":
                        case "left":
                            _xr = arr[i].value[0];
                            break;
                        case "vertical":
                        case "y":
                        case "up":
                        case "down":
                            _yr = arr[i].value[0];
                            break;
                        case "height":
                        case "h":
                        case "tall":
                            _hr = arr[i].value[0];
                            break;
                        case "width":
                        case "w":
                        case "long":
                        case "wide":
                            _wr = arr[i].value[0];
                            break;
                    }
                }

            }
            if (_wr == 0 && _hr == 0) {
                _wr = 50;
                _hr = 50;
            }
            else if (_wr == 0) {
                _wr = _hr;
            }
            else if (_hr == 0) {
                _hr = _wr;
            }
            code += _xr + "," + _yr + "," + _wr + "," + _hr + ");\n";
            break;
        case "p5.Circle":
            let _x = 0;
            let _y = 0;
            let _d = 30;

            arr = jsn.prediction.entities;
            console.log(arr);
            if (arr.hasOwnProperty('condition') && arr.hasOwnProperty('Conditionals')) {
                conds = arr.Conditionals[0];
                arr = arr.condition[0];
                if (arr.hasOwnProperty('item1')) { // arr.hasOwnProperty('compare') && 
                    code += " if (" + arr.item1[0];
                    switch(conds[0]) {
                        case "equal":
                            code += " == "
                            break;
                        case "not equal":
                            code += " != "
                            break;
                        case "greater than":
                            code += " > "
                            break;
                        case "greater than or equal to":
                            code += " >= "
                            break;
                        case "less than":
                            code += " < "
                            break;
                        case "less than or equal to":
                            code += " <= "
                            break;
                    }
                    if (arr.hasOwnProperty('item2') ) {
                        code += arr.item2[0] + ") ";
                    }
                    else if (arr.item1.length > 1) {
                        code += arr.item1[1] + ") ";

                    }
                    else {
                        code += " 0 ) ";
                    }
                }
                else {
                    console.log("NOT WORKS");                }
            }

            code += "_p.circle(";
            arr = jsn.prediction.entities.param;
            for (var i = 0; i < arr.length; i++) {
                //console.log(arr[i].name);
                if (arr[i].hasOwnProperty('name') && arr[i].hasOwnProperty('value')) {
                    switch (arr[i].name[0].toLowerCase()) {
                        case "horizontal":
                        case "x":
                        case "right":
                        case "left":
                            _x = arr[i].value[0];
                            break;
                        case "vertical":
                        case "y":
                        case "up":
                        case "down":
                            _y = arr[i].value[0];
                            break;
                        case "diameter":
                        case "d":
                        case "radius":
                        case "wide":
                            _d = arr[i].value[0];
                            break;
                    }
                }
            }
            code += _x + "," + _y + "," + _d + ");\n";
            break;
        case "p5.Text":
            code += "_p.text(";
            let _xt = 0;
            let _yt = 0;
            arr = jsn.prediction.entities;
            if (arr.hasOwnProperty('RawText')) {
                code += arr.RawText[0] + ',';
                if (arr.hasOwnProperty('param')) {
                    arr = arr.param
                    for (var i = 0; i < arr.length; i++) {
                        //console.log(arr[i].name);
                        if (arr[i].hasOwnProperty('name') && arr[i].hasOwnProperty('value')) {
                            switch (arr[i].name[0].toLowerCase()) {
                                case "horizontal":
                                case "x":
                                case "right":
                                case "left":
                                    _xt = arr[i].value[0];
                                    break;
                                case "vertical":
                                case "y":
                                case "up":
                                case "down":
                                    _yt = arr[i].value[0];
                                    break;
                            }
                        }
                    }
                }
            }
            code += _xt + "," + _yt + ");\n";
            break;
        case "Code":
            arr = jsn.prediction.entities;
            if (arr.hasOwnProperty('Raw')) {
                code += arr.Raw[0] + ";";
            }

            break;
        case "If":
            arr = jsn.prediction.entities;
            if (arr.hasOwnProperty('condition') && arr.hasOwnProperty('Conditionals')) {
                arr = arr.condition;
                let cond = arr.Conditionals[0];
                if (arr.hasOwnProperty('item1') && arr.hasOwnProperty('item2')) { // arr.hasOwnProperty('compare') && 
                    code += " if (" + arr.item1[0];
                    switch(cond[0]) {
                        case "equal":
                            cose += " == "
                            break;
                        case "not equal":
                            cose += " != "
                            break;
                        case "greater than":
                            cose += " > "
                            break;
                        case "greater than or equal to":
                            cose += " >= "
                            break;
                        case "less than":
                            cose += " < "
                            break;
                        case "less than or equal to":
                            cose += " <= "
                            break;
                    }
                    code += arr.item2[0] + ") ";
                }
            }

            break;
        case "Var":
            arr = jsn.prediction.entities;
            if (arr.hasOwnProperty('VarName2')) {
                code += "var " + arr.VarName2[0] + " = " ; // .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                if (arr.hasOwnProperty('p5Variables')) {
                    //let st = arr.p5Variables[0][0];
                    switch (arr.p5Variables[0][0]) {
                        case "mousePressed":
                            code += "_p.mousePressed;"
                            break;
                        case "mouseX":
                            code += "_p.mouseX;"
                            break;
                        case "mouseY":
                            code += "_p.mouseY;"
                            break;
                        default :
                            code += "0;"
                    }
                }
                else if (arr.hasOwnProperty('VarValue')) {
                    code += arr.VarValue[0] + ";";
                }
                
            } else if (arr.hasOwnProperty('param')) {
                arr = arr.param;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].hasOwnProperty('name') && arr[i].hasOwnProperty('value')) {
                        code += "var " + arr[i].name[0] + " = " + arr[i].value[0] + ";";
                    }
                }
            }

            break;
        default:
            cose = ";\n"
    }
    return code;
    //return (JSON.stringify(jsn) + '\n');
}