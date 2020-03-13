document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search");
    const selectSearch = document.getElementById("selectSearch");
    const submit = document.getElementById("submitAddProduct");
    const inputSearch = document.getElementById("inputSearch");
    const typeProduct = document.getElementById("typeProductSelect");
    const slideModal = document.getElementById("slideModal");
    
   
    let numberRow = 0;
    let maintable;
    let selectedRow = [];

    const modalData = {
        purchase: document.getElementById("textfieldPurchase"),
        sale: document.getElementById("textfieldSale"),
        id: document.getElementById("textfieldID"),
        desc: document.getElementById("textfieldDesc"),
        photo: document.getElementById("uploadPhotoBtn_1"),
        Who: document.getElementById("textfieldWho"),
    };

    const sliderForm = {
        purchase: document.getElementById("slider__purchase-item"),
        sale: document.getElementById("slider__sale-item"),
        id: document.getElementById("slider__id-item"),
        desc: document.getElementById("slider__desc-item"),
        type: document.getElementById("slider__type-item"),
        Who: document.getElementById("slider__who-item"),
        photoContainer: document.getElementById("slider__photoContainer"),
    };


    


    searchBtn.addEventListener("click", () => {

        let index = selectSearch.options.selectedIndex;
        let value = selectSearch.options[index].value;

                
          
                        
        
        if (value == "all") {
            printAll();    
        }
        else if (value == "backpackAll") {
            printSearchAllType("backpack","backpackGirl");
        }
        else if (value == "bagAll") {
            printSearchAllType("bagGirl","bagMan","BigBack","BigBackWhell","BagforBoock");
        }
        else if (value == "iemodansAll") {
            printSearchAllType("iemodans","iemodansText");
        }
        else if (value == "walletAll") {
            printSearchAllType("walletMan","walletGirl");
        }
        else {
           printSearch(inputSearch.value, value);  
        }

        setTimeout(listen, 500);
        
        
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
            "TypeProduct": value,
            "urlPhoto":  modalData.photo.files.length != 0 ? `${value}/${modalData.id.value.trim()}` : ""  
        };

          
        if(modalData.purchase.value && modalData.sale.value &&
           modalData.id.value && modalData.Who.value && value != "null") {
            $.post("./api/addProduct.php", modalValues,()=>{
                document.querySelector(".modal").click();
                searchBtn.click();// обновляем таблицу рендеринг              
            });
            
        }
        else {
            document.getElementById("typeProductSelect").classList = "ui inverted red button";
        }

        if (modalData.photo.files.length != 0 && value != "null") {
            let photos = new FormData(); 

            for(let i = 0; i < modalData.photo.files.length; i++) {          
                photos.append(i, modalData.photo.files[i]);
                
            }
            photos.append("my_file_upload", 1);         
            photos.append("dirURLPhoto", modalValues.urlPhoto);


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
        
                    //    console.log(respond);
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

    btnDelete.addEventListener("click", () => {  
        closeDel.click();
        let json = {};

        for (let i = 0, j = 0; i < maintable.rows.length; i++) {
            if (maintable.rows[i].classList == "selected") {
                json[j++] = {
                    "purchase": maintable.rows[i].cells[1].textContent,
                    "sale": maintable.rows[i].cells[2].textContent,
                    "id": maintable.rows[i].cells[3].textContent,
                    "descriptions": maintable.rows[i].cells[6].textContent,
                    "Who":maintable.rows[i].cells[4].textContent,
                    "TypeProduct": converterWord(maintable.rows[i].cells[5].textContent),                    
                    "urlPhoto": maintable.rows[i].cells[7].textContent                  
                }
                
            }
            
        }
        

       $.post("./api/deleteProduct.php",json,() => {
          closeDel.click();
          searchBtn.click();          
       });

        selectedRow = [];
    });




    


   
    










    const printAll = () => {
        $.get( "./api/getAll.php", (data) => {
            let json = JSON.stringify(data); 
            json = JSON.parse(json);
            

            
            clearTable();
            
            

            json.forEach((value) => {
                createTable(value);              
            });       
        });
    };

    const printSearch = (searchValue, typeSearch) => {
        $.get("./api/getAll.php", (data) => {
            let json = JSON.stringify(data);
            json = JSON.parse(json);


            clearTable();           

            for (let value of json) {
                if (value[typeSearch] == searchValue || searchValue == "" && value.TypeProduct == typeSearch) {
                    createTable(value);
                }
            }
        });
    };
    const printSearchAllType = (...args) => {
        $.get("./api/getAll.php", (data) => {
            let json = JSON.stringify(data);
            json = JSON.parse(json);


            clearTable();           

            for (let value of json) {
                args.forEach((arg) => {
                    if (value.TypeProduct == arg) {
                        createTable(value);
                    }
                });
            }
        });
    };

    const clearTable = () => {
       let oldTable = document.querySelector("table").lastElementChild;

       oldTable.replaceWith(document.createElement("tbody"));
       numberRow = 0;   
    };

    const createTable = (value) => {

        const table = document.querySelector("tbody");
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
        const tdElem4 = document.createElement("td");
        tdElem4.textContent = value.Who;
        const tdElem5 = document.createElement("td");
        tdElem5.textContent = converterWord(value.TypeProduct);
        const tdElem6 = document.createElement("td");
        tdElem6.textContent = value.descriptions;
        tdElem6.style.display = "none";
        const tdElem7 = document.createElement("td");
        tdElem7.textContent = value.urlPhoto;
        tdElem7.style.display = "none";
        
        tr.appendChild(th);
        tr.appendChild(tdElem1);
        tr.appendChild(tdElem2);
        tr.appendChild(tdElem3);
        tr.appendChild(tdElem4);
        tr.appendChild(tdElem5);
        tr.appendChild(tdElem6);
        tr.appendChild(tdElem7);
        table.appendChild(tr);
        
    };

    const listen = () => {
        try {
             maintable = document.querySelector("tbody");
            for (let i = 0; i < maintable.rows.length; i++) {
                maintable.rows[i].addEventListener("click", () => {

                    if (maintable.rows[i].classList == "") {
                        maintable.rows[i].classList = "selected";
                        maintable.rows[i].style.color = "red";
                        selectedRow.push(maintable.rows[i]);
                    }
                    else {
                        maintable.rows[i].classList = "";
                        maintable.rows[i].style.color = "#ffffff";
                        selectedRow.splice(selectedRow.indexOf(maintable.rows[i]),1);
                    }
                        // console.log(selectedRow);    
                });

                maintable.rows[i].addEventListener("dblclick", () => {
                    console.dir(maintable.rows[i]);

                    sliderForm.purchase.textContent = maintable.rows[i].cells[1].textContent;
                    sliderForm.sale.textContent = maintable.rows[i].cells[2].textContent;
                    sliderForm.id.textContent = maintable.rows[i].cells[3].textContent;
                    sliderForm.Who.textContent = maintable.rows[i].cells[4].textContent;
                    sliderForm.type.textContent = maintable.rows[i].cells[5].textContent;
                    sliderForm.desc.textContent = maintable.rows[i].cells[6].textContent;

                    let urlPhoto = maintable.rows[i].cells[7].textContent;

                   
                    
                    sliderForm.photoContainer.removeChild(sliderForm.photoContainer.children[0]);

                    let div = document.createElement("div");
                    div.classList = "owl-carousel";
                    div.classList += " owl-theme";
                    div.id = "own__container";  
        
                     sliderForm.photoContainer.appendChild(div);
                
                    let ownContainer = document.getElementById("own__container");
                    if (urlPhoto != "") {
                        $.post("./api/getPhoto.php",urlPhoto,(data) => {
                            let json = JSON.parse(data);                          
                            json.forEach(url => {                               
                                let div = document.createElement("div");
                                let img = document.createElement("img");
                               
                                div.classList = "item";
                                img.src = url.slice(3,url.length);

                                div.appendChild(img);
                                ownContainer.appendChild(div);
                                
                            });

                            $(document).ready(function () {
                                $('.owl-carousel').owlCarousel({
                                  loop: true,
                                  margin: 15,
                                  nav: false,
                                  
                                  responsive: {
                                    0: {
                                      items: 1
                                    },
                                    600: {
                                      items: 1
                                    },
                                    1000: {
                                      items: 1
                                    }
                                  }
                                });
                              });
                        });
                    }

                    slideModal.click();
                });
            }
        }
        catch (error) {

        }
        
        
       
    };

    const converterWord = (word) => {
        let mas = {
            "backpackGirl" : "Рюкзак женский кож.зам",
            "backpack" : "Рюкзак",
            "bagGirl" : "Сумка женская кож.зам",
            "bagMan" : "Сумка мужская",
            "BigBack" : "Сумка богажная",
            "BigBackWhell" : "Сумка богажная на колёсах",
            "BagforBoock" : "Сумка для ноутбуков",
            "iemodans" : "Чемоданы пластик",
            "iemodansText" : "Чемоданы текстиль",
            "walletMan" : "Кошелёк мужской",
            "walletGirl" : "Кошелёк женский",
            "clutch" : "Клатч"
        };

        for (let i in mas) {
            if (word == i) {
                return mas[i];
            }
            else if (word == mas[i]) {
                return i;
            }
        }
    };

    

    


    

});

