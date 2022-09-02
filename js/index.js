const loadCatagory = async () => {
    const res = await fetch(` https://openapi.programming-hero.com/api/news/categories`)
    const data = await res.json()
    return data;
}
const setCatagory = async () => {
    const data = await loadCatagory();
    const catagorysArray = data.data.news_category;

    const allCatagory = document.getElementById("all-catagory");
    for (const catagory of catagorysArray) {
        // console.log(catagory.category_name)
        const li = document.createElement("li");
        li.innerHTML = `<a>${catagory.category_name}</a></li>`;
        allCatagory.appendChild(li);
    }
}
setCatagory();


