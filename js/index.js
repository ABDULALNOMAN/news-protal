const newsFeedItem = ()=>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res=>res.json())
    .then(data=>allItmes(data.data.news_category))
}
const allItmes = datas =>{
    const items =document.getElementById('news-item')
    datas.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('text-lg')
        div.classList.add('font-bold')
        div.classList.add('text-blue-700')
        div.classList.add('hover:text-blue-900')
        div.innerHTML=`
            <h2 onclick="newsFeed(${data.category_id})">${data.category_name}</h2>
        `
        items.appendChild(div)
    });
}
const newsFeed =users=>{
    fetch(` https://openapi.programming-hero.com/api/news/category/0${users}`)
    .then(res=>res.json())
    .then(data=>newsFeedShow(data.data))
}
const newsFeedShow =datas=>{
    const newsSection =document.getElementById('news')
    newsSection.textContent = ''
    datas.forEach(data=>{
        console.log(data)
        const div =document.createElement('div')
        div.innerHTML=`
        <div class="grid grid-cols-12 grid-rows-1 h-72 mb-6 border">
            <div class="col-span-4 border m-3">
                <img class="h-full" src="${data.image_url}" alt="">
            </div>   
            <div class="col-span-8 grid grid-rows-3">
                <div class="border row-span-2">
                    <h3>${data.title}</h3>
                    <p></p>
                </div>
                <div class="border row-span-1  text-center flex justify-between items-center">
                    <div class="flex justify-between">
                        <img class="w-10 mr-4 rounded-full " src="${data.author.img}" alt="">
                        <div class="text-left">
                            <h5 class="font-semibold">${data.author.name? data.author.name:"not pound"}</h5>
                            <p>${data.author?data.author.published_date:"not pound"}</p>
                        </div>
                    </div>
                    <div class="col-span-3 ">${data.total_view?data.total_view:'not '}</div>
                    <div class="col-span-3">c</div>
                    <div class="col-span-3 mr-4">
                        <button class="btn btn-primary">click</button>
                    </div>
                </div>
            </div>
        </div>
        `
        newsSection.appendChild(div)
    })
}
// const modal = ()
newsFeedItem()