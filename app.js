// İşlemlerin Yapımı Aşamasında İşlemlerin Yönetimi Yapılacak


// Form Üzerinde Yapılacak İşlemler Öncesinde Elementleri Seçiyoruz

// Yapılacak İşlemler İçin İlk Olarak Formu Seçiyoruz
const GithubForm = document.getElementById("github-form");

// Arama İşleminin Yapılacağı 'TextBox' Kutusunu Seçiyoruz
const NameInput = document.getElementById("githubname");

// Son Arananları Temizle Butonunu Seçiyoruz
const ClearLastUsers = document.getElementById("clear-last-users");

// Arama Sonuçlarının Yazılacağı 'ul' Elementini Seçiyoruz
const LastUsers = document.getElementById("last-users");

// 'github.js' Sayfasındaki Verileri Alabilmek İçin 
// Obje Oluşturmak Gerekiyor
const GithubObject = new Github();

// Her Arama İşleminden Sonra TextBox Kutusunun Temizlenmesi
// İçin 'UI' Fonksiyonunu Çağırıyoruz
const ui = new UI();

EventListeners()

function EventListeners()
{
    // 'Ara' Butona Tıklandığında Aranan Kullanıcı Verilerini Alıyoruz
    GithubForm.addEventListener("submit",GetData);

    // 'Son Aramaları Temizle' Butonuna Tıklandığında
    // Arayüzde Yazılı Olan 'Son Aramalar' Yazısı Altındaki 
    // Tüm Bilgileri Temizliyoruz
    ClearLastUsers.addEventListener("click",ClearAllSearched);

    // Sayfa Yenilenme Durumunda Son Aranan Bilgileri 'storage.js' Sayfasından Alıp 
    // 'ui.js' Sayfası Üzerinden Arayüzde 'Son Aramalar' Yazısının Altında Yazıyoruz
    document.addEventListener("DOMContentLoaded",GetAllSearched);

    // Kullanıcı Adına Göre Arama Yapıldığında 
    // Kullanıcıya Ait Verileri Alıyoruz
    function GetData(Event)
    {
        // Arama İşlemi İçin Girilen Bilgiyi Alıyoruz
        // Kullanıcının Girdiği Karakterin Öncesinde Yada Sonrasında 
        // Boşluk Bırakma İhtimalini Göz Önüne Alıyoruz
        let UserName = NameInput.value.trim();

        // Kullanıcının Veri Girip Girmediğini Kontrol Ediyoruz
        if (UserName === "")
        {
            // Kullanıcının Veri Girmemiş İse Uyarıyoruz
            alert("Lütfen Arama İşlemi İçin Geçerli Bir Kullanıcı Adı Giriniz");
        }
        else
        {
            // 'github.js' Sayfasındaki 'GetGithubData' Fonksiyonunda
            // Dönen Değeri Almamız Gerekiyor
            GithubObject.GetGithubData(UserName)
            
            // 'github.js' Sayfasındaki Fonksiyonda 'async' Yapısı Kullanıldığından ve 
            // Bu Fonksiyonda  Obje Döndüreceği için 
            // 'promise' yapısı ile Dönen Değer Almamız Gerekiyor.
            .then(Response => 
                {
                    // Aranan Kullanıcı Adı Yanlış Girişmiş İse
                    if (Response.User.message === "Not Found")
                    {
                        ui.ShowError("Kullanıcı Bulunamadı");
                        // Hata Mesajı Görünecek
                        console.log("Hata");
                    }
                    // Sıkıntı Yoksa Sonuç Yazılacak
                    else
                    {
                        // Aranan Kullanıcı Adlarının 
                        // Arayüzdeki Son Aramalar Kısmında Görünmesini İstiyoruz
                        ui.AddSearchedUserToUI(UserName);

                        // Sorgulanan Kullanıcının Storage'a Eklenmesi Gerekiyor
                        Storage.AddSearchedUserToStorage(UserName);


                        // 'ui.js' Sayfasındaki 'ShowUserInfo' Fonksiyonu İle
                        // Alınan Verileri Ekrana Yazdırıyoruz
                        // 'Response' Değişkeni İle 
                        // Alınan Verinin User Bilgilerini Ekrana Yazdırıyoruz
                        ui.ShowUserInfo(Response.User)

                        // 'Response' Değişkeni İle 
                        // Alınan Verinin Repo Bilgilerini Ekrana Yazdırıyoruz
                        ui.ShowRepoInfo(Response.Repo)
                    }
                })
            .catch(Error => ui.ShowError(Error));
        }

        // Her Arama İşleminin Sonrasında TextBox Kutusunun Temizlenmesi
        // Gerekiyor
        ui.ClearInput();

        // Sayfa Yenilenme Durumumu Önlemek İstiyoruz
        Event.preventDefault();
    }

    function ClearAllSearched()
    {
        // Tüm Arama Bilgilerini Siliyoruz
        if(confirm("Tüm Verileri Silmek İstediğinizden Emin Misiniz ?"))
        {
            // Tüm Verileri İlk Olarak Storage'dan Siliyoruz
            Storage.ClearAllSearchedUsersFromStorage();

            // Tüm Verileri İkinci Olarak Storage'dan Siliyoruz
            ui.ClearAllSearchedFromUI();
        }
    }

    function GetAllSearched()
    {
        // Son Aranan Bilgileri 'storage.js' Sayfası Üzerinden Storage'dan Alıp
        // 'ui.js' Sayfası Üzerinden Arayüze Yazıyoruz
        let users = Storage.GetSearchedUsersFromStorage();
        let Result = "";
            users.forEach(User => 
                {
                    Result += 
                    `<li class="list-group-item">${User}</li>`;
                });
        LastUsers.innerHTML = Result;
    }   
}