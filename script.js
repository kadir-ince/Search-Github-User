const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser('dashersw');

async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    createUserCard(respData);
}

function createUserCard(user) {

    const cardHTML = `
    <div class='card'>
    ${(user.message !== "API rate limit exceeded for 95.70.132.74. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") ?
            `
        <div class='img-container'>
            <img class="avatar" src="${(user.message !== 'Not Found') ? user.avatar_url : 'https://pbs.twimg.com/profile_images/1157035760085684224/iuxTnT5g_400x400.jpg'}" alt="${user.name}">
        </div>
        <div class='user-info'>
        ${(user.message !== 'Not Found')?
        `
            <h2>${user.name}</h2>
            <p>${(user.bio !== null) ? user.bio : "❌ This Profile is Not Have Bio <br> - 0x778.me"}</p>
    
            <ul class='info'>
                 <a href="https://github.com/${user.login}?tab=followers" target="_blank"><li>${(user.type !== 'Organization') ? user.followers + '<strong> Followers </strong>' : "Organizition"}</li></a>
                 <a href="https://github.com/${user.login}?tab=following" target="_blank"><li>${(user.type !== 'Organization') ? user.followers + '<strong> Followers </strong>' : "Organizition"}</li></a>
                <a href="https://github.com/${user.login}?tab=repositories" target="_blank"><li>${user.public_repos} <strong>Repos</strong></li></a>
            </ul>` : `<div class="right-over"><p>User is Not Found </p></div>`
        }
        </div>
        
        `
            : `<div class="right-over"><p>Your Right To Search is Over </p></div>`}
        
    </div>    

    ${((user.type !== 'Organization' && user.message !== "API rate limit exceeded for 95.70.132.74. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") && user.message !== 'Not Found' ) ?
            ` <div class="stat">
        <img class"language_stat" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&hide_langs_below=1&hide_border=true&layout=compact&bg_color=315deg,4c11ac,4c2885&text_color=ffffff&title_color=28ffc1"/>  
        <img class"profile_stat" src="https://github-readme-stats.vercel.app/api/?username=${user.login}&show_icons=true&title_color=28ffc1&icon_color=ff4889&text_color=ffffff&bg_color=315deg,4c11ac,4c2885&hide_border=true"/>  
    </div>` : `<div></div>`
        }
        `
    main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;

    if (user) {
        getUser(user);
        search.value = ''
    }
})
