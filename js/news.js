const catagoryId = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/01`)
        const data = await res.json()
        return data;
    }
    catch (error) {
        console.log(error);
    }
}
const setCatagoryId = async () => {
    const data = await catagoryId();
    const allNews = data.data;
    // console.log(data.data);
    const newsFeed = document.getElementById("news-feed");
    for (const news of allNews) {
        console.log(news)
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex ">
                <!-- images -->
            <div class="flex-none w-96 mb-5">
                <img src="${news.image_url}">
            </div>
                <!-- news-feed  -->
            <div class="grow ml-5">
                <h2 class="text-2xl font-semibold">${news.title}</h2>
                <p>${news.details}</p>
            </div>
        </div>
        `;
        newsFeed.appendChild(div);
    }

}
setCatagoryId();