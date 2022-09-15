let button = document.getElementById(`input-btn`)
let output = document.getElementById(`output`)
let input = document.getElementById(`input-el`)
let myLeads = []
let lists = document.getElementById(`listEverything`) 
let temp = -1;
let listItems = "";
let local = 0;
let getURL = document.getElementById(`thisURL`)
let clear = document.getElementById(`clearList`)


outputvalue()

clear.addEventListener(`click`, () => {
localStorage.clear();
output.innerHTML = "";
});


getURL.addEventListener(`click`, function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem(`myLeads`, JSON.stringify(myLeads))
        temp += 1;
        input.value = null
        list(myLeads)
    })
})
button.onclick = storeanddisplay
input.addEventListener(`keydown`, (event)=>{if(event.key === "Enter"){storeanddisplay()}})


function storeanddisplay(leads){
    if(input.value == ''){
        alert(`Input field cannot be empty!`)
    }
    else{
        myLeads.push(input.value)
        temp+=1
        input.value = null;
        list(myLeads)
    }
}

function list(leads){
    if(local == 0 && ((localStorage.getItem(`localCount`)) == null)){
        local = Number(localStorage.getItem(`localCount`)) + 1;
    } else{
        local = Number(localStorage.getItem(`localCount`))
    }
    for( i=temp;i<leads.length;i++){
        var a = document.createElement("a")
        let line = document.createElement(`li`)
        a.setAttribute(`href`, `${leads[i]}`)
        a.target = "_blank"
        a.innerHTML = "<li>" + `\n ${leads[i]}` + "</li>" 
        lists.append(a)
        console.log(a)
        localStorage.setItem(`${local}`, `${leads[i]}`)
        local +=1
        localStorage.setItem(`localCount`, local)
    }
}

function outputvalue(){
    for(i=1;i<localStorage.getItem(`localCount`);i++){
        output.innerHTML = output.innerHTML + `<br>` + `<a href = ${localStorage.getItem(i)} target = "_blank">` + localStorage.getItem(`${i}`) + `</a>`
    }
}






















// function list(){
//     for( i=temp;i<leads.length;i++){
//         let line = document.createElement(`li`)
//         listItems = `${listItems}<br>${leads[i]}`
//     }
//     lists.innerHTML =  listItems
// }


// THIS WAS THE ORIGINAL WAY AND STILL WORKS
// function storeanddisplay(){
//     if(!(input.value == '')){
//     leads.push(input.value)
//     output.innerText += `\n ${input.value}`;
//     input.value = null;
//     console.log(leads);}
// }
