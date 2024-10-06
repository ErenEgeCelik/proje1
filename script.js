document.getElementById('start-btn').addEventListener('click', function() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('solar-system-canvas').style.display = 'block';
    document.getElementById('time-control').style.display = 'block';

   
    

    
    const canvas = document.getElementById('solar-system-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    // Yıldızlı arka plan küresi ekleyelim
    const starGeometry = new THREE.SphereGeometry(10000, 64, 64); // Küre çok büyük olmalı ki sahnenin tamamını sarsın
    const starMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('textures/stars.jpg'), // Yıldız dokusunu yükleyin
    side: THREE.BackSide // Dokuyu kürenin iç tarafına uygulamak için BackSide kullanıyoruz
});
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

    // Güneşi oluştur ve sahneye ekle
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load('./textures/sun.jpg') });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = {
        name: "Sun",
        radius: "696,340 km",
        mass: "1.989 × 10^30 kg",
        temperature: "5,500°C",
        description: "The Sun is the star at the center of the Solar System.",
        type: "Star"
    };
    scene.add(sun);

    // Güneş'ten yayılan ışık ekle (parlaklığı azaltıldı)
    const sunLight = new THREE.PointLight(0xffffff, 1, 300);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Gezegen bilgileri
const planets = [
    { 
        name: "Mercury", 
        radius: 0.5, 
        distance: 10, 
        texture: 'textures/mercury.jpg', 
        orbitSpeed: 0.02, 
        rotationSpeed: 0.01, 
        info: { 
            radius: "2,439.7 km", 
            mass: "3.30 × 10^23 kg", 
            period: "88 days", 
            moons: "0", 
            orbital_speed: "47.87 km/s", 
            type: "Terrestrial planet", 
            atmosphere: "Thin exosphere composed of oxygen, sodium, hydrogen, helium, and potassium", 
            surface_temperature: "-173 to 427°C",
            discovery_date: "Known since antiquity"
        } 
    },
    {
        name: "Venus", 
        radius: 0.9, 
        distance: 18.5, 
        texture: 'textures/venus.jpg', 
        orbitSpeed: 0.015, 
        rotationSpeed: 0.005, 
        info: { 
            radius: "6,051.8 km", 
            mass: "4.87 × 10^24 kg", 
            period: "225 days", 
            moons: "0", 
            orbital_speed: "35.02 km/s", 
            type: "Terrestrial planet", 
            atmosphere: "Carbon dioxide, nitrogen", 
            surface_temperature: "462°C", 
            discovery_date: "Known since antiquity"
        } 
    },
    {
        name: "Earth", 
        radius: 1, 
        distance: 25.6, 
        texture: 'textures/earth.jpg', 
        orbitSpeed: 0.01, 
        rotationSpeed: 0.02, 
        info: { 
            radius: "6,371 km", 
            mass: "5.97 × 10^24 kg", 
            period: "365.25 days", 
            moons: "1", 
            orbital_speed: "29.78 km/s", 
            type: "Terrestrial planet", 
            atmosphere: "Nitrogen, oxygen", 
            surface_temperature: "-88 to 58°C", 
            discovery_date: "Known since antiquity"
        } 
    },
    {
        name: "Mars", 
        radius: 0.8, 
        distance: 39, 
        texture: 'textures/mars.jpg', 
        orbitSpeed: 0.008, 
        rotationSpeed: 0.015, 
        info: { 
            radius: "3,389.5 km", 
            mass: "6.42 × 10^23 kg", 
            period: "687 days", 
            moons: "2", 
            orbital_speed: "24.07 km/s", 
            type: "Terrestrial planet", 
            atmosphere: "Carbon dioxide, argon, nitrogen", 
            surface_temperature: "-125 to 20°C", 
            discovery_date: "Known since antiquity"
        } 
    },
    {
        name: "Jupiter", 
        radius: 2.5, 
        distance: 133, 
        texture: 'textures/jupiter.jpg', 
        orbitSpeed: 0.005, 
        rotationSpeed: 0.03, 
        info: { 
            radius: "69,911 km", 
            mass: "1.90 × 10^27 kg", 
            period: "12 years", 
            moons: "79", 
            orbital_speed: "13.07 km/s", 
            type: "Gas giant", 
            atmosphere: "Hydrogen, helium", 
            surface_temperature: "-145°C", 
            discovery_date: "Known since antiquity"
        } 
    },
    {
        name: "Saturn", 
        radius: 2, 
        distance: 244.6, 
        texture: 'textures/saturn.jpg', 
        orbitSpeed: 0.004, 
        rotationSpeed: 0.025, 
        info: { 
            radius: "58,232 km", 
            mass: "5.68 × 10^26 kg", 
            period: "29 years", 
            moons: "83", 
            orbital_speed: "9.69 km/s", 
            type: "Gas giant", 
            atmosphere: "Hydrogen, helium", 
            surface_temperature: "-178°C", 
            discovery_date: "Known since antiquity"
        } 
    },
    {
        name: "Uranus", 
        radius: 1.7, 
        distance: 492.3, 
        texture: 'textures/uranus.jpg', 
        orbitSpeed: 0.0035, 
        rotationSpeed: 0.01, 
        info: { 
            radius: "25,362 km", 
            mass: "8.68 × 10^25 kg", 
            period: "84 years", 
            moons: "27", 
            orbital_speed: "6.81 km/s", 
            type: "Ice giant", 
            atmosphere: "Hydrogen, helium, methane", 
            surface_temperature: "-224°C", 
            discovery_date: "1781 by William Herschel"
        } 
    },
    {
        name: "Neptune", 
        radius: 1.65, 
        distance: 770.8, 
        texture: 'textures/neptune.jpg', 
        orbitSpeed: 0.003, 
        rotationSpeed: 0.01, 
        info: { 
            radius: "24,622 km", 
            mass: "1.02 × 10^26 kg", 
            period: "165 years", 
            moons: "14", 
            orbital_speed: "5.43 km/s", 
            type: "Ice giant", 
            atmosphere: "Hydrogen, helium, methane", 
            surface_temperature: "-214°C", 
            discovery_date: "1846 by Johann Galle"
        } 
    }
];


    const planetMeshes = [];

    // Gezegenleri oluştur ve sahneye ekle
    planets.forEach(planet => {
        const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(planet.texture) });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {
            name: planet.name,
            radius: planet.info.radius,
            mass: planet.info.mass,
            period: planet.info.period,
            moons: planet.info.moons,
            orbital_speed: planet.info.orbital_speed,
            type: planet.info.type,
            description: `The planet ${planet.name} has a radius of ${planet.info.radius}, an orbital period of ${planet.info.period}, and ${planet.info.moons} moon(s).`
        };
        scene.add(mesh);
        planetMeshes.push({ mesh: mesh, distance: planet.distance, orbitSpeed: planet.orbitSpeed, rotationSpeed: planet.rotationSpeed, angle: 0, name: planet.name });

        // Gezegenin yörüngesini oluştur ve sahneye ekle
        const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.5, planet.distance + 0.5, 4096);
        const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2; // Yörüngeyi düz hale getirmek için döndürme
        scene.add(orbit);
    });

    // Uydu bilgileri
