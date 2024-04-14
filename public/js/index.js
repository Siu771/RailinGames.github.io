let settings = JSON.parse(localStorage.getItem("railin-settings"));
const searchbar = document.querySelector(".search");
if (settings["Theme"] == "The Hub") document.querySelector(".HubThing").style.display = "inline"; // yes i added a hub thing.

function search() {
    let url = searchbar.value;
    if (url.startsWith("https://" || "http://")) window.open(__uv$config.prefix + __uv$config.encodeUrl(url))
    else if (settings) switch (settings["Engine"]) {
        case "Google":
            window.open(__uv$config.prefix + __uv$config.encodeUrl("https://www.google.com/search?q=" + encodeURIComponent(url)));
            break;
        case "DuckDuckGo":
            window.open(__uv$config.prefix + __uv$config.encodeUrl("https://duckduckgo.com/?q=" + encodeURIComponent(url)));
            break;
        case "Bing":
            window.open(__uv$config.prefix + __uv$config.encodeUrl("https://www.bing.com/search?q=" + encodeURIComponent(url)));
    }
    else console.error("Uh oh I dont know what happened.");
}

document.querySelector(".accept").addEventListener("click", search)

searchbar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") { search() }
})

(async function() {
    const Splashes = await (await fetch("/json/splash.json")).json();
    document.getElementById("SplashText").innerHTML = Splashes[Math.floor(Math.random() * Splashes.length)];
}())
