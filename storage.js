// Storage İşlemleri Yapılacak

class Storage
{
    // Storage'daki Verileri Alıyoruz
    static GetSearchedUsersFromStorage()
    {
        let Users;

        // 'searched' Key'ine Karşılık Gelen Veri Kontrolü Yapıyoruz
        // Daha Önceden Sorgulanmış Bir Veri Yoksa 
        if(localStorage.getItem("searched") === null)
        {
            // Sorgulanmış Verinin Yazılması İçin 
            // Boş Array Dizini Oluşturuyoruz
            Users = [];
        }
        else
        {
            // 'searched' Key'i Karşılık Gelen Daha Önceden Sorgulanmış Veri Varsa
            // Obje Olarak Alınan Veriyi Array Tipine Çeviriyoruz
            Users = JSON.parse(localStorage.getItem("searched"));
        }

        // Ekrana Yazdırıyoruz
        return Users;
    }

    // Sorgulanmış Kullanıcıları Storage'a Ekliyoruz
    // Storage'da Varsa Eklenmeyecek
    static AddSearchedUserToStorage(UserName)
    {
        // 'LocalStorage' a Sorgulanmış 
        // Kullanıcı Verisini Eklemek İstiyoruz
        // 'this' Anatarını Kullanarak 
        // Storage Class'ı İçindeki 
        // Verileri Alma Fonksiyonunu Kullanıyoruz 
        let Users = this.GetSearchedUsersFromStorage();

        // 'UserName' Değişkeni İle Yapılan Sorgulamada 
        // 'UserName' İçinde 'Users' Verisi Yoksa
        if(Users.indexOf(UserName) === -1)
        {
            // Array Dizinine 'UserName'i Ekliyoruz Böylece
            // Bir den Çok Değerin Aynı Array'de Olmasını Engelliyoruz
            Users.push(UserName);
        }

        // else Durumunu Kontrol Etmeye Gerek Yok
        // 'UserName' 'Users' İçinde Varsa
        // Şart Sağlanmayacağı İçin Değer Eklenmeyecek



        // Local Storage'a Veri Ekleme İşleminden Sonra 
        // Local Storage'da Güncelleme İşlemi Yapıyoruz
        localStorage.setItem("searched",JSON.stringify(Users));
    }

    static ClearAllSearchedUsersFromStorage()
    {
        // Arama İşlemlerinin Local Strorage'daki Kayıtlarını Siliyoruz
        localStorage.removeItem("searched");
    }
}