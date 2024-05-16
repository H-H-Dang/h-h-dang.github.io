function update_category() { // 处理用户选择变更后的更新 该函数触发于类别和排序方式选择器值变更时
    const category = document.getElementById("category").value; // 从类别选择器获取当前选中的类别
    const sort_method = document.getElementById("sort").value; // 从排序方式选择器获取当前选中的排序方式
    load_category(category, sort_method); // 根据当前的类别和排序方式加载并显示数据
}

/**
    @param {string} category - 数据类别，如蔬菜、水果或肉禽
    @param {string} sort_method - 排序方式，拼音或英文
*/
function load_category(category, sort_method) { // 根据给定的类别和排序方式加载数据
    fetch("../../assets/items/" + category + ".json") // 发起请求获取相应类别的JSON数据
        .then(response => response.json()) // 解析JSON格式的响应
        .then(data => {
            sort_data(data, sort_method); // 对数据进行排序
            display_item(data); // 在页面上显示排序后的数据
        })
        .catch(error => {
            console.error("Error fetching " + category + ":", error); // 输出错误到控制台
            document.querySelector(".images").innerHTML = "<p>加载数据时出错，请稍后再试。</p>"; // 显示错误信息
        });
}

/**
    @param {Array} data - 需要排序的数据数组
    @param {string} sort_method - 排序方式，拼音或英文
 */
function sort_data(data, sort_method) { // 根据指定的排序方式对数据进行排序
    if (sort_method === "pinyin") {
        // 如果排序方式为拼音，则按中文名称拼音顺序排序
        data.sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN", { sensitivity: "accent" }));
    } else {
        // 如果排序方式为英文，则按英文引用（ref）顺序排序
        data.sort((a, b) => a.ref.localeCompare(b.ref, "en"));
    }
}

/**
    @param {Array} data - 排序后的数据数组
 */
function display_item(data) { // 将排序后的数据显示到页面上
    const imagesContainer = document.querySelector(".images"); // 获取用于显示图片的容器
    imagesContainer.innerHTML = ""; // 清空现有的图片内容

    // 遍历数据数组，为每个元素创建相应的HTML结构并添加到页面
    data.forEach(item => {
        const link = document.createElement("a"); // 创建链接元素
        link.href = `../public/html/vegetables.html?veg_ref=${item.ref}`; // 设置链接的目标地址
        const img = document.createElement("img"); // 创建图片元素
        img.src = item.image; // 设置图片的来源地址
        img.alt = item.name; // 设置图片的替代文本
        const description = document.createElement("p"); // 创建段落元素
        description.textContent = item.name; // 设置段落文本为项目名称

        // 将图片和描述添加到链接中，然后将链接添加到图片容器中
        link.appendChild(img);
        link.appendChild(description);
        imagesContainer.appendChild(link);
    });
}

load_category("vegetables", "pinyin"); // 页面加载完成后，默认加载蔬菜类别的数据，并按拼音排序
