const newsFeedItem = ()=>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res=>res.json())
    .then(data=>allItmes(data.data.news_category))
}
const allItmes = datas =>{
    const items =document.getElementById('news-item')
    datas.forEach(data => {
        console.log(data)
        const div = document.createElement('div')
        div.classList.add('text-lg')
        div.classList.add('font-bold')
        div.classList.add('text-blue-700')
        div.classList.add('hover:text-blue-900')
        div.classList.add('lg:mt-0')
        div.classList.add('mt-3')
        div.classList.add('ml-6')
        div.classList.add('lg:ml-0')
        div.innerHTML=`
            <h2 onclick="newsFeed('${data.category_id}')">${data.category_name}</h2>
        `
        items.appendChild(div)
    });
    spiner(true)
}
const newsFeed =users=>{
    fetch(` https://openapi.programming-hero.com/api/news/category/${users}`)
    .then(res=>res.json())
    .then(data=>newsFeedShow(data.data))
}
const newsFeedShow = datas =>{
    const length = datas.length
    const lengthItem = document.getElementById('length-item')
    lengthItem.innerText = length
    const newsSection =document.getElementById('news')
    newsSection.textContent = ''
    datas.forEach(data=>{
        console.log(data)
        const div =document.createElement('div')
        div.innerHTML=`
        <div class="grid md:grid-cols-12 grid-cols-1 mb-6 border md:p-0 sm:p-10 h-full bg-slate-100">
            <div class="col-span-4 m-3">
                <img class="h-full" src="${data.image_url}" alt="">
            </div>   
            <div class="col-span-8 grid grid-rows-3 m-3">
                <div class="row-span-2">
                    <h3 class="text-2xl font-bold">${data.title}</h3>
                    <p class="mt-3">${data.details.slice(0,300)}...</p>
                </div>
                <div class="row-span-1  text-center flex justify-between items-center">
                    <div class="flex justify-between">
                        <img class="w-10 mr-4 rounded-full " src="${data.author.img}" alt="">
                        <div class="text-left">
                            <h5 class="font-semibold">${data.author.name? data.author.name:"no data pound"}</h5>
                            <p>${data.author?data.author.published_date:"no data pound"}</p>
                        </div>
                    </div>
                    <div class="col-span-3 "> <i class="fa-solid fa-eye"></i> ${data.total_view?data.total_view:'no data pound '}</div>
                    <div class="col-span-3"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                    <div class="col-span-3 mr-4">
                        <label onclick="modal('${data._id}')" for="my-modal" class=" btn modal-button">click</label>
                    </div>
                </div>
            </div>
        </div>
        `
        newsSection.appendChild(div)
    })
    spiner(false)
}
const modal = users=>{
    fetch(` https://openapi.programming-hero.com/api/news/${users}`)
    .then(res=>res.json())
    .then(data=>modalData(data.data[0]))
    .catch(error=>console.log(error))
}
const modalData=datas=>{
    const modalOpen =document.getElementById('modal-open')
    modalOpen.innerHTML=`
    <img class="h-60 w-full rounded-lg" src="${datas.author.img}" alt="">
    <h3 class="font-bold text-2xl mt-3">Name: ${datas.author.name?datas.author.name:'no data pound'}</h3>
    <p class="py-1 font-semibold"> published date: ${datas.author.published_date?datas.author.published_date:"no data pound"}</p>
    <p class="py-1 font-semibold"> published date: ${datas.rating.badge?datas.rating.badge:"no data pound"}</p>
    <p class="py-1 font-semibold"> published date: ${datas.rating.number?datas.rating.number:"no data pound"}</p>
    <div class="modal-action">
    <label for="my-modal" class="btn">close</label>
    </div>
    `
} 
const spiner =check=>{
    const spinerData =document.getElementById('spinerItem')
    if(check){
        spinerData.classList.remove('hidden')
    }
    else{
        spinerData.classList.add('hidden')
    }
}
newsFeedItem()