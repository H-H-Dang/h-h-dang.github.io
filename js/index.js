function update_category() { // 处理用户选择变更后的更新 该函数触发于类别和排序方式选择器值变更时
    // 蔬菜类别和排序方式
    const category__vegetables = document.getElementById("category_vegetables").value;
    const sort_method_vegetables = document.getElementById("sort_vegetables").value;
    fetchAndUpdateContent("vegetables", category__vegetables, sort_method_vegetables, "images_vegetables");

    // 食谱类别和排序方式
    const category__recipes = document.getElementById("category__recipes").value;
    const sort_method_recipes = document.getElementById("sort_recipes").value;
    fetchAndUpdateContent("recipes", category__recipes, sort_method_recipes, "images_recipes");
}

async function fetchAndUpdateContent(type, category, sort, images) {
    try {
        const url = `/api/${type}?category=${category}&sort=${sort}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items = await response.json();
        displayItems(items, images);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayItems(items, images) {
    const container = document.querySelector(`.${images}`);
    container.innerHTML = ''; // 清空现有内容

    items.forEach(item => {
        const article = document.createElement('article');
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        article.appendChild(image);
        container.appendChild(article);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    update_category(); // 初始加载
});
