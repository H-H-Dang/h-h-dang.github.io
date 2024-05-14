document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const veg_ref = params.get('veg_ref');

    fetch('../data_items/vegetables.json')
        .then(response => response.json())
        .then(data => {
            const vegetable = data.find(veg => veg.ref === veg_ref);
            if (vegetable) {
                document.getElementById('title').textContent = vegetable.name;
                document.getElementById('image').src = vegetable.image;
                document.getElementById('description').textContent = vegetable.description;
                
                const map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 10,
                    center: {lat: 51.5074, lng: -0.1278} // 初始化地图中心点为伦敦
                });

                const geocoder = new google.maps.Geocoder(); // 创建地理编码器实例
                const available_list = document.getElementById('available');
                vegetable.available.forEach(supermarket => {
                    const list_item = document.createElement('li');
                    list_item.textContent = supermarket;
                    list_item.onclick = function () {
                        // 使用地理编码器将超市名称转换为地点
                        geocoder.geocode({ 'address': supermarket }, function(results, status) {
                            if (status === 'OK') {
                                map.setCenter(results[0].geometry.location); // 将地图中心移动到搜索结果
                                new google.maps.Marker({ // 在地图上放置标记
                                    map: map,
                                    position: results[0].geometry.location
                                });
                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    };
                    available_list.appendChild(list_item);
                });
            } else {
                document.getElementById('title').textContent = '蔬菜未找到';
            }
        })
        .catch(error => console.error('Error loading the vegetable data:', error));
});
