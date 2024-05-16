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
        const url = `http://localhost:3000/ranking?type=${type}&category=${category}&sort=${sort}`; // 更新此 URL 以匹配你的服务器端点
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
        const link = document.createElement('a');
        link.href = `html/vegetables.html?veg_ref=${item.ref}`;

        // 添加点击事件监听器
        link.addEventListener('click', (event) => {
            event.preventDefault(); // 阻止默认的跳转行为
            fetch(`http://localhost:3000/visit/${item.id}`) // 传递 `id` 记录访问量
                .then(response => response.text())
                .then(data => {
                    console.log(`Visit recorded for ${item.ref}. Server response: ${data}`);
                    window.location.href = link.href; // 在 `fetch` 完成后进行页面跳转
                })
                .catch(error => {
                    console.error('Error recording visit', error);
                });
        });

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        const description = document.createElement('p');
        description.textContent = item.name;

        link.appendChild(image);
        link.appendChild(description);
        container.appendChild(link);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    update_category(); // 初始加载
});