const satellites = [
    {
        name: "Io",
        parent: "Jupiter",
        radius: 0.3,
        distance: 3,
        orbitSpeed: 0.04,
        color: 0xffa500
    },
    {
        name: "Europa",
        parent: "Jupiter",
        radius: 0.25,
        distance: 4,
        orbitSpeed: 0.035,
        color: 0x87ceeb
    },
    {
        name: "Titan",
        parent: "Saturn",
        radius: 0.4,
        distance: 4.5,
        orbitSpeed: 0.03,
        color: 0xd2b48c
    },
    {
        name: "Rhea",
        parent: "Saturn",
        radius: 0.2,
        distance: 6,
        orbitSpeed: 0.025,
        color: 0xf0e68c
    }
];

const satelliteMeshes = [];

// Uyduları oluştur ve sahneye ekle
satellites.forEach(satellite => {
    const parentPlanet = planetMeshes.find(planet => planet.name === satellite.parent);
    if (parentPlanet) {
        const geometry = new THREE.SphereGeometry(satellite.radius, 16, 16);
        const material = new THREE.MeshStandardMaterial({ color: satellite.color });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.userData = {
            name: satellite.name,
            parent: satellite.parent
        };

        scene.add(mesh);
        satelliteMeshes.push({
            mesh: mesh,
            parent: parentPlanet.mesh,
            distance: satellite.distance,
            orbitSpeed: satellite.orbitSpeed,
            angle: Math.random() * Math.PI * 2 // Rastgele bir başlangıç açısı verelim
        });
    }
});

