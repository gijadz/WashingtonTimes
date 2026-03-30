document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.menu-tendina');
    const scrollMenu = document.querySelector('.menu');

    //funzione di supporto per chiudere tutti i menu e sistemare l'accessibilità
    const closeAllMenus = () => {
        menuItems.forEach(el => {
            el.classList.remove('active');
            //accessibilità: il menu è chiuso
            el.querySelector('.casella').setAttribute('aria-expanded', 'false');
        });
    };

    menuItems.forEach(item => {
        const title = item.querySelector('.casella');
        const dropdown = item.querySelector('.dropdown-content');

        title.addEventListener('click', (e) => {
            e.stopPropagation();

            const isActive = item.classList.contains('active');

            //chiudo tutto prima di aprire il nuovo
            closeAllMenus();

            //se il menu cliccato non è aperto lo apro
            if (!isActive) {
                item.classList.add('active');

                //il menu è aperto
                title.setAttribute('aria-expanded', 'true');

                //fa il calcolo dei pixel solo se è su telefono (larghezza 768px)
                if (window.innerWidth <= 768) {
                    const rect = title.getBoundingClientRect();
                    dropdown.style.top = rect.bottom + 'px';
                    dropdown.style.left = (rect.left + (rect.width / 2)) + 'px';
                } else {

                    dropdown.style.top = '';
                    dropdown.style.left = '';
                }
            }
        });
    });

    //se clicco fuori chiude tutto
    window.addEventListener('click', () => {
        closeAllMenus();
    });

    //se scorro la barra su telefono chiude tutto
    if (scrollMenu) {
        scrollMenu.addEventListener('scroll', () => {
            closeAllMenus();
        });
    }

    //se premo ESC su tastiera chiude tutto
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMenus();
            // document.activeElement.blur();
        }
    });

    //se giro il telefono o allargo la finestra allora chiude i menu evitando tendine volanti
    window.addEventListener('resize', () => {
        closeAllMenus();
    });
});