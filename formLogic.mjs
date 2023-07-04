import commandOptions from "./commandOptions.mjs";
import config from "./config.mjs";




function handleDropdownChange() {

    var selectedOpt = $(this).val();
    var componentToRender = '';

    if(selectedOpt == 'noCommand')
    {
        $('#btnSubmit').prop('disabled', true);
    }
    else
    {
        $('#btnSubmit').prop('disabled', false);
    }

    componentToRender = commandOptions[selectedOpt];

    $('#form-components').html(componentToRender);
}

function submitForm(e, form) {
    
    e.preventDefault();
    $('#clusterName').prop('disabled', false);

    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    
    var jsonFormData = getFormDataAsJSON(form);
    jsonFormData.clusterName = clustername;
    $('#clusterName').prop('disabled', true);
    form.reset();
    

    microsoftTeams.tasks.submitTask(jsonFormData, config.APP_ID);
    
}

function getFormDataAsJSON(form) {
    const jsonData = {};
    for (const pair of new FormData(form))
    {
        jsonData[pair[0]] = pair[1];
    }
    return jsonData;
}

const sampleForm = document.querySelector("#sampleForm");
if(sampleForm) {
    sampleForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}


const urlParams = new URLSearchParams(window.location.search);
const clustername = urlParams.get('clustername');
//console.log(clustername);



$(document).ready( function() {
    // microsoftTeams.initialize();
    $('#clusterName').html('<label style = "display: block; margin-bottom: 10px;">Cluster name:<input style = "width: 100%; padding: 5px; border-radius: 5px; border: 1px solid #ccc;" type="text" id="clusterName" name="clusterName" placeholder="Enter Name" value="'+ clustername +'" disabled></label>');
    
    $('#command').change(handleDropdownChange);
});