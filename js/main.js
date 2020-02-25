document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search");
    const selectSearch = document.getElementById("selectSearch");
    const submit = document.getElementById("submitAddProduct");
    const inputSearch = document.getElementById("inputSearch");
    const typeProduct = document.getElementById("typeProductSelect");
    
    let numberRow = 0;

    const modalData = {
        purchase: document.getElementById("textfieldPurchase"),
        sale: document.getElementById("textfieldSale"),
        id: document.getElementById("textfieldID"),
        desc: document.getElementById("textfieldDesc"),
        photo: document.getElementById("uploadPhotoBtn_1"),
        Who: document.getElementById("textfieldWho"),
    };

    


    searchBtn.addEventListener("click", () => {

        let index = selectSearch.options.selectedIndex;
        let value = selectSearch.options[index].value;

        if (value == "id" && inputSearch.value) {         
           printId(inputSearch.value);                     
        }
        else if (value == "all") {
            printAll();
        }
        else if (value == "purchase") {
            printPurchase(inputSearch.value);
        }
        else {
            printSale(inputSearch.value);
        }
    });

    uploadPhotoBtn_2.addEventListener("click", (e) => {
        e.preventDefault();
        modalData.photo.click();
    });

    submit.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        let index = typeProduct.options.selectedIndex;
        let value = typeProduct.options[index].value;


        const modalValues = {     
            "purchase": modalData.purchase.value.trim(),
            "sale": modalData.sale.value.trim(),
            "id": modalData.id.value.trim(),
            "descriptions": modalData.desc.value.trim(),   
            "Who": modalData.Who.value.trim(),   
            "TypeProduct": value   
        };

        if(modalData.purchase.value && modalData.sale.value &&
           modalData.id.value && modalData.Who.value && value != "null") {


            $.post("./api/main.php", modalValues);
            document.querySelector(".modal").click();
        }
        else {
            document.getElementById("typeProductSelect").classList = "ui inverted red button";
        }

        if (modalData.photo.files.length != 0) {
            let photos = new FormData(); 

            for(let i = 0; i < modalData.photo.files.length; i++) {          
                photos.append(i, modalData.photo.files[i]);
                
            }
            photos.append("my_file_upload", 1);


            $.ajax({
                url         : './api/savePhotos.php',
                type        : 'POST',
                data        : photos,
                cache       : false,
                dataType    : 'text',
                // отключаем обработку передаваемых данных, пусть передаются как есть
                processData : false,
                // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
                contentType : false,
                // функция успешного ответа сервера
                success     : function( respond, status, jqXHR ){
        
                    // ОК
                    if( typeof respond.error === 'undefined' ){
                        // файлы загружены, делаем что-нибудь
        
                        // покажем пути к загруженным файлам в блок '.ajax-reply'
        
                        var files_path = respond.files;
                        var html = '';
                        $.each( files_path, function( key, val ){
                             html += val +'<br>';
                        } )
        
                        $('.ajax-reply').html( html );
                    }
                    // error
                    else {
                        console.log('ОШИБКА: ' + respond.error );
                    }
                },
                // функция ошибки ответа сервера
                error: function( jqXHR, status, errorThrown ){
                    console.log( 'ОШИБКА AJAX запроса: ' + status, jqXHR );
                }
        
            });


        }
         

        

       
        
    });










    const printAll = () => {
        $.get( "./api/getAll.php", (data) => {
            let json = JSON.stringify(data); 
            json = JSON.parse(json);
            

            
            clearTable();
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


            clearTable();
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

    const printPurchase = (purchase) => {
        $.get("./api/getAll.php", (data) => {
            let json = JSON.stringify(data);
            json = JSON.parse(json);


            clearTable();
            const table = document.querySelector("tbody");

            for (let value of json) {
                if (value.purchase == purchase) {
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

    const printSale = (sale) => {
        $.get("./api/getAll.php", (data) => {
            let json = JSON.stringify(data);
            json = JSON.parse(json);


            clearTable();
            const table = document.querySelector("tbody");

            for (let value of json) {
                if (value.sale == sale) {
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

    const clearTable = () => {
       let oldTable = document.querySelector("table").lastElementChild;

       oldTable.replaceWith(document.createElement("tbody"));
       numberRow = 0;   
    };




});