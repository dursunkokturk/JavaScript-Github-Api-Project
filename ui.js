// Arayüz İşlemleri Yapılacak

class UI
{
    constructor()
    {
        // 'div' Elementlerini ve 'ul' Elementini Seçmemiz Gerekiyor

        // id'si Profile Olan div Elementini Seçiyoruz
        this.ProfileDiv = document.getElementById("profile");

        // Arayüzde 'En Son Repolar' Yazılı Olan 'ul' Elementini Seçiyoruz
        this.RepoDiv = document.getElementById("repos");

        // Arayüzdeki Son Aramalar Yazılı Olan 'ul' Elementini Seçiyoruz
        this.LastUsers = document.getElementById("last-users");

        // Veri Girişi Yapılan TextBox 'ı Seçiyoruz
        this.InputField = document.getElementById("githubname");

        // Bilgilerin Girildiği Formu Seçiyoruz
        this.CardBody = document.querySelector(".card-body");
    }

    // Her Arama İşleminden Sonra TextBox Kutusunu Temizliyoruz
    ClearInput()
    {
        this.InputField.value = "";
    }

    // User Değişkeni Üzerinden Gelen 
    // Kullanıcı Bilgilerini Ekrana Yazdırıyoruz
    ShowUserInfo(User)
    {
        this.ProfileDiv.innerHTML = 
        `<div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-4">
            <a href="${User.html_url}" target = "_blank">
             <img class="img-fluid mb-2" src="${User.avatar_url}"> </a>
             <hr>
             <div id="fullName"><strong>${User.name}</strong></div>
             <hr>
             <div id="bio">${User.bio}</div>
            </div>
          <div class="col-md-8">
                <button class="btn btn-secondary">
                      Takipçi  <span class="badge badge-light">${User.followers}</span>
                </button>
                <button class="btn btn-info">
                     Takip Edilen  <span class="badge badge-light">${User.following}</span>
                  </button>
                <button class="btn btn-danger">
                    Repolar  <span class="badge badge-light">${User.public_repos}</span>
                </button>
                <hr>
                <li class="list-group">
                    <li class="list-group-item borderzero">
                        <img src="images/company.png" width="30px"> <span id="company">${User.company}</span>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/location.png" width="30px"> <span id = "location">${User.location}</a>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/mail.png" width="30px"> <span id="mail">${User.mail}</span>
                        
                    </li>
                    
                </div>
                   
                
          </div>
    </div>`
    }
    // Arayüzde Formun Altına 
    // Hata Mesajlarını Yazdırmak İstiyoruz
    ShowError(message)
    {
        // Yazılacak Hata Mesajı İçin div Elementi Oluşturuyoruz
        const Div = document.createElement("div");

        // Hata Mesajı İçin Oluşturulan Elementin 'ClassName' Özelliği İle 
        // Kullanılacak Mesajın Tipi Giriliyor
        Div.className = "alert alert-danger";

        // Hata Mesajının Ekranda Görünecek Kısmı Giriliyor
        Div.textContent = message;

        // Hata Mesajını Formun Sonuna Element Olarak Ekliyoruz
        this.CardBody.appendChild(Div);

        // Ekranda Görünen Hata Mesajını 2 Saniye Sonra Kaldırıyoruz
        setTimeout(() =>
        {
            Div.remove();
        },2000);
    }

    
    ShowRepoInfo(repos)
        {
            // Sorgulama Yapmadan Önce Arayüzde 
            // 'En Son Repolar' Kısmında Sorgulanmış Veri Varsa Bunu Siliyoruz
            this.RepoDiv.innerHTML = "";

            // Her Sorgulama Sonucunda 
            // Sorgulama Yapılan Kullanıcıya Ait Verileri Alıyoruz
            repos.forEach(Repo => 
                {
                    this.RepoDiv.innerHTML += 
                    `
                    <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-2">
                        <a href="${Repo.html_url}" target = "_blank" id = "repoName">${Repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Starlar  <span class="badge badge-light" id="repoStar">${Repo.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forklar  <span class="badge badge-light" id ="repoFork">${Repo.forks_count}</span>
                            </button>
                    
                        </div>
                </div>

                </div>
                    `;
                });
        };
    AddSearchedUserToUI(UserName)
    {
        // Storage'da Yer Alan Veriyi 'Users' Değişkenine Atama Yapıyoruz
        let Users = Storage.GetSearchedUsersFromStorage();

        // Sorgulama Yapılan Veri Arayüzde Yoksa Arayüze Ekliyoruz
        if(Users.indexOf(UserName) === -1)
        {
            // Sorgulanan Veriyi Arayüze Ekleme Aşamasında 
            // Her Sorgulama Sonucunu Arayüze Eklemek İçin 
            // 'li' Elementi Kullanıyoruz
            const Li = document.createElement("li");
            Li.className = "list-group-item";
            Li.textContent = UserName;

            // Daha Önceden Seçtiğimiz 'ul' Elementine Atadığımız 'LastUsers' Değişkeni Aracılığıyla
            // 'li' Elementini 'Alt Çocuk' Olarak Ekliyoruz
            this.LastUsers.appendChild(Li);
        }
    }
    ClearAllSearchedFromUI()
    {
        // Storage'da Yer Alan Verileri 
        // İlk Dizinden İtibaren Kontrol Ediyoruz
        while(this.LastUsers.firstElementChild !== null)
        {
            // İlk Dizin Boş Kalana Kadar 
            // İlk Dizindeki Veriyi Silmeye Devam Ediyoruz
            this.LastUsers.removeChild(this.LastUsers.firstElementChild);
        }
    }
}