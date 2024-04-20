document.addEventListener("DOMContentLoaded", async function() {
    const searchbar = document.querySelector(".search");

    // Theme Settings
    let Settings = JSON.parse(localStorage.getItem("railin-settings"));
    if (Settings["Theme"] && Settings["Theme"] == "The Hub") document.querySelector(".HubThing").style.display = "inline";

    // Search Bar
    function search() {
        let url = searchbar.value;
        if (url.startsWith("https://") || url.startsWith("http://")) window.location.replace(__uv$config.prefix + __uv$config.encodeUrl(url));

        // Switch Statement was longer 🤭
        if (Settings && Settings["Engine"]) {
            if (Settings["Engine"] == "DuckDuckGo")  window.location.replace(__uv$config.prefix + __uv$config.encodeUrl("https://duckduckgo.com/?q=" + encodeURIComponent(url)));
            else if (Settings["Engine"] == "Bing") window.location.replace(__uv$config.prefix + __uv$config.encodeUrl("https://www.bing.com/search?q=" + encodeURIComponent(url)));
            else window.location.replace(__uv$config.prefix + __uv$config.encodeUrl("https://www.google.com/search?q=" + encodeURIComponent(url)));
        } else window.location.replace(__uv$config.prefix + __uv$config.encodeUrl("https://www.google.com/search?q=" + encodeURIComponent(url)));
    }

    document.querySelector(".accept").addEventListener("click", search) // Register URL on button press
    searchbar.addEventListener("keypress", (e) => { if (e.key === "Enter") { search() } }) // Register URL on enter

    // Splash Text
    const Splash = document.getElementById("SplashText");
    async function roll() { 
        const Splashes = await (await fetch("/json/splash.json")).json();
        Splash.innerHTML = Splashes[Math.floor(Math.random() * Splashes.length)]; 
    }
    Splash.addEventListener("click", roll)
})