// Asteroit kuşağı oluşturma
const asteroidBelt = [];

for (let i = 0; i < 500; i++) {
    const radius = Math.random() * 0.1 + 0.05; // Farklı boyutlarda asteroitler (0.05 - 0.15 birim)
    const distance = Math.random() * 40 + 53.8; // Mars ve Jüpiter arasına (yaklaşık 25 - 30 birim arası)
    const angle = Math.random() * Math.PI * 2; // Rastgele bir açı
    const orbitSpeed = 0.005 + Math.random() * 0.002; // Hafif farklı hızlar

    const geometry = new THREE.SphereGeometry(radius, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const asteroid = new THREE.Mesh(geometry, material);

    // Başlangıç pozisyonu
    asteroid.position.x = Math.cos(angle) * distance;
    asteroid.position.z = Math.sin(angle) * distance;

    scene.add(asteroid);
    asteroidBelt.push({ mesh: asteroid, distance, angle, orbitSpeed });
}

    // Yeni uyduların bilgileri
const additionalSatellites = [
    { name: "Moon", parent: "Earth", radius: 0.27, distance: 2, orbitSpeed: 0.03, color: 0xaaaaaa },
    { name: "Phobos", parent: "Mars", radius: 0.1, distance: 1.8, orbitSpeed: 0.05, color: 0x8b0000 },
    { name: "Deimos", parent: "Mars", radius: 0.08, distance: 2.5, orbitSpeed: 0.04, color: 0x5f9ea0 },
    { name: "Ganymede", parent: "Jupiter", radius: 0.5, distance: 6, orbitSpeed: 0.025, color: 0xb8860b },
    { name: "Callisto", parent: "Jupiter", radius: 0.48, distance: 7.5, orbitSpeed: 0.02, color: 0x8b4513 },
    { name: "Enceladus", parent: "Saturn", radius: 0.2, distance: 5, orbitSpeed: 0.03, color: 0xffffff },
    { name: "Miranda", parent: "Uranus", radius: 0.18, distance: 3, orbitSpeed: 0.035, color: 0x708090 },
    { name: "Ariel", parent: "Uranus", radius: 0.22, distance: 4.2, orbitSpeed: 0.03, color: 0x778899 },
    { name: "Triton", parent: "Neptune", radius: 0.4, distance: 5.5, orbitSpeed: 0.02, color: 0x4682b4 }
];

// Mevcut satelliteMeshes'e ekleyelim
additionalSatellites.forEach(satellite => {
    const parentPlanet = planetMeshes.find(planet => planet.name === satellite.parent);
    if (parentPlanet) {
        const geometry = new THREE.SphereGeometry(satellite.radius, 16, 16);
        const material = new THREE.MeshStandardMaterial({ color: satellite.color });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.userData = {
            name: satellite.name,
            parent: satellite.parent
        };

        scene.add(mesh);
        satelliteMeshes.push({
            mesh: mesh,
            parent: parentPlanet.mesh,
            distance: satellite.distance,
            orbitSpeed: satellite.orbitSpeed,
            angle: Math.random() * Math.PI * 2 // Rastgele bir başlangıç açısı verelim
        });
    }
});


    // Kamera pozisyonu ayarla
    camera.position.set(0, 50, 80);
    camera.lookAt(sun.position);

    // Işık ekle
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5); // Gezegenlerin üzerindeki parlaklığı azaltmak için ışık yoğunluğu düşürüldü
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // OrbitControls ekle
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Pencere yeniden boyutlandırıldığında kamera ve renderer'ı güncelle
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Gezegen ve küçük cisim bilgisi gösterme
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let focusedPlanet = null;

    window.addEventListener('click', function(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planetMeshes.map(p => p.mesh).concat(sun));

        if (intersects.length > 0) {
            const objectData = intersects[0].object.userData;
            document.getElementById('planet-details').innerHTML = `
                <li><strong>Name:</strong> ${objectData.name}</li>
            <li><strong>Type:</strong> ${objectData.type}</li>
            <li><strong>Radius:</strong> ${objectData.radius}</li>
            <li><strong>Mass:</strong> ${objectData.mass}</li>
            <li><strong>Orbital Period:</strong> ${objectData.period}</li>
            <li><strong>Moons:</strong> ${objectData.moons}</li>
            <li><strong>Orbital Speed:</strong> ${objectData.orbital_speed}</li>
            <li><strong>Atmosphere:</strong> ${objectData.atmosphere || 'N/A'}</li>
            <li><strong>Surface Temperature:</strong> ${objectData.surface_temperature || 'N/A'}</li>
            <li><strong>Discovery Date:</strong> ${objectData.discovery_date || 'N/A'}</li>
            `;
            document.getElementById('planet-info').style.display = 'block';
            document.getElementById('release-focus-btn').style.display = 'block';

            // Kamera seçilen gezegene odaklanacak ve gezegenin hareketini takip edecek
            focusedPlanet = intersects[0].object;
        }
    });
    // Uydu bilgisi gösterme
    window.addEventListener('click', function(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersectsSatellites = raycaster.intersectObjects(satelliteMeshes.map(s => s.mesh));

        if (intersectsSatellites.length > 0) {
            const satelliteData = intersectsSatellites[0].object.userData;
            document.getElementById('planet-details').innerHTML = `
                <li><strong>Name:</strong> ${satelliteData.name}</li>
                <li><strong>Parent Planet:</strong> ${satelliteData.parent}</li>
        `;
        document.getElementById('planet-info').style.display = 'block';
        document.getElementById('release-focus-btn').style.display = 'block';

        // Kamera seçilen uyduya odaklanacak ve uydunun hareketini takip edecek
        focusedPlanet = intersectsSatellites[0].object;
        }
    });





    // Bilgi panelini kapatma
    document.getElementById('close-info-btn').addEventListener('click', function() {
        document.getElementById('planet-info').style.display = 'none';
    });

    // Odak bırakma butonu işlevi
    document.getElementById('release-focus-btn').addEventListener('click', function() {
        focusedPlanet = null;
        controls.target.set(0, 0, 0); // Kameranın odağını sıfıra ayarla
        controls.update();
        document.getElementById('release-focus-btn').style.display = 'none';
    });

    // Animasyon döngüsü
    function animate() {
        requestAnimationFrame(animate);

        // Zaman hızını kontrol et
        const timeSpeed = parseFloat(document.getElementById('time-input').value) || 1;

        // Güneşin kendi ekseninde dönmesi
        sun.rotation.y += 0.005 * timeSpeed;

        // Gezegenlerin Güneş etrafında ve kendi eksenlerinde dönmesi
        planetMeshes.forEach(planet => {
            planet.angle += planet.orbitSpeed * timeSpeed;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
            planet.mesh.rotation.y += planet.rotationSpeed * timeSpeed; // Kendi ekseni etrafında dönme
        });

        satelliteMeshes.forEach(satellite => {
            satellite.angle += satellite.orbitSpeed * timeSpeed;
            satellite.mesh.position.x = satellite.parent.position.x + Math.cos(satellite.angle) * satellite.distance;
            satellite.mesh.position.z = satellite.parent.position.z + Math.sin(satellite.angle) * satellite.distance;
        });

        // Asteroitlerin yörüngedeki hareketleri
        asteroidBelt.forEach(asteroid => {
        asteroid.angle += asteroid.orbitSpeed * timeSpeed;
        asteroid.mesh.position.x = Math.cos(asteroid.angle) * asteroid.distance;
        asteroid.mesh.position.z = Math.sin(asteroid.angle) * asteroid.distance;
        });
    

        // Kameranın odak noktasını gezegenin yeni konumuna güncelle
        if (focusedPlanet) {
            controls.target.copy(focusedPlanet.position);
            controls.update();
        }

        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});