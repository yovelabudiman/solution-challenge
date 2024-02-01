pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
    
    // Get references to various elements
    let pdfinput = document.querySelector(".selectpdf"); // Reference to the PDF file input field
    let pwd = document.querySelector(".pwd"); // Reference to the password input field
    let upload = document.querySelector(".upload"); // Reference to the upload button
    let afterupload = document.querySelector(".afterupload"); // Reference to the result section
    let select = document.querySelector("select"); // Reference to the page selection dropdown
    let download = document.querySelector(".download"); // Reference to the download link
    let pdftext = document.querySelector(".pdftext"); // Reference to the text area for displaying extracted text
    
    // Event listener for the upload button click
    upload.addEventListener('click', () => {
        let file = pdfinput.files[0]; // Get the selected PDF file
        if (file != undefined && file.type == "application/pdf") {
            let fr = new FileReader(); // Create a new FileReader object
            fr.readAsDataURL(file); // Read the file as data URL
            fr.onload = () => {
                let res = fr.result; // Get the result of file reading
                if (pwd.value == "") {
                    extractText(res, false); // Extract text without password
                } else {
                    extractText(res, true); // Extract text with password
                }
            }
        } else {
            alert("Select a valid PDF file");
        }
    });
    
    let alltext = ""; // Array to store all extracted text
    
    // Asynchronous function to extract text from the PDF
    async function extractText(url, pass) {
        try {
            let pdf;
            if (pass) {
                pdf = await pdfjsLib.getDocument({ url: url, password: pwd.value }).promise; // Get the PDF document with password
            } else {
                pdf = await pdfjsLib.getDocument(url).promise; // Get the PDF document without password
            }
            let pages = pdf.numPages; // Get the total number of pages in the PDF
            // for (let i = 1; i <= pages; i++) {
            //     let page = await pdf.getPage(i); // Get the page object for each page
            //     let txt = await page.getTextContent(); // Get the text content of the page
            //     // let text = txt.items.map((s) => s.str).join(""); // Concatenate the text items into a single string
            //     // alltext= alltext+text; // Add the extracted text to the array
            //     for (let j = 0; j < txt.items.length; j++) {
            //         let line = txt.items[j].str; // Get the text of the current text item
            //         allLines.push(line); // Add the line to the array
            //     }
            // }
            // let allLines = [];
            // for (let i = 1; i <= pages; i++) {
            //     let page = await pdf.getPage(i); // Get the page object for each page
            //     let txt = await page.getTextContent(); // Get the text content of the page
            
            //     // Iterate through each text item on the page
            //     for (let j = 0; j < txt.items.length; j++) {
            //         let line = txt.items[j].str; // Get the text of the current text item
            //         allLines.push(line); // Add the line to the array
            //     }
            // }
            
            // // Join all lines into a single string
            // let alltext = allLines.join('\n');
            let allLines = [];
            for (let i = 1; i <= pages; i++) {
                let page = await pdf.getPage(i); // Get the page object for each page
                let txt = await page.getTextContent(); // Get the text content of the page
                
                // Iterate through each text item on the page
                let line;
                for (let j = 0; j < txt.items.length/2; j=j+2) {
                    line += txt.items[j].str +" "; // Get the text of the current text item
                    if (line.length > 30) {
                    allLines.push(line); // Add the line to the array
                    line=""
                    } else {
                        pass
                    }
                }
            }

            // Join all lines into a single string and replace consecutive newlines with a single newline
                
            let alltext = allLines.join('\n').replace(/\n+/g, '\n');

            // Set the value to your pdftext (assuming pdftext is a textarea element)
            pdftext.value = alltext;

            console.log(alltext);
            
            
            let text_list = alltext.split('\n');
            console.log(text_list)
            let final_data = new Set();
            
            for (let i of text_list) {
                if (i.toLowerCase().includes("Amount") || i.toLowerCase().includes("due date") || i.toLowerCase().includes("billing period")) {
                    console.log('looping')
                    final_data.add(i.toLowerCase());
                }
            }

            let amount_due = null;
            let due_date = null;
            let bill_period = null;
            let flag = 0;
            console.log(final_data)
            for (let i of final_data) {
                for (let j of ['$', '€', '¥', '£', '₹', '₽', '฿']) {
                    if (i.includes(j)) {
                        amount_due = i;
                    }
                }

                let count = 0;

                for (let j of ['jan', 'feb', 'mar', 'apr', 'june', 'july', 'sep', 'oct', 'nov', 'dec']) {
                    if (i.includes(j)) {
                        count++;
                    }

                    if (count == 1 && flag == 0) {
                        due_date = i;
                        flag = 1;
                    }

                    if (count == 2 && flag == 1) {
                        bill_period = i;
                        flag = 2;
                    }
                }
            }

            let data_set = {"Amount Due": amount_due.trim(/^\s+|\s+./gm,''), "Due Date": due_date.trim(/^\s+|\s+./gm,''), "Billing Period": bill_period.trim(/^\s+|\s+./gm,'')};
            console.log(data_set);

            pdftext.value = JSON.stringify(data_set)

            afterupload.style.display = "flex"; // Display the result section
            document.querySelector(".another").style.display = "unset"; // Display the "Extract Another PDF" button
        } catch (err) {
            alert(err.message);
        }
    }
    
    // Function to handle the post-processing after text extraction
    function afterProcess() {
        [select.value - 1]; // Display the extracted text for the selected page
        download.href = "data:text/plain;charset=utf-8," + encodeURIComponent(alltext[select.value - 1]); // Set the download link URL for the extracted text

    }