document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search");
    const selectSearch = document.getElementById("selectSearch");
    const submit = document.getElementById("submitAddProduct");
    const inputSearch = document.getElementById("inputSearch");
    let numberRow = 0;

    const modalData = {
        purchase: document.getElementById("textfieldPurchase"),
        sale: document.getElementById("textfieldSale"),
        id: document.getElementById("textfieldID"),
        desc: document.getElementById("textfieldDesc"),
        photo: document.getElementById("uploadPhotoBtn_1")
    };
    


    searchBtn.addEventListener("click", () => {

        let index = selectSearch.options.selectedIndex;
        let value = selectSearch.options[index].value;

        if (value == "id") {
            
            let v = inputSearch.value;
            if(v) {
               console.log("id");
               printId(v); 
            } else {
            console.log("null");
            }
            
        }
        else if (value == "all") {
            printAll();
        }
    });

    uploadPhotoBtn_2.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("uploadPhotoBtn_1").click();
    });

    submit.addEventListener("click", (e) => {
        e.preventDefault();

        const modalValues = {     
            "purchase": modalData.purchase.value,
            "sale": modalData.sale.value,
            "id": modalData.id.value,
            "descriptions": modalData.desc.value   
        };
        

        $.post("./api/main.php", modalValues);
        
    });

    const printAll = () => {
        $.get( "./api/getAll.php", (data) => {
            let json = JSON.stringify(data); 
            json = JSON.parse(json);
            

            const table = document.querySelector("tbody");

            

            json.forEach((value) => {
                const tr = document.createElement("tr");
                const th = document.createElement("th"); 
                th.setAttribute("scope", "row");
                th.textContent = ++numberRow;

                const tdElem1 = document.createElement("td");
                tdElem1.textContent = value.purchase;
                const tdElem2 = document.createElement("td");
                tdElem2.textContent = value.sale;
                const tdElem3 = document.createElement("td");
                tdElem3 .textContent = value.id;
                
                tr.appendChild(th);
                tr.appendChild(tdElem1);
                tr.appendChild(tdElem2);
                tr.appendChild(tdElem3);
                table.appendChild(tr);
                
            });       
        });
    };

    const printId = (id) => {
        $.get("./api/getAll.php", (data) => {
            let json = JSON.stringify(data);
            json = JSON.parse(json);


            const table = document.querySelector("tbody");




            for (let value of json) {
                if (value.id == id) {
                    const tr = document.createElement("tr");
                    const th = document.createElement("th");
                    th.setAttribute("scope", "row");
                    th.textContent = ++numberRow;

                    const tdElem1 = document.createElement("td");
                    tdElem1.textContent = value.purchase;
                    const tdElem2 = document.createElement("td");
                    tdElem2.textContent = value.sale;
                    const tdElem3 = document.createElement("td");
                    tdElem3.textContent = value.id;

                    tr.appendChild(th);
                    tr.appendChild(tdElem1);
                    tr.appendChild(tdElem2);
                    tr.appendChild(tdElem3);

                    table.appendChild(tr);
                }
            }
        });
    };




});