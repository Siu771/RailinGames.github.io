async function RenderApps() {
    const list = await (await fetch(`/json/apps.json`)).json();

    if (list) list.forEach(e => {
        const App = document.createElement("a");
        App.href = `/load/${e.id}`;
        App.innerHTML = `
        <div class="box btn-1">
            <img src="/img/apps/${e.app.toLowerCase()}.png">
            <span>${e.app}</span>
        </div>`;

        document.querySelector(".holder").appendChild(App);
    });
}

RenderApps();
