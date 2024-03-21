const API_KEY = "HiouFGKnRTZOgm1zeQ98yaPQ7f02Fcy4QAaNUH05vd6AgVnGQQokN95T";
const perPage = 15;
let currentPage = 1;
const wrapper = document.querySelector(".images");
const search = document.getElementById("search");
let searchQuery = null;
const lightbox = document.querySelector(".light-box");
const downloadBtn = document.getElementById("download-btn");

const shareThis = async (imgurl) => {
    try {
        await navigator.share({ title: "Example Page", url: imgurl});
    } catch {
        console.error("Share failed:", err.message);
    }
};

// Function to download image
const downloadImage = (imgurl) => {
    fetch(imgurl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!!"));
}

// Function to generate HTML code for images
const generate_html = (images) => {
    wrapper.innerHTML += images.map(img =>
        `<li onclick="showLightBox('${img.src.large2x}', '${img.photographer}')" class="card">
            <img src="${img.src.large2x}" alt="">
        </li>`
    ).join("");
}

// Function to fetch images from API
const get_image = (URL) => {
    fetch(URL, {
        headers: {
            Authorization: API_KEY
        }
    }).then(res => res.json()).then(data => {
        generate_html(data.photos);
    })
}

// Function to search images
const searchimage = () => {
    if (search.value === "") return searchQuery = null;
    currentPage = 1;
    searchQuery = search.value;
    wrapper.innerHTML = "";
    let apiurl = `https://api.pexels.com/v1/search?query=${searchQuery}&page=${currentPage}&per_page=${perPage}`;
    get_image(apiurl);
}

// Function to load more images
const loadmore = () => {
    currentPage++;
    let apiurl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiurl = searchQuery ? `https://api.pexels.com/v1/search?query=${searchQuery}&page=${currentPage}&per_page=${perPage}` : apiurl;
    get_image(apiurl);
}

// Function to show download/light box
const showLightBox = (img, photographer) => {
    downloadBtn.setAttribute("data-img", img);
    copyBtn.setAttribute("data-img", img);
    shareBtn.setAttribute("data-img", img);
    lightbox.style.display = "flex";
    lightbox.classList.remove("hide");
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = photographer;
}

// Function to hide download/light box
const hideLightBox = () => {
    lightbox.classList.remove("show");
    lightbox.classList.add("hide");
    setTimeout(p => {
        lightbox.style.display = "none";
    }, 300);
    document.body.style.overflow = "auto";
}

get_image(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

downloadBtn.addEventListener("click", (e) => downloadImage(e.target.dataset.img));
shareBtn.addEventListener("click", (e) => shareThis(e.target.dataset.img));
copyBtn.addEventListener("click", (e) => {
    navigator.clipboard.writeText(e.target.dataset.img);
    alert("Link copied to clipboard");
});
search.addEventListener("keydown", (evt) => {
    if (evt.key === 'Enter') {
        searchimage();
    }
});