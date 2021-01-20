console.log("This is Postmaster");

var parabox = document.getElementById("parabox");
var jsonbox = document.getElementById("jsonbox");
// By default para box will be hidden
parabox.style.display = 'none';

var jsonradio = document.getElementById("jsonradio");
var custpararadio = document.getElementById("custpararadio");

// Show json Box
jsonradio.addEventListener("click", () => {
    parabox.style.display = 'none';
    jsonbox.style.display = 'flex';
})

// Show parameter Box
custpararadio.addEventListener("click", () => {
    // paramcount++;
    parabox.style.display = 'block';
    jsonbox.style.display = 'none';
})

// function to create dom element form a html string
function addToDom(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let params = document.getElementById('params');
var paramcount = 0;
let addparam = document.getElementById("addparam");
addparam.addEventListener("click", () => {
    let string = `<div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-4">
                        <input type="text" class="form-control" id="para${paramcount + 2}" placeholder="parameter">
                        </div>
                        <div class="col-sm-4">
                        <input type="text" class="form-control" id="value${paramcount + 2}" placeholder="Value">
                        </div>
                        <button type="button" class="btn btn-primary deleteparam">-</button>
                    </div>`;
    let newparam = addToDom(string);
    params.appendChild(newparam);

    // To Delete newly added params
    let deleteparams = document.getElementsByClassName("deleteparam");
    for (item of deleteparams) {
        item.addEventListener('click', (e) => {
            console.log(e.target.parentElement);
            e.target.parentElement.remove();
        })
    }
    paramcount++;
});



let btnsubmit = document.getElementById("btnsubmit");
let data = {};
btnsubmit.addEventListener('click', () => {
    var responsebox = document.getElementById("responsebox");
    responsebox.value = "Please wait your result is getting ready..."

    let reqtype = document.querySelector("input[name='reqtype']:checked").value;
    let cnttype = document.querySelector("input[name='cnttype']:checked").value;

    console.log(paramcount);

    if (cnttype == 'custparams') {
        let data = {};
        for (i = 0; i < (paramcount + 1); i++) {
            if (document.getElementById("para" + (i + 1)) !== undefined) {
                let key = document.getElementById("para" + (i + 1)).value;
                let val = document.getElementById("value" + (i + 1)).value;
                data[key] = val;
            }          
        }
        var newdata = JSON.stringify(data);
    }
    else {
        newdata =document.getElementById('jsonarea').value;
    }

    var url = document.getElementById("urlbox").value;

    // console.log(newdata);
    // console.log(url);
    // console.log(cnttype);
    // console.log(reqtype);

    if (reqtype == "GET") {
        fetch(url).then(response => {
            return response.text();
        }).then(data => {
            responsebox.value = data;
        })
    }
    else { 
        fetch(url, {
            method: 'POST',
            body: newdata,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.text())
          .then(res => responsebox.value=res)}
});