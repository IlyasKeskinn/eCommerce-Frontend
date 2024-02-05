function tabPane() {
    const navs = document.querySelectorAll(".nav-item");
    const tabs = document.querySelectorAll(".tab-pane");
    

   function tabPaneActive(e) {
        const triggerId = e.target.getAttribute("id");
    Array.from(navs).forEach((nav)=>{
     
        if (nav.children[0].getAttribute("id")==triggerId) {
            e.target.classList.add("active");
        Array.from(tabs).forEach(tab =>{
            if (tab.getAttribute("aria-labelledby") == triggerId) {

                    tab.classList.add("active");
                }else{
                    if(tab.classList.contains("active")){
                        tab.classList.remove("active");

                }
            }
        })
    }
    else{
        nav.children[0].classList.remove("active");

    }
    });
   }
   Array.from(navs).forEach(nav =>{
    nav.addEventListener("click", tabPaneActive);
   })

}

tabPane();
