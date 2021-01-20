//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

const api = "https://myocode.cognitiveservices.azure.com/luis/prediction/v3.0/apps/a2f6ec48-3d5e-495e-bd73-b3d42335010e/slots/staging/predict?subscription-key=64b7b41244ff40bc8bd999c63f7bb41c&verbose=true&show-all-intents=true&log=true&query=";

function getDim() {
    let x = document.getElementById('right-section');
    return ("\n_p.createCanvas("+x.clientWidth+","+x.clientHeight+");");
}

function strip(html) {
    var tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = html;
    let re = tempDiv.innerText;
    //tempDiv.re
    return re;
}

function processJSON(jsn) {
    return (JSON.stringify(jsn) + '\n');
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

    let results = [];
    let promises = [];
    for(var i = 0;i < num;i++){
        //code here using lines[i] which will give you each line
        promises.push(
            axios.get(api+lines[i]).then((response) => {
                //console.log(response);
                results.push(response);
            }, (error) => {
                alert(error);
            })
        )
    }

    let jsCode = "";
    Promise.all(promises).then(() => {
        
        console.log(results)
        for(var i = 0;i < num;i++){
            jsCode += processJSON(results[i].data);
        }

        newP5(jsCode);
    
    });
}

var myp5;
let bypassTranslation = true;
let bypassLUIS = true;

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
        let txt = document.getElementById('prgm-setup').innerText + "~`~" + document.getElementById('prgm-loop').innerText;
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