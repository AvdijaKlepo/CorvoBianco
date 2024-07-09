namespace CorvoBianco.Helper
{
    public class Config
    {
        public static string ApplicationUrl = "https://localhost:7171";
        public static string Images => "/Images/";
        public static string NoCoverImage = ApplicationUrl + "/Images/Untitled.png";
        public static string NoAuthorImage = ApplicationUrl + "/Images/NoAuthorImage.jpg";

        public static string ImageUrl => ApplicationUrl + Images;
        public static string ImageFolder => "wwwroot/" + Images;
    }
}
