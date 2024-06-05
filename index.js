var siteName = document.getElementById('sitename');
var siteURL = document.getElementById('siteURL');
var btnSumbit = document.getElementById('btnSumbit');


btnSumbit.onclick = addSite;
var sitesList =[];
// lacal storage
if(localStorage.getItem('data') != null)
    {
        sitesList = JSON.parse(localStorage.getItem('data'));
        displaySites();
    }
    
// add sites    
function addSite()
{
    var site ={
        sName : siteName.value,
        sURL : siteURL.value  
    }
    if(isValid == true)
    {
        sitesList.push(site);
        localStorage.setItem('data',JSON.stringify(sitesList));
        displaySites();
        resetForm();
    }
    if (isValid == false) 
    {
        
        window.alert("wrong URL..please enter another one");
        resetForm();
    }
  
}

// display sites
function displaySites()
{
    
    var info = ``;
    for(var index= 0;index< sitesList.length ;index++ )
        {
          info +=
            `
            <tr>
            <td>${index+1}</td>
            <td>${sitesList[index].sName}</td>
            <td><a target="_blank" href="${sitesList[index].sURL}"><button  class="btn btn-secondary"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
            <td><button onclick="deleteSite(${index})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
            </tr>`
        }
        document.getElementById('tablebody').innerHTML=info;
}


// reset form (clear form)
function resetForm()
{
    siteName.value =null;
    siteURL.value = null; 
}

// delete site
function deleteSite(index)
{
    sitesList.splice(index,1);
    localStorage.setItem('data',JSON.stringify(sitesList)); //update local storage
    displaySites();
}


// array of object --> json
// json.stringify(arrname) --> to tranfer the array to string


// valdiate
var isValid = true;
function valdiation(element)
{
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    var myValue = siteURL.value;
    if(regex.test(myValue) == true)
    {
        isValid = true;
        element.classList.add('is-valid'); 
        element.classList.remove('is-invalid');
    }
    else
    {
           element.classList.add('is-invalid');  
           element.classList.remove('is-valid');
           isValid = false;
           
    }    
}

