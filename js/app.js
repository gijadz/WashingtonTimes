document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.menu-tendina');
    const scrollMenu = document.querySelector('.menu');

    // Funzione di supporto per chiudere tutti i menu e sistemare l'accessibilità
    const closeAllMenus = () => {
        menuItems.forEach(el => {
            el.classList.remove('active');
            // ACCESSIBILITA': Diciamo allo screen reader che il menu è chiuso
            el.querySelector('.casella').setAttribute('aria-expanded', 'false');
        });
    };

    menuItems.forEach(item => {
        const title = item.querySelector('.casella');
        const dropdown = item.querySelector('.dropdown-content');

        title.addEventListener('click', (e) => {
            e.stopPropagation();

            const isActive = item.classList.contains('active');

            // Chiudiamo tutto prima di aprire il nuovo
            closeAllMenus();

            // Se il menu cliccato NON era aperto, lo apriamo
            if (!isActive) {
                item.classList.add('active');

                // ACCESSIBILITA': Diciamo allo screen reader che il menu è aperto
                title.setAttribute('aria-expanded', 'true');

                // RESPONSIVITA': Facciamo il calcolo dei pixel SOLO se siamo su telefono (es. larghezza <= 768px)
                if (window.innerWidth <= 768) {
                    const rect = title.getBoundingClientRect();
                    dropdown.style.top = rect.bottom + 'px';
                    dropdown.style.left = (rect.left + (rect.width / 2)) + 'px';
                } else {
                    // Puliamo eventuali stili inline rimasti se l'utente allarga la finestra
                    dropdown.style.top = '';
                    dropdown.style.left = '';
                }
            }
        });
    });

    // Se clicchi fuori, chiudi tutto
    window.addEventListener('click', () => {
        closeAllMenus();
    });

    // Se scorri la barra su mobile, chiudi tutto
    if (scrollMenu) {
        scrollMenu.addEventListener('scroll', () => {
            closeAllMenus();
        });
    }

    // NUOVO - ACCESSIBILITA': Se premi il tasto ESC (Escape) sulla tastiera, chiudi tutto
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMenus();
            // Opzionale ma consigliato: se l'utente chiude con ESC, non fargli perdere il focus
            // document.activeElement.blur();
        }
    });

    // NUOVO - RESPONSIVITA': Se l'utente gira il telefono o allarga la finestra, chiudiamo i menu
    // per evitare che le tendine rimangano "volanti" nel punto sbagliato
    window.addEventListener('resize', () => {
        closeAllMenus();
    });
});