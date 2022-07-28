// Github İçindeki GetRequest İşlemleri Yapılacak
// ES6 Class Yapısını Kullanacağız

class Github
{
    constructor()
    {
        this.URL = "https://api.github.com/users/";
    }

    async GetGithubData(UserName)
    {
        // URL' ye Arama İşlemi İçin Kullanıcı Adı Gönderdiğimizde 
        // Response Objesi Olarak Bize Dönüş Yapıyor
        const ResponseUser = await fetch(this.URL + UserName);

        // Arama Yapılan Kullanıcı Adına Ait Repo Bilgilerini Alıyoruz
        const ResponseRepo = await fetch(this.URL + UserName + "/repos");

        // Kulanıcıya Ait Bilgileri 'JSON' Tipinde Veri Olarak Alıyoruz
        const UserData = await ResponseUser.json();
        
        // Kullanıcıya Ait Repo Bilgilerini 'JSON' Tipinde Veri Olarak Alıyoruz
        const RepoData = await ResponseRepo.json();

        return{
            User:UserData,
            Repo:RepoData
        }
    }
}