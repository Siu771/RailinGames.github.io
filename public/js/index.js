async function SplashText() {
    const Splashes = await (await fetch("/json/splash.json")).json();
    document.getElementById("SplashText").innerHTML = Splashes[Math.floor(Math.random() * Splashes.length)];
}

document.addEventListener("DOMContentLoaded", SplashText);

document.querySelector(".accept").addEventListener("mousedown", async (event) => {
    event.preventDefault();
    const search = document.querySelector(".searchbar").value;

    if (search.startsWith("https://" || "http://"))  
        window.open(__uv$config.prefix + __uv$config.encodeUrl(search))
    else 
        window.open(__uv$config.prefix + __uv$config.encodeUrl("https://www.google.com/search?q=" + encodeURIComponent(search)))
})