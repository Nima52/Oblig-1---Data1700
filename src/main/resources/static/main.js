//--- Ticket
let billettArray = []

//--- Select
const films = [
    "Film 1",
    "Film 2",
    "Film 3"
]

const velgFilmSelect = document.getElementById("velg-film")

films.forEach(function(film) {
    const option = document.createElement("option")
    option.text = film
    velgFilmSelect.appendChild(option)
})


//--- Form Validation
const validations = [
    { id: "velg-film", isValid: () => document.getElementById("velg-film").selectedOptions[0].text !== "Velg film her", message: "Velg en film!" },
    { id: "antall", isValid: value => !isNaN(value) && value.trim() !== "", message: "Ikke gyldig tall." },
    { id: "fornavn", isValid: value => /^[a-zA-Z ]+$/.test(value) && value.trim() !== "", message: "Ikke gyldig navn." },
    { id: "etternavn", isValid: value => /^[a-zA-Z ]+$/.test(value) && value.trim() !== "", message: "Ikke gyldig etternavn." },
    { id: "telefonnr", isValid: value => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value), message: "Ikke et gyldig telefonnummer. +919367788755" },
    { id: "epost", isValid: value => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value) && value.trim() !== "", message: "Ikke en gyldig epostadresse. test@gmail.com" }
]
validations.forEach(validation => {
    const input = document.getElementById(validation.id)
    input.addEventListener('input', () => {
        input.setCustomValidity('')
    })
})

function validateInputFields(arrayList) {
    let formIsValid = true;
    let invalidInputs = [];
    arrayList.forEach(validation => {
        const input = document.getElementById(validation.id)
        const value = input.value.trim()
        if (!validation.isValid(value)) {
            input.setCustomValidity(validation.message)
            formIsValid = false
            invalidInputs.push(input)
        }
    })
    if (formIsValid === false){
        invalidInputs[0].reportValidity()
    }
    return formIsValid
}

//--- Form Submit
document.getElementById("kjøp-billett").addEventListener("submit", function(e) {
    e.preventDefault()

    const filmSelect = document.getElementById("velg-film")
    const antallInput = document.getElementById("antall")
    const fornavnInput = document.getElementById("fornavn")
    const etternavnInput = document.getElementById("etternavn")
    const telefonnrInput = document.getElementById("telefonnr")
    const epostInput = document.getElementById("epost")

    //--- Form Validation
    let validationResult = validateInputFields(validations)
    if (!validationResult){
        return
    }

    //--- Form Processing Logic
    const billett = {
        film: filmSelect.value.trim(),
        antall: antallInput.value.trim(),
        fornavn: fornavnInput.value.trim(),
        etternavn: etternavnInput.value.trim(),
        telefonnr: telefonnrInput.value.trim(),
        epost: epostInput.value.trim()
    };
    billettArray.push(billett)

    billettToTable(billettArray,"billett-template","billett-table-body","billett-utsikt")

    //--- Form Successful Submission
    alert("Billett kjøpt!")
    this.reset()
});

//--- Table Handling
document.getElementById("slett-alle-billett").addEventListener("click", function() {
    billettArray = []
    billettToTable(billettArray,"billett-template","billett-table-body","billett-utsikt")
})

document.getElementById("billett-utsikt").style.display = "none"
function billettToTable(ticketData,ticketTemplate,ticketTableBody, ticketView) {
    if (ticketData.length>0){
        const template = document.getElementById(ticketTemplate)
        const ticketRow = template.content.cloneNode(true)

        ticketData.forEach(ticket => {
            Object.entries(ticket).forEach(([key, value]) => {
                const td = ticketRow.querySelector(`[data-billett-key="${key}"]`)
                if (td) {
                    td.textContent = value
                }
            })
        })

        document.getElementById(ticketTableBody).appendChild(ticketRow)
        document.getElementById(ticketView).style.display = "block"
    } else {
        document.getElementById(ticketTableBody).innerHTML=""
        document.getElementById(ticketView).style.display = "none"
    }
    console.log(billettArray)
}
