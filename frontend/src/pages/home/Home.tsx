import React from "react";
import { Container } from "reactstrap";

const Home = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <div className="py-4 px-4">
          <h4>English Explanation</h4>
          <p>
            This project aims to handle <strong>expired tokens</strong> during{" "}
            <strong>service requests</strong> by obtaining a{" "}
            <strong>new access token</strong> using the{" "}
            <strong>refresh token</strong>, resending the requests seamlessly
            without showing a <strong>401 error</strong> to the user, and
            updating the <strong>global state</strong> with the received data to
            provide a <strong>smooth user experience</strong>. In addition, it
            includes <strong>error handling mechanisms</strong> to gracefully
            manage and display errors during API interactions. You can test this
            by navigating to the <strong>"Product"</strong> menu.{" "}
          </p>{" "}
          <p>
            The <strong>token expiration time </strong>is set to{" "}
            <strong>15 second</strong>, and the{" "}
            <strong>refresh token expiration time</strong>
            is set to <strong>1 minutes</strong>. If you wish to modify these
            settings, you can update them in the
            <strong>"jwt.ts" file</strong> located under the{" "}
            <strong>"utils" folder</strong> inside the{" "}
            <strong>backend directory</strong>.
          </p>
          <br />
          <h4>Türkçe Açıklama</h4>
          <p>
            Bu proje, <strong>token süresi dolduğunda</strong>,{" "}
            <strong>servise yapılan isteklerde</strong> kullanıcıya{" "}
            <strong>401 hatası</strong> göstermeden,{" "}
            <strong>refresh token</strong> ile yeni bir{" "}
            <strong>access token</strong> almayı ve bu yeni token ile istekleri
            tekrar gerçekleştirip gelen verileri <strong>global state</strong>{" "}
            üzerinde güncelleyerek kullanıcıya{" "}
            <strong>sorunsuz bir şekilde</strong> sunmayı amaçlar. Ayrıca, API
            işlemleri sırasında oluşabilecek hataları düzgün bir şekilde
            yönetmek ve göstermek için{" "}
            <strong>error handling mekanizmaları</strong> da içerir. Bunu test
            etmek için <strong>"Product"</strong> menüsüne giderek test
            edebilirsiniz.{" "}
          </p>
          <p>
            <strong>Token süresi</strong> <strong>15 saniye</strong>,{" "}
            <strong>refresh token süresi</strong> ise <strong>1 dakika</strong>{" "}
            olarak ayarlanmıştır. Bu ayarları değiştirmek isterseniz,{" "}
            <strong>backend</strong> dizini içinde yer alan
            <strong>"utils"</strong> klasöründeki <strong>"jwt.ts"</strong>{" "}
            dosyasını düzenleyebilirsiniz.
          </p>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Home;
