//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

const api = "https://myocode.cognitiveservices.azure.com/luis/prediction/v3.0/apps/a2f6ec48-3d5e-495e-bd73-b3d42335010e/slots/staging/predict?subscription-key=64b7b41244ff40bc8bd999c63f7bb41c&verbose=true&show-all-intents=true&log=true&query="
//"https://myocode.cognitiveservices.azure.com/luis/prediction/v3.0/apps/a2f6ec48-3d5e-495e-bd73-b3d42335010e/slots/staging/predict?subscription-key=64b7b41244ff40bc8bd999c63f7bb41c&verbose=true&show-all-intents=true&log=true&query=";

function getDim() {
    let x = document.getElementById('right-section');
    return ("\n_p.createCanvas("+(x.clientWidth-3)+","+(x.clientHeight-3)+");");
}

function strip(html) {
    var tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = html;
    let re = tempDiv.innerText;
    //tempDiv.re
    return re;
}

function processJSON(jsn) {
    let intent = jsn.prediction.topIntent;
    let code = "";
    let arr = [];
    switch(intent) {
        case "p5.Background" :
            code += "_p.background(";
            let _r = 0;
            let _g = 0;
            let _b = 0;
            arr = jsn.prediction.entities.param;
            for (var i = 0;i<arr.length;i++) {
                //console.log(arr[i].name);
                switch(arr[i].name[0].toLowerCase()) {
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
            /*
            jsn.prediction.entities.param.forEach(function (item, index) {
                console.log(item, index);
                switch(item.name) {
                    case "red":
                    case "r":
                        _r = item.value;
                        break;
                    case "green":
                    case "g":
                        _g = item.value;
                        break;
                    case "blue":
                    case "b":
                        _b = item.value;
                        break;
                }
            });
            */
            console.log(_r+","+_g+","+_b+");\n");
            code += _r+","+_g+","+_b+");\n";
            break;
        case "p5.Fill" :
            code += "_p.fill(";
            let _rf = 0;
            let _gf = 0;
            let _bf = 0;
            arr = jsn.prediction.entities.param;
            for (var i = 0;i<arr.length;i++) {
                //console.log(arr[i].name);
                switch(arr[i].name[0].toLowerCase()) {
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
            console.log(_rf+","+_gf+","+_bf+");\n");
            code += _rf+","+_gf+","+_bf+");\n";
            break;
        case "p5.Box" :

            break;
        case "p5.Circle" :
            code += "_p.circle(";
            let _x = 0;
            let _y = 0;
            let _d = 30;
            arr = jsn.prediction.entities.param;
            for (var i = 0;i<arr.length;i++) {
                //console.log(arr[i].name);
                switch(arr[i].name[0].toLowerCase()) {
                    case "horizontal":
                    case "x": case "right": case "left":
                        _x = arr[i].value[0];
                        break;
                    case "vertical":
                    case "y": case "up": case "down":
                        _y = arr[i].value[0];
                        break;
                    case "diameter":
                    case "d": case "radius": case "wide":
                        _d = arr[i].value[0];
                        break;
                }
            }
            code += _x+","+_y+","+_d+");\n";
            break;
        case "Var" :
            arr = jsn.prediction.entities;
            if (arr.hasOwnProperty('VarName') && arr.hasOwnProperty('VarValue')) {
                code += "var " + arr.VarName[0].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,"") + " = " + arr.VarValue[0] + ";";
            }
            else if (arr.hasOwnProperty('param')) {
                arr = arr.param;
                for (var i = 0;i<arr.length;i++) {
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

function newP5(code) {
    let F= new Function ('_p', code);
        
    //return(F());
    try {
        myp5.remove();
        let element = document.getElementById("container");
        element.innerHTML = '';
    }
    catch(err) {
        myp5 = null;
    }
    finally {
        myp5 = new p5(F, 'container');
    }
    
}


function convertToCode(lines) {
    let num = lines.length;
    console.log(lines);
    let newLines = [];
    let pos = 0;
    for(var i = 0;i < num;i++){
        if (lines[i] != "" && lines[i] != "~`~"){
            newLines.push(lines[i]);
        }
        else if (lines[i] == "~`~") {
            pos = newLines.length;
        }
    }
    num = newLines.length;
    console.log(newLines);

    let results = [];
    //let results = new Array(num);
    let promises = [];
    for(var i = 0;i < num;i++){
        //code here using lines[i] which will give you each line
        promises.push(
            axios.get(api+newLines[i]).then((response) => {
                //console.log(response);
                results.push(response);
                //results.splice(i, 0, response);
            }, (error) => {
                alert(error);
            })
        )

    }

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    let jsCode = "";
    Promise.all(promises).then(() => {
        let q = null;
        //results.sort(sortFunction);
        jsCode = "_p.setup = function() {" + getDim()
        
        console.log(results)
        for(var i = 0;i < pos;i++){
            for(var j = 0;i < results.length;j++){
                if (results[j].data.query == newLines[i]) {
                    q = results[j].data;
                    break;
                }
            }
            jsCode += processJSON(q);
        }
        jsCode += "};";
        
        jsCode += " _p.draw = function() {"
        for(var i = pos;i < num;i++){
            for(var j = 0;i < results.length;j++){
                if (results[j].data.query == newLines[i]) {
                    q = results[j].data;
                    break;
                }
            }
            jsCode += processJSON(q);
        }
        jsCode += "};";
        // run the code

        newP5(jsCode);

    
    });
}

var myp5;
let bypassTranslation = true;
let bypassLUIS = false;

var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
    document.getElementById("start-btn").click();

    

    const tx = document.getElementsByTagName('textarea');
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight+50) + 'px;overflow-y:hidden;');
        tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
    /*
    document.getElementById("prgm-setup").addEventListener("input", function(e) {
        let iT = document.getElementById("prgm-setup").innerHTML;
        document.getElementById("prgm-setup").innerHTML = iT;
    }, false);
    */
    document.querySelector("#play").addEventListener("click", (e) => {
        //let txt = $('textarea#prgm-setup').val() + "~`~" + $('textarea#prgm-loop').val();
        //let txt = $('#prgm-setup').text() + "~`~" + $('#prgm-loop').text();
        let txt = document.getElementById('prgm-setup').value + "\n~`~\n" + document.getElementById('prgm-loop').value;
        let lines = txt.split('\n');
        

        const headers = {
            'Ocp-Apim-Subscription-Key': '3775a0d97cd240c58c66788f35de2270',
            'Content-type': 'application/json'
        }

        const dat = "[{'Text':'" + txt + "'}]";

        const transAPI = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en"

        const bingHeaders = {
            'Ocp-Apim-Subscription-Key': '54d639708fc34f43a659f481dea5d94f',
            'Content-type': 'application/json'
        }
        const bingAPI = "https://api.bing.microsoft.com/v7.0/spellcheck?text="
        //const bingData = "[{'text':'" + txt + "'}]";
        
        //let trans = ""
        //axios.post(transAPI, dat, {headers: headers})
        if (bypassLUIS) {
            let setup_loop = txt.split('~`~');
            let jsCode = "_p.setup = function() {" + getDim() + setup_loop[0] + "}; _p.draw = function() {" + setup_loop[1] + "};"; 
            newP5(jsCode);
        }
        else if (bypassTranslation) {
            convertToCode(lines);
        }
        else {
            axios.get(bingAPI+txt, {headers: bingHeaders})
            .then((response) => {
                //console.log(response);
                console.log(response);
                txt = response.data[0].translations[0].text;
                //lines = txt.split('\n');
                //alert(txt)
                //convertToCode(lines)
            }, (error) => {
                convertToCode(lines)
            })
        }
    });

    document.querySelector("#stop").addEventListener("click", (e) => {
        if (myp5 != null) {myp5.remove();}
    });
});




function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
} 

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }