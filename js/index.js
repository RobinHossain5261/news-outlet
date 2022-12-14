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
    toggleSpinner(true);
    const catagoryList = document.getElementById("all-catagory");
    catagoryList.textContent = '';
    catagorys.forEach(catagory => {
        // console.log(catagory)
        const li = document.createElement("li");

        li.innerHTML = `<a onclick="loadCatagoryDetails('${catagory.category_id}')">${catagory.category_name}</a>`;
        catagoryList.appendChild(li);
    })
}
loadCatagory();

const loadCatagoryDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    displayCatagoryDetails(data.data)
    // console.log(data.data);
}
//sort part
const displayCatagoryDetails = allNews => {
    allNews.sort((a, b) => {
        return b.total_view - a.total_view
    });
    // ------length-------
    const categoryLength = document.getElementById('category-quantity');
    categoryLength.innerText = allNews.length === 0 ? "No result found" : allNews.length;


    // console.log(allNews)
    const catagoryDetails = document.getElementById("category-details");
    catagoryDetails.textContent = '';
    allNews.forEach(news => {
        // console.log(news)
        const newsDiv = document.createElement("div");
        newsDiv.innerHTML = `
        <div class="flex items-center border mt-5 rounded-lg">
                <!-- images -->
            <div class="flex-none w-96 ">
                <img src="${news.thumbnail_url}">
            </div>

                <!-- cetagory-details  -->
            <div class="grow ml-5">
                <h2 class="text-2xl font-semibold">${news.title}</h2>
                <p>${news.details.length > 500 ? news.details.slice(0, 500) + '...' : news.details}</p>
                <div class="flex flex-row  mt-16 justify-between items-center">
                    <div class="flex ">
                        <img class="h-12 w-12 rounded-full" src="${news.author.img}">
                        <div class="ml-5">
                            <p>${news.author.name ? news.author.name : "No Name"}</p>
                            <p>${news.author.published_date ? news.author.published_date : "No Date"}</p>
                        </div>
                    </div>
                    <div>
                    <p><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : "Data not available"}</P>
                    </div>
                    <div class="flex font-semibold">
                        <p>${news.rating.number}</p>
                        <p class="ml-5">${news.rating.badge}</p>
                    </div>
                    <div>
                    <label onclick="catagoryDetailsModal('${news._id}')" for="my-modal-3" class="btn modal-button bg-primary">Show Details</label>
                    </div>
                </div>
            </div>
            
        </div>
        
        `;
        catagoryDetails.appendChild(newsDiv);

    })
    toggleSpinner(false);
}

loadCatagoryDetails('01');


//modal part

const catagoryDetailsModal = async (code) => {
    try {
        const res = await fetch(` https://openapi.programming-hero.com/api/news/${code}`)
        const data = await res.json()
        displayDetaulsModal(data.data[0])
    }
    catch (e) {
        console.log(e);
    }
}

const displayDetaulsModal = details => {
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = ` 
    <img  src="${details.thumbnail_url}" class="w-full">
    <h2 class="text-2xl font-semibold">${details.title}</h2>
    <p class="font-semibold mb-2 mt-2">Name: ${details.author.name ? details.author.name : "No Name"}</p>
    <p class="font-semibold mb-2">Date: ${details.author.published_date ? details.author.published_date : "No Date"}</p>
    <p>${details.details}</p>
    `;
}
catagoryDetailsModal();

// spinner
const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loader');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}



