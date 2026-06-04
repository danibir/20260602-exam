document.querySelectorAll('#popupDestroy').forEach(radio => {
    radio.addEventListener('click', function (e) {
        this.parentNode.style.display='none'
    })
})