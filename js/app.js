document.addEventListener('DOMContentLoaded', () => { //aspetta che tutta la pagina sia caricata prima di far partire lo script

    //seleziona tutti i .menu-tendina presenti nella pagina
    const menuItems = document.querySelectorAll('.menu-tendina');

    //prende il menu a tendina (che sul telefono scorre) e seleziona tutti i .menu-tendina
    const scrollMenu = document.querySelector('.menu');

    menuItems.forEach(item => {
        //trova la casella cliccabile nella barra e la tendina associata ad essa
        const title = item.querySelector('.casella');
        const dropdown = item.querySelector('.dropdown-content');

        //aggiunge un evento al click
        title.addEventListener('click', (e) => {
            e.stopPropagation();
            //controlla se il  menu è già aperto e per sicurezza chiude tutti i menu aperti
            const isActive = item.classList.contains('active');
            menuItems.forEach(el => el.classList.remove('active'));

            //se il menu cliccato non era già aperto lo apre
            if (!isActive) {
                item.classList.add('active');
                const rect = title.getBoundingClientRect();
                //sposta la tendina in basso proprio sotto il bordo inferiore della parola
                dropdown.style.top = rect.bottom + 'px';
                //sposta la tendina a sinistra, partendo dal bordo sinistro della parola e aggiunge metà della larghezza della parola per centrarla
                dropdown.style.left = (rect.left + (rect.width / 2)) + 'px';
            }
        });
    });


    //se clicchi in un punto qualsiasi della finestra del browser chiudi tutte le tendine
    window.addEventListener('click', () => {
        menuItems.forEach(el => el.classList.remove('active'));
    });

    // Se il menu esiste (scrollMenu) e se l'utente la fa scorrere con il dito chiude tutte le tendine senza farle rimanere sospese sullo schermo
    if (scrollMenu) {
        scrollMenu.addEventListener('scroll', () => {
            menuItems.forEach(el => el.classList.remove('active'));
        });
    }
});