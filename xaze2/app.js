 // HEADER SEARCH TOGGLE LOGIC
        function toggleMainSearch(show) {
            const navContent = document.getElementById('navContent');
            const searchOverlay = document.getElementById('searchOverlay');
            const searchInput = document.getElementById('mainSearchInput');

            if (show) {
                navContent.style.display = 'none';
                searchOverlay.style.display = 'flex';
                searchInput.focus();
            } else {
                navContent.style.display = 'flex';
                searchOverlay.style.display = 'none';
                searchInput.value = '';
            }
        }

        // WHEEL LOGIC
        const sectors = [
            {n: "DEVOPS", c: "#ff9100"}, {n: "BULUD", c: "#eaff00"}, {n: "VEB", c: "#ff0000"},
            {n: "SERVER", c: "#00ff8c"}, {n: "KİBER", c: "#ffbb00"}, {n: "MOBİL", c: "#00ff1a"},
            {n: "DƏSTƏK", c: "#d000ff"}, {n: "ANALİTİKA", c: "#00ccff"}
        ];
        const svg = document.getElementById('wheelSvg');
        sectors.forEach((s, i) => {
            const angle = 360 / sectors.length;
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            const x1 = 300 + 280 * Math.cos(Math.PI * startAngle / 180);
            const y1 = 300 + 280 * Math.sin(Math.PI * startAngle / 180);
            const x2 = 300 + 280 * Math.cos(Math.PI * endAngle / 180);
            const y2 = 300 + 280 * Math.sin(Math.PI * endAngle / 180);
            const pathData = `M 300 300 L ${x1} ${y1} A 280 280 0 0 1 ${x2} ${y2} Z`;
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathData);
            path.setAttribute("fill", s.c);
            path.onclick = () => {
                svg.classList.remove('spinning');
                document.getElementById('center-text').innerText = s.n;
                document.getElementById('center-text').style.color = s.c;
            };
            svg.appendChild(path);
        });

        function startSpinning() { 
            svg.classList.add('spinning'); 
            document.getElementById('center-text').innerText = "TECH HUB";
            document.getElementById('center-text').style.color = "#7000ff";
        }

        // CAROUSEL INFINITE SCROLL JS
        function setupCarousel() {
            const track = document.getElementById('partnersTrack');
            const items = track.innerHTML;
            track.innerHTML += items; 
        }

        // FINANCE
        const currencyData = [
            {code: "USD", val: "1.7000", flag: "🇺🇸"}, {code: "EUR", val: "1.8425", flag: "🇪🇺"},
            {code: "TRY", val: "0.0512", flag: "🇹🇷"}, {code: "RUB", val: "0.0185", flag: "🇷🇺"},
            {code: "GBP", val: "2.1480", flag: "🇬🇧"}, {code: "GEL", val: "0.6350", flag: "🇬🇪"},
            {code: "CNY", val: "0.2340", flag: "🇨🇳"}, {code: "CHF", val: "1.9110", flag: "🇨🇭"}
        ];

        function initFinance() {
            const container = document.getElementById('currencyContainer');
            container.innerHTML = '';
            currencyData.forEach(c => {
                container.innerHTML += `<div class="currency-item"><span>${c.flag}</span><br><b>${c.code}</b><br>${c.val}</div>`;
            });
            updateCrypto();
        }

        async function updateCrypto() {
            const coin = document.getElementById('cryptoInput').value.toLowerCase() || 'bitcoin';
            document.getElementById('cryptoNameDisplay').innerText = coin;
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
                const data = await res.json();
                if (data[coin]) {
                    const priceUSD = data[coin].usd;
                    document.getElementById('cryptoPrice').innerText = "$" + priceUSD.toLocaleString();
                    document.getElementById('cryptoInAZN').innerText = "≈ " + (priceUSD * 1.70).toLocaleString() + " AZN";
                }
            } catch (e) { }
        }

        async function getWeather() {
            const city = document.getElementById('cityInput').value || 'Baku';
            try {
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`);
                const geoData = await geoRes.json();
                if (!geoData.results) return;
                const { latitude, longitude, name } = geoData.results[0];
                const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,pressure_msl&timezone=auto`);
                const w = await wRes.json();
                document.getElementById('cityName').innerText = name;
                document.getElementById('mainTemp').innerText = `${Math.round(w.current.temperature_2m)}°C`;
                document.getElementById('humidity').innerText = `${w.current.relative_humidity_2m}%`;
                document.getElementById('windSpeed').innerText = `${w.current.wind_speed_10m} km/s`;
                document.getElementById('pressure').innerText = `${Math.round(w.current.pressure_msl)} hPa`;
                document.getElementById('weatherDesc').innerText = "Məlumat yeniləndi";
            } catch (e) { }
        }

        window.onload = () => { 
            initFinance(); 
            getWeather(); 
            setupCarousel(); 
        };

        // Chatbot pəncərəsini aç/bağla
function toggleChat() {
    const chatWin = document.getElementById('aiChatWrapper');
    if (chatWin.style.display === 'flex') {
        chatWin.style.display = 'none';
    } else {
        chatWin.style.display = 'flex';
        // Giriş sahəsinə avtomatik fokuslan
        setTimeout(() => document.getElementById('chatInput').focus(), 100);
    }
}

function handleSendMessage() {
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chatMessages');
    const text = input.value.trim();

    if (text === "") return;

    // 1. İstifadəçi mesajını çatda göstər
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user';
    userDiv.innerText = text;
    container.appendChild(userDiv);

    // 2. EmailJS parametrləri (Şablona uyğun)
    const templateParams = {
        title: "Xazerbaijan AI Chat", 
        name: "Veb Sayt Müştərisi", 
        email: "elnur.code@gmail.com",
        message: text 
    };

    // 3. Email göndərmə (Sənin ID-lərinlə)
    emailjs.send('service_xsdm8dr', 'template_xid8mt9', templateParams)
        .then(function(response) {
           console.log('Uğurla göndərildi!', response.status);
        }, function(error) {
           console.error('Xəta:', error);
        });

    // 4. Prosesi tamamla
    input.value = "";
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'msg ai';
        aiDiv.innerText = "Mesajınız birbaşa Xazerbaijan`a göndərildi. Tezliklə cavab veriləcək.";
        container.appendChild(aiDiv);
        container.scrollTop = container.scrollHeight;
    }, 1000);
}

const contactForm = document.getElementById('mainContactForm');
const status = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Səhifənin yenilənməsini dayandır
        
        const btn = document.getElementById('formSubmitBtn');
        const data = new FormData(e.target);
        
        btn.innerText = "Göndərilir...";
        btn.disabled = true;

        // Formspree-yə datanı göndəririk
        fetch(e.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("Təşəkkür edirik! Mesajınız Formspree vasitəsilə Elnur bəyə çatdırıldı.");
                contactForm.reset(); // Formu təmizlə
            } else {
                alert("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.");
            }
        }).catch(error => {
            alert("Serverlə əlaqə kəsildi.");
        }).finally(() => {
            btn.innerText = "Müraciəti Göndər";
            btn.disabled = false;
        });
    });
}

document.getElementById('orderForm')?.addEventListener('submit', function(e) {
    const btn = document.getElementById('orderBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Göndərilir...';
    btn.style.opacity = '0.7';
    
    // Formspree-yə datanı göndərmək üçün ana səhifədəki fetch məntiqi ilə eynidir
});