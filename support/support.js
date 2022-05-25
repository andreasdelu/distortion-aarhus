const instaBtn = document.getElementById('instagram');
const tiktokBtn = document.getElementById('tiktok');
const youtubeBtn = document.getElementById('youtube');

const instagramSection = document.getElementById('instagram-section');
const tiktokSection = document.getElementById('tiktok-section');
const youtubeSection = document.getElementById('youtube-section');

const buttons = document.querySelectorAll('button');

instagramSection.insertAdjacentHTML

buttons.forEach(btn => {
    if (btn.id !== "kalender") {
        btn.addEventListener("click", () => {
            buttons.forEach(button => {
                if(button.id == "kalender") return;
                button.classList.remove("selected")
                const id = `${button.id}-section`;
                document.getElementById(id).style.display = "none"
            })
            btn.classList.add("selected")
            document.getElementById(btn.id + '-section').style.display = "flex"
        })
    }
    else{
        btn.addEventListener("click", () => {
            location = "kalender";
        })
    }
})

addEventListener("scroll", (e) => {
    if (scrollY >= 50) {
        document.getElementById("download").style.display = "none"
        document.querySelector("header").style.height = "110px";
    }
    else if (scrollY == 0){
        document.getElementById("download").style.display = "block"
        document.querySelector("header").style.height = "170px";
    }
})

async function fetchEvents() {
    const res = await fetch("kalender/events.json");
    const data = await res.json()
    return data;
}

fetchEvents().then(data => populatePosts(data))

function populatePosts(posts) {
    posts.forEach(post => {
        if(post.platform.toLowerCase().includes("youtube")){
            createVideo(youtubeSection, post)
        }
        if(post.platform.toLowerCase().includes("instagram")){
            if (post.type.toLowerCase() == "billede") {
                createImg(instagramSection, post)
            }
            else if(post.type.toLowerCase() == "video") {
                createVideo(instagramSection, post)
            }
            else{
                throw new Error(post.type + " is not an allowed type")
            }
        }
        if(post.platform.toLowerCase().includes("tiktok")){
            createVideo(tiktokSection, post)
        }
    })
}

function createImg(section, post) {
    post.content.forEach(url => {
        const img = document.createElement("img");
        img.classList.add("content");
        img.src = "images/" + url;

        const p = document.createElement("p");
        p.innerHTML = "<b>Dato:</b> " + post.date + "<br> <a href='kalender'><i>Se kalender for mere info</i></a>";
        section.appendChild(p)
        section.appendChild(img);
        
    })
}

function createVideo(section, post) {
    post.content.forEach(url => {
        const video = document.createElement("video");
        video.controls = "controls";
        video.classList.add("content");
        const source = document.createElement("source");
        source.src = "videos/" + url;
        source.type = "video/mp4";
        video.appendChild(source)
        const p = document.createElement("p");
        p.classList.add("desc")
        p.innerHTML = "<b>Dato:</b> " + post.date + "<br> <a href='kalender'><i>Se kalender for mere info</i></a>";
        section.appendChild(p)
        section.appendChild(video);
    })
}