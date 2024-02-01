const UIControl = (function () {
    const Selectors = {
        shopingCartAside: "#shopingCartAside",
        customerForms: "#customerForms",
        pageOverlay: ".page-overlay",
        headerTools: ".header-tools",
        cartBtn: ".header-tools__cart",
        profileBtn: ".header-tools__profile",
        closeBtn: "bi-x",
        searchDiv: ".js-content-visible",
        navTab: ".nav-tab",
        tabContent: ".tab-content"
    }

    return {
        getSelectors: function () {
            return Selectors;
        },
        showCartAside: function () {
            document.querySelector(Selectors.pageOverlay).classList.add("page-overlay-visible");
            document.querySelector(Selectors.shopingCartAside).classList.add("aside-visible");
        },
        showProfileAside: function () {
            document.querySelector(Selectors.pageOverlay).classList.add("page-overlay-visible");
            document.querySelector(Selectors.customerForms).classList.add("aside-visible");
        },
        asideClose(e) {
            const cartAside = document.querySelector(Selectors.shopingCartAside);
            const customerAside = document.querySelector(Selectors.customerForms);
            const pageOverlay = document.querySelector(Selectors.pageOverlay);

            if (e.target == pageOverlay || e.target.classList.contains("bi-x")) {
                pageOverlay.classList.remove("page-overlay-visible");
                cartAside.classList.remove("aside-visible");
                customerAside.classList.remove("aside-visible");
            }

        },
        showSearchArea: function () {
            const searchDiv = document.querySelector(Selectors.searchDiv);
            const searchBtn = searchDiv.children[0].children[0]
            if (searchBtn.classList.contains("bi-search")) {

                if (searchDiv.classList.contains("visible") == false) {
                    searchDiv.children[1].classList.add("visible");
                    searchBtn.classList.remove("bi-search")
                    searchBtn.classList.add("bi-x")
                }
            } else {
                searchDiv.children[1].classList.remove("visible");
                searchBtn.classList.remove("bi-x")
                searchBtn.classList.add("bi-search")
            }
        },
        tapPaneActive: function (e) {
            const navs = document.querySelector(Selectors.navTab).children;
            const tabs = document.querySelector(Selectors.tabContent).children;
            const triggerId = e.target.getAttribute("id");

            Array.from(navs).forEach(nav => {
                if (nav.children[0].getAttribute("id") == triggerId) {
                    e.target.classList.add("active");

                    Array.from(tabs).forEach(tab => {
                        if (tab.getAttribute("aria-labelledby") == triggerId) {
                            tab.classList.add("active");
                        } else {
                            if (tab.classList.contains("active")) {
                                tab.classList.remove("active");
                            }
                        }
                    });

                } else {
                    nav.children[0].classList.remove("active");

                }
            });

            // if (!e.target.classList.contains("active")) {
            //     e.target.classList.add("active");
            //     console.log(document.querySelector(Selectors.navTab).children
            //     )
            // }

        }
    }
})()

const App = (function (UICtrl) {
    const UISelectors = UICtrl.getSelectors();

    const loadEventListener = function () {
        const shopCartButtons = document.querySelectorAll(UISelectors.cartBtn)
        const navsItem = document.querySelector(UISelectors.navTab).children;

        shopCartButtons.forEach(btn => {
            btn.addEventListener("click", showCartAside);
        });
        document.querySelector(UISelectors.profileBtn).addEventListener("click", showProfileAside);

        document.addEventListener("click", hiddenAside);

        document.querySelector(UISelectors.searchDiv).children[0].addEventListener("click", showSearchDiv)

        //home product area
        Array.from(navsItem).forEach(nav => {
            nav.addEventListener("click", tapPaneActive)
        });

    }

    const showCartAside = function () {
        UICtrl.showCartAside()
    }

    const showProfileAside = function () {
        UICtrl.showProfileAside()
    }

    const hiddenAside = function (e) {
        UICtrl.asideClose(e);
    }
    const showSearchDiv = function () {
        UICtrl.showSearchArea();
    }
    const tapPaneActive = function (e) {
        UICtrl.tapPaneActive(e);
    }

    return {
        init: function () {
            loadEventListener();
        }
    }
})(UIControl);

function asideControl() {
    App.init();
}

export default asideControl();
