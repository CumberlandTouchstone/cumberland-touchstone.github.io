class Modal {
    constructor(modalId, openBtnId, closeClass) {
        this.modal = document.getElementById(modalId);
        this.btn = document.getElementById(openBtnId);
        this.span = document.getElementsByClassName(closeClass)[0];

        this.init();
    }

    init() {
        if (this.btn) {
            this.btn.onclick = () => {
                this.modal.style.display = "block";
            }
        }

        if (this.span) {
            this.span.onclick = () => {
                this.modal.style.display = "none";
            }
        }

        window.onclick = (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        }
    }
}

// Initialize the modal
new Modal("myModal", "openModalBtn", "close");