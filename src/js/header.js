const UIControl = (function () {

    const Selectors = {
        openMenuBtn: ".mobile-menu__activator",
        body: "body",
        navigationMenu: ".mobile-navigation-menu",
        navigationLink: ".navigation-link",
        backMenu: ".js-back-menu",
        cartBtn: ".header-tools__cart",



    }

    return {
        getSelectors: function () {
            return Selectors;
        },
        mobileMenuControl: function () {
            const bodyTag = document.querySelector(Selectors.body);
            if (bodyTag.classList.contains("mobile-menu-opened") == false) {
                //open menu 
                bodyTag.classList.add("mobile-menu-opened");
                //change menuBtn
                const menuButton = document.querySelector(Selectors.openMenuBtn).childNodes[1]
                menuButton.classList.remove("bi-list");
                menuButton.classList.add("bi-x");
            } else {
                //close menu
                document.querySelector(Selectors.body).classList.remove("mobile-menu-opened");

                //change menuBtn
                const menuButton = document.querySelector(Selectors.openMenuBtn).childNodes[1]
                menuButton.classList.remove("bi-x");
                menuButton.classList.add("bi-list");
            }

        },
        mobileNavController: function (e) {
            console.log(e.target.nextElementSibling)
            //click navigation-item
            if (e.target.classList.contains("js-nav-right")) {
                //open sub-menu
                document.querySelector(Selectors.navigationMenu).classList.add("active");
                //display sub-menu
                e.target.nextElementSibling.classList.remove("d-none");
                e.target.nextElementSibling.classList.add("d-block");
            }
        },

        //back menu 
        backMenu: function (e) {
            //close sub-menu
            document.querySelector(Selectors.navigationMenu).classList.remove("active");

            //display none sub-menu
            e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("d-block");
            e.target.parentElement.parentElement.parentElement.parentElement.classList.add("d-none");
        }

    }

})();

const HeaderControl = (function (UICtrl) {
    const UISelectors = UICtrl.getSelectors();

    const loadEventListener = function () {
        document.querySelector(UISelectors.openMenuBtn).addEventListener("click", menuControl);
    }

    const menuControl = function () {
        UICtrl.mobileMenuControl();
    }

    return {
        init: function () {
            loadEventListener();
        }
    }


})(UIControl)

const NavigationControl = (function (UICtrl) {
    const UISelectors = UICtrl.getSelectors();

    const loadEventListener = function () {
        const navLinks = document.querySelectorAll(UISelectors.navigationLink);

        navLinks.forEach(link => {
            link.addEventListener("click", subMenuControl)
        });

        const backButtons = document.querySelectorAll(UISelectors.backMenu);

        backButtons.forEach(backButton => {
            backButton.addEventListener("click", backToMenu);
        });

    }

    const subMenuControl = function (e) {
        UICtrl.mobileNavController(e);
    }

    const backToMenu = function (e) {
        UICtrl.backMenu(e);
    }

    return {
        init: function () {
            loadEventListener();
        }
    }


})(UIControl)

function headerFunc(params) {
    HeaderControl.init();
    NavigationControl.init();

}


export default headerFunc();