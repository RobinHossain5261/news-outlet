const loadCatagory = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
        const data = await res.json()
        displayAllCatagory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const displayAllCatagory = catagorys => {

    const catagoryList = document.getElementById("all-catagory");
    catagorys.forEach(catagory => {
        console.log(catagory)
        const li = document.createElement("li");
        li.innerHTML = `<a>${catagory.category_name}</a>`;
        catagoryList.appendChild(li);
    })
}
loadCatagory();

const loadCatagoryDetails = async () => {

}

