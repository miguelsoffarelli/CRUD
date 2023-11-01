let userId = 0;
const URL = 'https://65427cd9ad8044116ed373ff.mockapi.io/users';
let URL_USER = `https://65427cd9ad8044116ed373ff.mockapi.io/users/${userId}`;
const alert = document.getElementById('alert-error');
const searchBtn = document.getElementById('btnGet1');
const searchInput = document.getElementById('inputGet1Id');
const postBtn = document.getElementById('btnPost');
const postInputName = document.getElementById('inputPostNombre');
const postInputLastName = document.getElementById('inputPostApellido');
const putBtn = document.getElementById('btnPut');
const putInputId = document.getElementById('inputPutId');
const putInputName = document.getElementById('inputPutNombre');
const putInputLastName = document.getElementById('inputPutApellido');
const putSendBtn = document.getElementById('btnSendChanges');
const deleteBtn = document.getElementById('btnDelete');
const deleteInput = document.getElementById('inputDelete');
const results = document.getElementById('results');
var modal = new bootstrap.Modal(document.getElementById('dataModal'));
let htmlContentToAppend = ``;

const getOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};


async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            return data;
        } else{
            alert.classList.add('show');
            setTimeout(() => {
            alert.classList.remove('show');
            }, 2000);
        } 
    } catch (error) {
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 2000);
    }
}

searchBtn.addEventListener('click', () => {
    if(searchInput.value === ''){
        htmlContentToAppend = ``;
        results.innerHTML = "";
        fetchData(URL, getOptions)
        .then(data => {
        data.forEach(element => {
            htmlContentToAppend += `
            <li>ID: ${element.id}</li>
            <li>Name: ${element.name}</li>
            <li>Last Name: ${element.lastname}</li>
            <br>
            `; 
        });
        results.innerHTML = htmlContentToAppend;
        });
    } else {
        URL_USER = `https://65427cd9ad8044116ed373ff.mockapi.io/users/${searchInput.value}`;
        fetchData(URL_USER, getOptions)
        .then(data => {
            if(data != undefined){
                htmlContentToAppend = ``;
                results.innerHTML = "";
                htmlContentToAppend += `
                <li>ID: ${data.id}</li>
                <li>Name: ${data.name}</li>
                <li>Last Name: ${data.lastname}</li>
                <br>
                `;
                results.innerHTML = htmlContentToAppend;
            };       
        });
    };
});

postInputName.addEventListener('input', () => {
    if (postInputName.value != '' && postInputLastName.value != ''){
        postBtn.removeAttribute("disabled");
    };
});

postInputLastName.addEventListener('input', () => {
    if (postInputName.value != '' && postInputLastName.value != ''){
        postBtn.removeAttribute("disabled");
    };
});

putInputId.addEventListener('input', () => {
    if (putInputId != ''){
        putBtn.removeAttribute('disabled');
    };
});

putInputName.addEventListener('input', () => {
    if (putInputName.value != '' && putInputLastName != ''){
        putSendBtn.removeAttribute('disabled');
    };
});

putInputLastName.addEventListener('input', () => {
    if (putInputName.value != '' && putInputLastName != ''){
        putSendBtn.removeAttribute('disabled');
    };
});

deleteInput.addEventListener('input', () => {
    if (deleteInput.value != ''){
        deleteBtn.removeAttribute('disabled');
    };
});

postBtn.addEventListener('click', () => {
    const postOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({name: postInputName.value, lastname: postInputLastName.value}),
    };
    fetchData(URL, postOptions)
    .then(() => {
        fetchData(URL, getOptions)
        .then(data => {
            htmlContentToAppend = ``;
            results.innerHTML = "";
            data.forEach(element => {
                htmlContentToAppend += `
                <li>ID: ${element.id}</li>
                <li>Name: ${element.name}</li>
                <li>Last Name: ${element.lastname}</li>
                <br>
                `; 
            });
            results.innerHTML = htmlContentToAppend;
        });
    });  
});

putBtn.addEventListener('click', () => {
    URL_USER = `https://65427cd9ad8044116ed373ff.mockapi.io/users/${putInputId.value}`;
    fetchData(URL_USER, getOptions)
    .then(data => {
        if (data != undefined){
            modal.show();
            putInputName.value = data.name;
            putInputLastName.value = data.lastname;
            putSendBtn.addEventListener('click', () => {
                const putOptions = {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: putInputName.value, lastname: putInputLastName.value}),
                };
                fetchData(URL_USER, putOptions)
                fetchData(URL, getOptions)
                .then(updatedData => {
                    results.innerHTML = "";
                    htmlContentToAppend = ``;
                    updatedData.forEach(element => {
                        results.innerHTML += `
                        <li>ID: ${element.id}</li>
                        <li>Name: ${element.name}</li>
                        <li>Last Name: ${element.lastname}</li>
                        <br>
                        `;
                    });
                });
                modal.hide();
            });
        };
    });
});

deleteBtn.addEventListener('click', () => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    URL_USER = `https://65427cd9ad8044116ed373ff.mockapi.io/users/${deleteInput.value}`;
    fetchData(URL_USER, deleteOptions)
    .then(data => {
        if(data != undefined){
            fetchData(URL, getOptions)
            .then(data => {
                htmlContentToAppend = ``;
                results.innerHTML = "";
                data.forEach(element => {
                    htmlContentToAppend += `
                    <li>ID: ${element.id}</li>
                    <li>Name: ${element.name}</li>
                    <li>Last Name: ${element.lastname}</li>
                    <br>
                    `; 
                });
                results.innerHTML = htmlContentToAppend;
            });
        };
    });
});
/* method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }); */

    /* method: "POST", body: JSON.stringify({nombre: name, apellido: lastName} */