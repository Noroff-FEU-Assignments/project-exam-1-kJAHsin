// make logo into link to home page
export function logoLink() {
    const logoLink = document.querySelector(".logo");
    
    logoLink.addEventListener("click", () => {
        window.location = "./index.html"
    })
}