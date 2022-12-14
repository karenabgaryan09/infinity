(function () {
    const query = document.querySelector.bind(document);
    const queryAll = document.querySelectorAll.bind(document);

    function Navbar({}) {
        this.navbar = null;
        this.links = null;
        this.navbarBackdrop = null;
        this.toggle = null;
    }

    Navbar.prototype = {
        constructor: Navbar,

        handleScroll(removeScroll) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth + "px";
            const navbar = document.querySelector(".navbar");

            document.body.style.paddingRight = removeScroll ? scrollbarWidth : "";
            document.body.style.overflow = removeScroll ? "hidden" : "";
            if (navbar) navbar.style.borderRight = removeScroll ? `${scrollbarWidth} solid transparent` : "";
        },
        showHideLinks(show, hideLinks) {
            this.links = document.querySelectorAll(".navbar .nav-link");
            if (!this.links || !this.links.length) return;
                this.links.forEach((link, index) => {
                    link.style.animation = show ? `navLinkFade 1s forwards ${(index + 1) / 3}s` : "";
                });
            if (hideLinks) this.showHideLinks(false);
        },
        createBackdrop() {
            this.navbarBackdrop = document.createElement("div");
            this.navbarBackdrop.className = "navbar-backdrop";
            this.navbarBackdrop.addEventListener("click", () => this.toggle.click(), { once: true });
            this.navbar.parentElement.insertBefore(this.navbarBackdrop, this.navbar.nextElementSibling);
            setTimeout(() => this.navbarBackdrop.classList.add("show"), 100);
        },
        removeTransition(menu) {
            menu.addEventListener(
                "transitionend",
                (e) => {
                    e.currentTarget.classList.replace("altCollapsing", "altCollapse");
                    e.currentTarget.style = "";
                },
                { once: true }
            );
        },
        showMenu(menu) {
            menu.classList.replace("altCollapse", "altCollapsing");
            menu.classList.add("show");
            if (!this.navbar) this.navbar = document.querySelector(".navbar");
            setTimeout(() => {
                menu.style = `transform: none; height: calc(100vh - ${this.navbar.offsetHeight + 1}px)`;
            }, 0);
            this.removeTransition(menu);
            this.toggle.classList.remove("altCollapsed");
            this.createBackdrop();
            this.handleScroll(true);
                this.showHideLinks(true);
        },
        hideMenu(menu) {
            menu.classList.replace("altCollapse", "altCollapsing");
            menu.classList.remove("show");
            this.removeTransition(menu, true);
            this.toggle.classList.add("altCollapsed");
            this.navbarBackdrop.remove();
            this.handleScroll();
        },

        init(toggle) {
            this.toggle = toggle;
            const menu = document.querySelector(this.toggle.dataset.target);
            const isMenuShown = menu.classList.contains("show");
            isMenuShown ? this.hideMenu(menu) : this.showMenu(menu);
            this.switchDropdownCollapse();
        },
        switchDropdownCollapse() {
            const toggles = document.querySelectorAll(".navbar-nav [data-toggle]");
            const contents = document.querySelectorAll(".navbar-nav ul");

            let animationType = "dropdown";
            let contentName = "dropdown-menu";

            if (window.innerWidth < 992) {
                animationType = "collapse";
                contentName = "content-collapse";
            } else if (this.navbarBackdrop) {
                this.hideMenu(document.querySelector(this.toggle.dataset.target));
                this.navbarBackdrop = null;
            }

            toggles.forEach((toggle) => {
                toggle.classList.remove("dropped", "show");
                toggle.setAttribute("data-toggle", animationType);
            });

            contents.forEach((content) => {
                content.classList.remove("dropdown-menu", "drop", "content-collapse", "collapse", "show");
                content.classList.add(contentName, animationType === "dropdown" ? "drop" : animationType);
            });
        },
        setEvents() {
            document.addEventListener("click", (e) => {
                const toggle = e.target.closest("[data-toggle='altCollapse']");
                if (toggle) this.init(toggle);
            });
            // window.addEventListener("scroll", () => {
            //     if (!this.navbar) this.navbar = document.querySelector(".navbar");
            //     this.navbar.classList.toggle("shrink", window.scrollY > 0);
            // }); //window.scrollY > 300
            window.addEventListener("resize", () => this.switchDropdownCollapse());
        },
    };

    const state = {};

    const navbarInverted = new Navbar(state);
    navbarInverted.setEvents();
    // navbarInverted.switchDropdownCollapse();  // switch not going to work in react
})();
