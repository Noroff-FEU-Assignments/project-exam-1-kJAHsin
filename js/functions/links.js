// make logo into link to home page
function logoLink() {
    const logoLink = document.querySelector(".logo");
    
    logoLink.addEventListener("click", () => {
        window.location = "./index.html"
    })
}

logoLink();