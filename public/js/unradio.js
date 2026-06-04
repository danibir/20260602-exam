document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('click', function (e) {
        // If already checked, uncheck it
        if (this.dataset.checked === "true") {
            this.checked = false
            this.dataset.checked = "false"
        } else {
            // Unmark all radios in the same group
            document.querySelectorAll(`input[name="${this.name}"]`)
                .forEach(r => r.dataset.checked = "false")
            this.dataset.checked = "true"
        }
    })
})